import { Container, Row, Col } from 'react-bootstrap'

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
    return (
        <div style={{ padding: '3rem 0', borderTop: '1px solid #e0e0e0' }}>
            <Container>
                <h5 style={{ fontWeight: '500', marginBottom: '2rem', textAlign: 'center' }}>
                    How it works
                </h5>
                <Row>
                    {steps.map((step) => (
                        <Col key={step.number} md={4} className="text-center mb-4">
                            <div style={{
                                fontSize: '2rem',
                                fontWeight: '500',
                                color: '#ffc107',
                                marginBottom: '0.5rem',
                            }}>
                                {step.number}
                            </div>
                            <div style={{ fontWeight: '500', fontSize: '15px', marginBottom: '8px' }}>
                                {step.title}
                            </div>
                            <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', maxWidth: '220px', margin: '0 auto' }}>
                                {step.description}
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}