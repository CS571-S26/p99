import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer style={{
            borderTop: '1px solid var(--border)',
            padding: '2rem 0',
            marginTop: '3rem',
            color: 'var(--text)',
        }}>
            <Container>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}>
                    <div>
                        <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px', color: 'var(--text-h)' }}>
                            Ghost Job Detector
                        </div>
                        <div style={{ fontSize: '12px' }}>
                            Helping job seekers avoid ghost jobs
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '13px' }}>
                        <Link to="/" style={{ color: 'var(--text)', textDecoration: 'none' }}>Home</Link>
                        <Link to="/analyze" style={{ color: 'var(--text)', textDecoration: 'none' }}>Analyze</Link>
                        <Link to="/history" style={{ color: 'var(--text)', textDecoration: 'none' }}>History</Link>
                        <Link to="/stats" style={{ color: 'var(--text)', textDecoration: 'none' }}>Stats</Link>
                    </div>
                </div>

                <div style={{
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--border)',
                    fontSize: '11px',
                    color: 'var(--text)',
                    opacity: 0.6,
                }}>
                    Results are pattern-based estimates and not a guarantee of employer behavior.
                </div>
            </Container>
        </footer>
    )
}