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
                    <label htmlFor="feedback-outcome" className="form-label">Outcome</label>
                    <select
                        id="feedback-outcome"
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
                        <label htmlFor="feedback-interviews" className="form-label"># of Interviews</label>
                        <input
                            id="feedback-interviews"
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
                <label htmlFor="feedback-notes" className="form-label">Notes (optional)</label>
                <textarea
                    id="feedback-notes"
                    className="form-control form-control-sm"
                    rows={3}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Any details about the process..."
                />
            </div>
            <div className="feedback-form-actions">
                <button type="submit" className="btn-save">Save</button>
                <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
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
                <div className={`score-circle ${risk.className}`}>
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
    const [filterStatus, setFilterStatus] = useState('all')
    const [sortBy, setSortBy] = useState('newest')

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

    const visible = entries
        .filter(e => {
            if (filterStatus === 'all') return true
            if (filterStatus === 'none') return !e.feedback
            return e.feedback?.status === filterStatus
        })
        .sort((a, b) => {
            if (sortBy === 'newest') return new Date(b.analyzedAt) - new Date(a.analyzedAt)
            if (sortBy === 'oldest') return new Date(a.analyzedAt) - new Date(b.analyzedAt)
            if (sortBy === 'score_high') return b.score - a.score
            if (sortBy === 'score_low') return a.score - b.score
            return 0
        })

    return (
        <div className="history-page">
            <h1 className="hero-animate delay-1">Application History</h1>
            <p className="hero-animate delay-2" style={{ color: 'var(--text)', marginBottom: '24px' }}>
                Track outcomes for jobs you've analyzed.
            </p>

            {entries.length > 0 && (
                <div className="hero-animate delay-3" style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <select
                        aria-label="Filter by outcome"
                        className="form-select form-select-sm"
                        style={{ width: 'auto' }}
                        value={filterStatus}
                        onChange={e => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All outcomes</option>
                        <option value="none">No outcome yet</option>
                        {STATUS_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                        ))}
                    </select>
                    <select
                        aria-label="Sort order"
                        className="form-select form-select-sm"
                        style={{ width: 'auto' }}
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                    >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                        <option value="score_high">Highest risk first</option>
                        <option value="score_low">Lowest risk first</option>
                    </select>
                </div>
            )}

            {entries.length === 0 ? (
                <p className="history-empty">
                    No jobs analyzed yet.{' '}
                    <Link to="/analyze">Analyze a job posting</Link> to get started.
                </p>
            ) : visible.length === 0 ? (
                <p className="history-empty">No entries match this filter.</p>
            ) : (
                visible.map((entry, i) => (
                    <div
                        key={entry.id}
                        className="hero-animate"
                        style={{ animationDelay: `${0.1 + Math.min(i, 6) * 0.07}s` }}
                    >
                        <HistoryCard
                            entry={entry}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                        />
                    </div>
                ))
            )}
        </div>
    )
}
