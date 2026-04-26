import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Button, Form, InputGroup } from 'react-bootstrap'

export default function HeroSection() {
    const [input, setInput] = useState('')
    const navigate = useNavigate()

    function handleAnalyze() {
        const trimmed = input.trim()
        if (!trimmed) {
            navigate('/analyze')
            return
        }
        if (trimmed.startsWith('http')) {
            navigate(`/analyze?url=${encodeURIComponent(trimmed)}`)
        } else {
            navigate(`/analyze?title=${encodeURIComponent(trimmed)}`)
        }
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') handleAnalyze()
    }

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
                    <Form.Control
                        placeholder="Paste a job URL or search by title..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button variant="dark" onClick={handleAnalyze}>Analyze</Button>
                </InputGroup>

            </Container>
        </div>
    )
}