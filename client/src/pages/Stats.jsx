import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RED_FLAGS } from '../components/GhostChecklist'
import StatCard from '../components/StatCard'
import './Stats.css'

function loadHistory() {
    try {
        return JSON.parse(localStorage.getItem('p99_history') || '[]')
    } catch {
        return []
    }
}

const OUTCOME_GROUPS = {
    ghosted: ['ghosted'],
    responded: ['got_response', 'interviewing', 'offer', 'rejected'],
    pending: ['applied', 'not_applied'],
}

function RiskBar({ label, count, total, colorClass }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return (
        <div className="risk-bar-row">
            <span className="risk-bar-label">{label}</span>
            <div className="risk-bar-track">
                <div className={`risk-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
            <span className="risk-bar-count">{count} <span className="risk-bar-pct">({pct}%)</span></span>
        </div>
    )
}

function FlagFrequencyRow({ flag, count, total }) {
    const pct = total > 0 ? Math.round((count / total) * 100) : 0
    return (
        <div className="flag-freq-row">
            <span className="flag-freq-label">{flag.label}</span>
            <div className="flag-freq-track">
                <div className="flag-freq-fill" style={{ width: `${pct}%` }} />
            </div>
            <span className="flag-freq-pct">{count}x</span>
        </div>
    )
}

export default function Stats() {
    const [entries] = useState(loadHistory)

    const total = entries.length
    const avgScore = total > 0
        ? Math.round(entries.reduce((s, e) => s + e.score, 0) / total)
        : 0

    const riskCounts = { low: 0, medium: 0, high: 0 }
    for (const e of entries) {
        if (e.riskLevel === 'Low Risk') riskCounts.low++
        else if (e.riskLevel === 'Medium Risk') riskCounts.medium++
        else if (e.riskLevel === 'High Risk') riskCounts.high++
    }

    const withFeedback = entries.filter(e => e.feedback)
    const ghostedCount = withFeedback.filter(e =>
        OUTCOME_GROUPS.ghosted.includes(e.feedback.status)
    ).length
    const respondedCount = withFeedback.filter(e =>
        OUTCOME_GROUPS.responded.includes(e.feedback.status)
    ).length
    const pendingCount = withFeedback.filter(e =>
        OUTCOME_GROUPS.pending.includes(e.feedback.status)
    ).length

    const flagCounts = Object.fromEntries(RED_FLAGS.map(f => [f.id, 0]))
    for (const e of entries) {
        for (const id of e.checkedFlags ?? []) {
            if (id in flagCounts) flagCounts[id]++
        }
    }
    const sortedFlags = RED_FLAGS
        .map(f => ({ ...f, count: flagCounts[f.id] }))
        .sort((a, b) => b.count - a.count)

    return (
        <div className="stats-page">
            <h1>Insights</h1>
            <p style={{ color: 'var(--text)', marginBottom: '32px' }}>
                Aggregated stats from all your analyzed job postings.
            </p>

            {total === 0 ? (
                <p className="stats-empty">
                    No data yet.{' '}
                    <Link to="/analyze">Analyze a job posting</Link> to see insights here.
                </p>
            ) : (
                <>
                    <div className="stat-cards">
                        <StatCard label="Total Analyzed" value={total} />
                        <StatCard label="Avg Risk Score" value={avgScore} sub="out of 100" />
                        <StatCard label="High Risk" value={riskCounts.high} sub={`${Math.round((riskCounts.high / total) * 100)}% of total`} />
                        <StatCard label="Outcomes Logged" value={withFeedback.length} />
                    </div>

                    <section className="stats-section">
                        <h2>Risk Distribution</h2>
                        <div className="risk-bars">
                            <RiskBar label="Low" count={riskCounts.low} total={total} colorClass="bar-low" />
                            <RiskBar label="Medium" count={riskCounts.medium} total={total} colorClass="bar-medium" />
                            <RiskBar label="High" count={riskCounts.high} total={total} colorClass="bar-high" />
                        </div>
                    </section>

                    {withFeedback.length > 0 && (
                        <section className="stats-section">
                            <h2>Outcome Summary</h2>
                            <div className="outcome-grid">
                                <div className="outcome-item outcome-ghosted">
                                    <span className="outcome-number">{ghostedCount}</span>
                                    <span className="outcome-label">Ghosted</span>
                                </div>
                                <div className="outcome-item outcome-responded">
                                    <span className="outcome-number">{respondedCount}</span>
                                    <span className="outcome-label">Got Response</span>
                                </div>
                                <div className="outcome-item outcome-pending">
                                    <span className="outcome-number">{pendingCount}</span>
                                    <span className="outcome-label">Pending / Not Applied</span>
                                </div>
                            </div>
                        </section>
                    )}

                    <section className="stats-section">
                        <h2>Red Flag Frequency</h2>
                        <p className="stats-section-hint">
                            How often each red flag was detected across all {total} analyzed posting{total !== 1 ? 's' : ''}.
                        </p>
                        <div className="flag-freq-list">
                            {sortedFlags.map(f => (
                                <FlagFrequencyRow key={f.id} flag={f} count={f.count} total={total} />
                            ))}
                        </div>
                    </section>
                </>
            )}
        </div>
    )
}
