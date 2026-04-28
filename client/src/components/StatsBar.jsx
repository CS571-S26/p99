import { Container, Row, Col } from 'react-bootstrap'
import { useInView } from '../hooks/useInView'

export default function StatsBar({ stats }) {
  const [ref, inView] = useInView()

  return (
    <Container className="text-center py-5" ref={ref}>
      <Row>
        {stats.map((stat, i) => (
          <Col key={stat.label}>
            <div className={`fade-up delay-${i + 1}${inView ? ' in-view' : ''}`}>
              <div style={{ fontSize: '1.75rem', fontWeight: '500' }}>
                {stat.number}
              </div>
              <div className="text-muted" style={{ fontSize: '13px' }}>
                {stat.label}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
