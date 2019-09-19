// import Nav from '../generic/Nav'
import Header from '../layout/header'
import HeroImg from './HeroImg'
import HeroBanner from './HeroBanner'

export default props => {
  return (
    <div className="hero-container">
      {/* <Nav /> */}
      <Header />

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