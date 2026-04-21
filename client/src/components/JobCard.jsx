function getScoreColor(score) {
    if (score >= 65) return 'crimson'
    if (score >= 40) return 'goldenrod'
    return 'seagreen'
}

function getRiskLabel(score) {
    if (score >= 65) return 'High Risk'
    if (score >= 40) return 'Medium Risk'
    return 'Low Risk'
}

export default function JobCard({ title, company, score, location, analyzedAt, url }) {
    const color = getScoreColor(score)
    const risk = getRiskLabel(score)

    return (
        <div
            style={{
                background: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '1rem 1.25rem',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '2px' }}>
                    {title}
                </div>
                <div style={{ fontSize: '13px', color: '#666', marginBottom: '4px' }}>
                    {company} {location ? `· ${location}` : ''}
                </div>
                {analyzedAt && (
                    <div style={{ fontSize: '12px', color: '#999' }}>
                        Analyzed {new Date(analyzedAt).toLocaleDateString(undefined, {
                            month: 'short', day: 'numeric', year: 'numeric'
                        })}
                    </div>
                )}
                {url && (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '12px' }}
                    >
                        View posting
                    </a>
                )}
            </div>

            <div style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ fontSize: '24px', fontWeight: '500', color }}>
                    {score}
                </div>
                <div style={{
                    fontSize: '11px',
                    fontWeight: '500',
                    color,
                    background: color === 'crimson' ? '#fff0f0' 
                              : color === 'goldenrod' ? '#fffbe6' 
                              : '#f0fff4',
                    padding: '2px 10px',
                    borderRadius: '100px',
                    marginTop: '4px',
                }}>
                    {risk}
                </div>
            </div>
        </div>
    )
}