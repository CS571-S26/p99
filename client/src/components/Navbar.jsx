import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="site-nav">
            <Link className="site-nav__brand" to="/">Ghost Job Detector</Link>
            <ul className="site-nav__links">
                <li>
                    <NavLink className={({ isActive }) => 'site-nav__link' + (isActive ? ' active' : '')} to="/" end>Home</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => 'site-nav__link' + (isActive ? ' active' : '')} to="/analyze">Analyze</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => 'site-nav__link' + (isActive ? ' active' : '')} to="/history">History</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => 'site-nav__link' + (isActive ? ' active' : '')} to="/stats">Stats</NavLink>
                </li>
            </ul>
        </nav>
    )
}
