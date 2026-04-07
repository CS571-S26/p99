import { useState, useRef } from 'react'
import './Analyze.css'

function getRiskLabel(score) {
    if (score <= 33) return { label: 'Low Risk', className: 'risk-low' }
    if (score <= 66) return { label: 'Medium Risk', className: 'risk-medium' }
    return { label: 'High Risk', className: 'risk-high' }
}

export default function Analyze() {
    const [form, setForm] = useState({ title: '', company: '', description: '', url: '' })
    const [submitted, setSubmitted] = useState(false)
    const resultRef = useRef(null)

    const mockScore = 65
    const risk = getRiskLabel(mockScore)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }

    function handleClear() {
        setForm({ title: '', company: '', description: '', url: '' })
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

                <button type="submit" className="btn btn-dark px-4">
                    Analyze
                </button>
            </form>

            {submitted && (
                <div className="result-card" ref={resultRef}>
                    <div className="score-circle">
                        <span className="score-number">{mockScore}</span>
                        <span className="score-denom">/ 100</span>
                    </div>
                    <span className={`risk-badge ${risk.className}`}>{risk.label}</span>
                    <p style={{ color: 'var(--text)', marginTop: '12px', fontSize: '14px' }}>
                        Full analysis coming soon.
                    </p>
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
