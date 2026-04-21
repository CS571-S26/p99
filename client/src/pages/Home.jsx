import HeroSection from "../components/HeroSection"
import StatsBar from "../components/StatsBar"
import JobCard from "../components/JobCard"

const recentJobs = [
    {
        id: 1,
        title: 'Senior Frontend Engineer',
        company: 'Acme Corp',
        location: 'Remote',
        score: 78,
        analyzedAt: new Date().toISOString(),
        url: 'https://linkedin.com/jobs/view/123',
    },
    {
        id: 2,
        title: 'Product Designer',
        company: 'Novex',
        location: 'New York, NY',
        score: 21,
        analyzedAt: new Date().toISOString(),
        url: 'https://indeed.com/jobs/456',
    },
    {
        id: 3,
        title: 'Data Analyst',
        company: 'Bluelight Inc',
        location: 'Chicago, IL',
        score: 51,
        analyzedAt: new Date().toISOString(),
        url: null,
    },
]

export default function Home() {
    return (
        <div style={{ background: 'aliceblue', minHeight: '100vh' }}>
            <HeroSection />
            <StatsBar />
            <div style={{ maxWidth: '720px', margin: '0 auto', padding: '1.5rem' }}>
                <h5 style={{ fontWeight: '500', marginBottom: '1rem' }}>
                    Recently analyzed jobs
                </h5>
                {recentJobs.map(job => (
                    <JobCard key={job.id} {...job} />
                ))}
            </div>
        </div>
    )
}