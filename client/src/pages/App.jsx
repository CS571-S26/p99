import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from './Home'
import JobSearch from './JobSearch'
import Community from './Community'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/jobsearch" element={<JobSearch />} />
                <Route path="/community" element={<Community/>}/>
            </Routes>
        </div>
    )
}

export default App
