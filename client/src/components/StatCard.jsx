export default function StatCard({ label, value, sub }) {
    return (
        <div className="stat-card">
            <span className="stat-card-value">{value}</span>
            <span className="stat-card-label">{label}</span>
            {sub && <span className="stat-card-sub">{sub}</span>}
        </div>
    )
}
