import { Container, Button, Form, InputGroup } from 'react-bootstrap'

export default function HeroSection() {
    return (
         <div style={{padding: '4rem 0 3rem' }}>
            <Container className="text-center">

                <span
                    className="badge bg-warning text-dark mb-3"
                    style={{fontSize: '12px', padding: '6px 14px', borderRadius: '100px'}}
                >
                    Ghost job detector
                </span>

                <h1 style={{fontSize: '2rem', fontWeight: '500', marginBottom: '1rem'}}>
                    Stop applying to jobs that will never reply
                </h1>

                <p
                    className="text-muted mx-auto mb-4"
                     style={{ maxWidth: '440px', fontSize: '14px', lineHeight: '1.6' }}
                >
                     We analyze job postings for patterns that predict ghosting —
                    before you spend hours on an application.
                </p>

                <InputGroup className="mx-auto" style={{ maxWidth: '460px' }}>
                    <Form.Control placeholder="Paste a job URL or search by title..." />
                    <Button variant="dark">Analyze</Button>
                </InputGroup>

            </Container>
        </div>
    )
}