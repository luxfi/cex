import Nav from './Nav'
import HeroImg from './HeroImg'
import HeroBanner from './HeroBanner'

export default props => {
    return (
        <div className="hero-container">
            <Nav />

            <HeroImg />

            <HeroBanner />
            <style jsx>{`
                .hero-container {
                    position: relative;
                    height: 615px;
                }
            `}</style>
        </div>
    )
}