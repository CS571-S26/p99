import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import HeroSection from "../components/HeroSection"
import StatsBar from "../components/StatsBar"
import JobCard from "../components/JobCard"
import HowItWorks from "../components/HowItWorks"
import { useInView } from '../hooks/useInView'

export default function Home() {
    const [recentJobs, setRecentJobs] = useState([])
    const [jobsRef, jobsInView] = useInView()

    const [stats, setStats] = useState([
        { number: '--', label: 'jobs analyzed' },
        { number: '--', label: 'high-risk postings' },
        { number: '--', label: 'ghosted after applying' },
    ])

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('p99_history') || '[]')
        setRecentJobs(history.slice(0, 3))

        const total = history.length
        const highRisk = history.filter(e => e.score > 66).length
        const withOutcome = history.filter(e => e.feedback?.status)
        const ghosted = withOutcome.filter(e => e.feedback.status === 'ghosted').length
        const ghostRate = withOutcome.length > 0
            ? Math.round((ghosted / withOutcome.length) * 100) + '%'
            : '--'

        setStats([
            { number: total || '--', label: 'jobs analyzed' },
            { number: total ? highRisk : '--', label: 'high-risk postings' },
            { number: ghostRate, label: 'ghosted after applying' },
        ])
    }, [])

    return (
        <div style={{ background: 'var(--page-bg)', minHeight: '100vh' }}>
            <HeroSection />
            <StatsBar stats={stats} />
            <HowItWorks />
            <div ref={jobsRef} style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem' }}>
                <h2 className={`fade-up${jobsInView ? ' in-view' : ''}`} style={{ fontWeight: '500', marginBottom: '1rem', fontSize: '1rem' }}>
                    Recently analyzed jobs
                </h2>
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