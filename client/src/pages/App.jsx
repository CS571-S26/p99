import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import Report from './Report'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reports" element={<Report />} />
            </Routes>
        </div>
    )
}

export default App
