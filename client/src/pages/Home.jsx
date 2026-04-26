import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from "../components/HeroSection"
import StatsBar from "../components/StatsBar"
import JobCard from "../components/JobCard"
import HowItWorks from "../components/HowItWorks"

export default function Home() {
    const [recentJobs, setRecentJobs] = useState([])

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('p99_history') || '[]')
        setRecentJobs(history.slice(0, 3))
    }, [])

    return (
        <div style={{ background: 'aliceblue', minHeight: '100vh' }}>
            <HeroSection />
            <StatsBar />
            <HowItWorks />
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem' }}>
                <h5 style={{ fontWeight: '500', marginBottom: '1rem' }}>
                    Recently analyzed jobs
                </h5>
                {recentJobs.length > 0 ? (
                    recentJobs.map(job => (
                        <JobCard key={job.id} {...job} />
                    ))
                ) : (
                    <div style={{
                        border: '1px dashed var(--border)',
                        borderRadius: '8px',
                        padding: '2rem',
                        textAlign: 'center',
                        color: 'var(--text)',
                    }}>
                        <p style={{ marginBottom: '0.75rem', fontSize: '14px' }}>
                            No analyses yet.
                        </p>
                        <Link to="/analyze" className="btn btn-dark btn-sm">
                            Analyze your first job posting
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}