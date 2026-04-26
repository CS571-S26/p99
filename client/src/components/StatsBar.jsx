import { Container, Row, Col } from 'react-bootstrap'

export default function StatsBar({ stats }) {
  return (
    <Container className="text-center py-5">
      <Row>
        {stats.map((stat) => (
          <Col key={stat.label}>
            <div style={{ fontSize: '1.75rem', fontWeight: '500' }}>
              {stat.number}
            </div>
            <div className="text-muted" style={{ fontSize: '13px' }}>
              {stat.label}
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}