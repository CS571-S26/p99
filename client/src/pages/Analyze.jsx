import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Analyze.css'
import GhostChecklist, { RED_FLAGS } from '../components/GhostChecklist'
import { detectFlags } from '../utils/analyzeDescription'

function getRiskLabel(score) {
    if (score <= 33) return { label: 'Low Risk', className: 'risk-low' }
    if (score <= 66) return { label: 'Medium Risk', className: 'risk-medium' }
    return { label: 'High Risk', className: 'risk-high' }
}

export default function Analyze() {
    const [searchParams] = useSearchParams()
    const [form, setForm] = useState(() => ({
        title: searchParams.get('title') || '',
        company: '',
        description: '',
        url: searchParams.get('url') || '',
    }))
    const [submitted, setSubmitted] = useState(false)
    const resultRef = useRef(null)

    const [checkedFlags, setCheckedFlags] = useState(new Set())

    useEffect(() => {
        if (submitted) return
        if (form.description.trim().length < 50) {
            setCheckedFlags(new Set())
            return
        }
        setCheckedFlags(detectFlags(form.description))
    }, [form.description, submitted])
    const score = RED_FLAGS.filter(f => checkedFlags.has(f.id)).reduce((sum, f) => sum + f.weight, 0)
    const risk = getRiskLabel(score)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)
        const entry = {
            id: crypto.randomUUID(),
            title: form.title,
            company: form.company,
            url: form.url,
            score: score,
            riskLevel: risk.label,
            checkedFlags: [...checkedFlags],
            analyzedAt: new Date().toISOString(),
            feedback: null
        }
        const existing = JSON.parse(localStorage.getItem('p99_history') || '[]')
        localStorage.setItem('p99_history', JSON.stringify([entry, ...existing]))
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }

    function handleClear() {
        setForm({ title: '', company: '', description: '', url: '' })
        setCheckedFlags(new Set())
        setSubmitted(false)
    }

    return (
        <div className="analyze-page">
            <h1>Analyze a Job Posting</h1>
            <p style={{ color: 'var(--text)', marginBottom: '24px' }}>
                Paste the job posting details below to receive a ghost job risk score.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Job Title</label>
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            placeholder="e.g. Senior Software Engineer"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label fw-semibold">Company Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="company"
                            placeholder="e.g. Acme Corp"
                            value={form.company}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label fw-semibold">Job Posting URL</label>
                    <input
                        type="url"
                        className="form-control"
                        name="url"
                        placeholder="https://..."
                        value={form.url}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-semibold">Job Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        rows={10}
                        placeholder="Paste the full job description here..."
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-4">
                    <GhostChecklist
                        checked={checkedFlags}
                        onChange={setCheckedFlags}
                        disabled={submitted}
                    />
                    {!submitted && form.description.trim().length >= 50 && (
                        <p style={{ fontSize: '12px', color: 'var(--text)', marginTop: '8px', opacity: 0.6 }}>
                            Flags auto-detected from your description — review and adjust before submitting.
                        </p>
                    )}
                </div>

                <button type="submit" className="btn btn-dark px-4">
                    Analyze
                </button>
            </form>

            {submitted && (
                <div className="result-card" ref={resultRef}>
                    <div className="score-circle">
                        <span className="score-number">{score}</span>
                        <span className="score-denom">/ 100</span>
                    </div>
                    <span className={`risk-badge ${risk.className}`}>{risk.label}</span>

                    {checkedFlags.size > 0 ? (
                        <div className="result-flags">
                            <p className="result-flags-heading">Red flags detected:</p>
                            <ul className="result-flags-list">
                                {RED_FLAGS.filter(f => checkedFlags.has(f.id)).map(f => (
                                    <li key={f.id}>{f.label}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p style={{ color: 'var(--text)', marginTop: '12px', fontSize: '14px' }}>
                            No red flags were selected.
                        </p>
                    )}
                    <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm mt-3"
                        onClick={handleClear}
                    >
                        Clear
                    </button>
                </div>
            )}
        </div>
    )
}
