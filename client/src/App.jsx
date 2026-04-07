import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import JobSearch from './pages/JobSearch'
import Community from './pages/Community'
import History from './pages/History'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobsearch" element={<JobSearch />} />
                <Route path="/community" element={<Community/>}/>
                <Route path="/history" element={<History/>}/>
            </Routes>
        </div>
    )
}

export default App
