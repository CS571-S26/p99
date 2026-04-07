import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Analyze.css'
import './History.css'

const STATUS_OPTIONS = [
    { value: 'not_applied', label: 'Not Applied' },
    { value: 'applied', label: 'Applied' },
    { value: 'ghosted', label: 'Ghosted' },
    { value: 'got_response', label: 'Got Response' },
    { value: 'interviewing', label: 'Interviewing' },
    { value: 'offer', label: 'Received Offer' },
    { value: 'rejected', label: 'Rejected' },
]

const INTERVIEW_STATUSES = new Set(['got_response', 'interviewing', 'offer', 'rejected'])

function statusLabel(value) {
    return STATUS_OPTIONS.find(o => o.value === value)?.label ?? value
}

function formatDate(iso) {
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem('p99_history') || '[]')
    } catch {
        return []
    }
}

function saveHistory(entries) {
    localStorage.setItem('p99_history', JSON.stringify(entries))
}

function FeedbackForm({ initial, onSave, onCancel }) {
    const [status, setStatus] = useState(initial?.status ?? '')
    const [interviews, setInterviews] = useState(initial?.interviews ?? '')
    const [notes, setNotes] = useState(initial?.notes ?? '')

    function handleSubmit(e) {
        e.preventDefault()
        onSave({
            status,
            interviews: INTERVIEW_STATUSES.has(status) && interviews !== '' ? Number(interviews) : null,
            notes,
            submittedAt: new Date().toISOString(),
        })
    }

    return (
        <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="feedback-form-row">
                <div>
                    <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Outcome</label>
                    <select
                        className="form-select form-select-sm"
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select status...</option>
                        {STATUS_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                </div>
                {INTERVIEW_STATUSES.has(status) && (
                    <div>
                        <label className="form-label fw-semibold" style={{ fontSize: '13px' }}># of Interviews</label>
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            min={0}
                            value={interviews}
                            onChange={e => setInterviews(e.target.value)}
                            placeholder="0"
                        />
                    </div>
                )}
            </div>
            <div>
                <label className="form-label fw-semibold" style={{ fontSize: '13px' }}>Notes (optional)</label>
                <textarea
                    className="form-control form-control-sm"
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any details about the process..."
                />
            </div>
            <div className="feedback-form-actions">
                <button type="submit" className="btn btn-dark btn-sm">Save</button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={onCancel}>Cancel</button>
            </div>
        </form>
    )
}

function HistoryCard({ entry, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false)
    const risk = { label: entry.riskLevel, className: `risk-${entry.riskLevel.split(' ')[0].toLowerCase()}` }

    function handleSave(feedback) {
        onUpdate(entry.id, feedback)
        setEditing(false)
    }

    return (
        <div className="history-card">
            <div className="history-card-meta">
                <div className="score-circle">
                    <span className="score-number">{entry.score}</span>
                    <span className="score-denom">/ 100</span>
                </div>
                <span className={`risk-badge ${risk.className}`}>{risk.label}</span>
            </div>

            <div className="history-card-info">
                <p className="history-card-title">{entry.title}</p>
                <p className="history-card-company">{entry.company}</p>
                <p className="history-card-date">Analyzed {formatDate(entry.analyzedAt)}</p>
                {entry.url && (
                    <a className="history-card-url" href={entry.url} target="_blank" rel="noopener noreferrer">
                        {entry.url}
                    </a>
                )}

                <div className="history-feedback">
                    {entry.feedback && !editing ? (
                        <>
                            <div className="feedback-summary">
                                <span className={`status-pill status-${entry.feedback.status}`}>
                                    {statusLabel(entry.feedback.status)}
                                </span>
                                {entry.feedback.interviews != null && (
                                    <span style={{ fontSize: '13px', color: 'var(--text)' }}>
                                        {entry.feedback.interviews} interview{entry.feedback.interviews !== 1 ? 's' : ''}
                                    </span>
                                )}
                                <button
                                    className="btn btn-outline-secondary btn-sm"
                                    style={{ fontSize: '12px', padding: '2px 8px' }}
                                    onClick={() => setEditing(true)}
                                >
                                    Edit
                                </button>
                            </div>
                            {entry.feedback.notes && (
                                <p className="feedback-notes">"{entry.feedback.notes}"</p>
                            )}
                        </>
                    ) : editing ? (
                        <FeedbackForm
                            initial={entry.feedback}
                            onSave={handleSave}
                            onCancel={() => setEditing(false)}
                        />
                    ) : (
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            style={{ fontSize: '13px' }}
                            onClick={() => setEditing(true)}
                        >
                            + Add Outcome
                        </button>
                    )}
                </div>
            </div>

            <div className="history-card-actions">
                <button
                    className="btn-delete"
                    title="Delete"
                    onClick={() => {
                        if (window.confirm(`Remove "${entry.title}" at ${entry.company}?`)) {
                            onDelete(entry.id)
                        }
                    }}
                >
                    &#x2715;
                </button>
            </div>
        </div>
    )
}

export default function History() {
    const [entries, setEntries] = useState(loadHistory)

    function handleUpdate(id, feedback) {
        const updated = entries.map(e => e.id === id ? { ...e, feedback } : e)
        setEntries(updated)
        saveHistory(updated)
    }

    function handleDelete(id) {
        const updated = entries.filter(e => e.id !== id)
        setEntries(updated)
        saveHistory(updated)
    }

    return (
        <div className="history-page">
            <h1>Application History</h1>
            <p style={{ color: 'var(--text)', marginBottom: '24px' }}>
                Track outcomes for jobs you've analyzed.
            </p>

            {entries.length === 0 ? (
                <p className="history-empty">
                    No jobs analyzed yet.{' '}
                    <Link to="/analyze">Analyze a job posting</Link> to get started.
                </p>
            ) : (
                entries.map(entry => (
                    <HistoryCard
                        key={entry.id}
                        entry={entry}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))
            )}
        </div>
    )
}
