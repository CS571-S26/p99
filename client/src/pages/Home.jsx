import HeroSection from "../components/HeroSection"
import StatsBar from "../components/StatsBar"

export default function Home() {
    return (
        <div style={{ background: 'aliceblue', minHeight: '100vh' }}>
            <HeroSection/>
            <StatsBar/>
        </div>
    )
}
