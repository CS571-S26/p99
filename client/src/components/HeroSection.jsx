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
        <div style={{ padding: '4rem 0 3.5rem' }}>
            <Container className="text-center">

                <span style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    padding: '5px 14px',
                    borderRadius: '100px',
                    background: 'var(--accent-bg)',
                    color: 'var(--accent-text)',
                    border: '1px solid var(--accent-border)',
                    marginBottom: '1.25rem',
                }}>
                    Ghost job detector
                </span>

                <h1 style={{
                    fontFamily: 'var(--heading)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '600',
                    letterSpacing: '-0.03em',
                    color: 'var(--text-h)',
                    marginBottom: '1rem',
                    lineHeight: '1.2',
                }}>
                    Stop applying to jobs<br />that will never reply
                </h1>

                <p style={{
                    maxWidth: '420px',
                    margin: '0 auto 2rem',
                    fontSize: '15px',
                    lineHeight: '1.65',
                    color: 'var(--text)',
                }}>
                    We analyze job postings for patterns that predict ghosting —
                    before you spend hours on an application.
                </p>

                <InputGroup className="mx-auto" style={{ maxWidth: '460px' }}>
                    <Form.Control
                        aria-label="Search by job title or paste a job URL"
                        placeholder="Paste a job URL or search by title..."
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        style={{ borderColor: 'var(--border)', fontSize: '14px' }}
                    />
                    <Button
                        onClick={handleAnalyze}
                        style={{
                            background: 'var(--accent)',
                            borderColor: 'var(--accent)',
                            fontWeight: '600',
                            fontSize: '14px',
                        }}
                    >
                        Analyze
                    </Button>
                </InputGroup>

            </Container>
        </div>
    )
}