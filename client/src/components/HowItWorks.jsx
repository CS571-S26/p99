import { Container, Row, Col } from 'react-bootstrap'
import { useInView } from '../hooks/useInView'

const steps = [
    {
        number: '1',
        title: 'Browse already analyzed jobs',
        description: 'The home page shows jobs that have already been analyzed. Search by title to quickly check if a job you found has been scored before.',
    },
    {
        number: '2',
        title: 'Found something new? Analyze it',
        description: 'If the job hasn\'t been analyzed yet, head to the Analyze page. Paste the URL or full job description and we\'ll run it through our ghost detection system.',
    },
    {
        number: '3',
        title: 'Track your applications',
        description: 'Every job you analyze gets saved to your History page so you never have to look up the same posting twice. Update the outcome as your application progresses.',
    },
]

export default function HowItWorks() {
    const [ref, inView] = useInView()

    return (
        <div style={{ padding: '3rem 0', borderTop: '1px solid var(--border)' }}>
            <Container>
                <h5 className={`fade-up${inView ? ' in-view' : ''}`} style={{ fontFamily: 'var(--heading)', fontWeight: '600', fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: '2rem', textAlign: 'center' }}>
                    How it works
                </h5>
                <Row ref={ref}>
                    {steps.map((step, i) => (
                        <Col key={step.number} md={4} className="text-center mb-4">
                            <div className={`fade-up delay-${i + 2}${inView ? ' in-view' : ''}`}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: 'var(--accent-bg)',
                                    border: '1px solid var(--accent-border)',
                                    color: 'var(--accent)',
                                    fontFamily: 'var(--heading)',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 0.75rem',
                                }}>
                                    {step.number}
                                </div>
                                <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '6px', color: 'var(--text-h)' }}>
                                    {step.title}
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.65', maxWidth: '220px', margin: '0 auto' }}>
                                    {step.description}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}
