import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-dark bg-dark px-4 d-flex">
            <Link className="navbar-brand fw-bold" to="/">Ghost Job Detector</Link>
            <div className="d-flex">
                <ul className="navbar-nav flex-row ms-auto gap-1 gap-md-3 gap-lg-4">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" end>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/analyze">Analyze</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/History">History</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}