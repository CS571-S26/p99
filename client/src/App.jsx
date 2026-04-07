import './App.css'
import { Routes, Route } from 'react-router-dom'
<<<<<<< HEAD
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import History from './pages/History'
=======
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import Community from './pages/Community'
>>>>>>> f009dea (Complete home page with hero section and stats bar)

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/analyze" element={<Analyze />} />
                <Route path="/history" element={<History/>}/>
            </Routes>
        </div>
    )
}

export default App
