import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <Link className="navbar-brand fw-bold" to="/">Ghost Job Detector</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/jobsearch">Job Search</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/Community">Community</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}