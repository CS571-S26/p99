import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import History from './pages/History'
import Stats from './pages/Stats'

function App() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/analyze" element={<Analyze />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/stats" element={<Stats />} />
                </Routes>
            </div>
            <Footer />
        </div>
    )
}

export default App