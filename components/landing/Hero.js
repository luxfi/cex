// import Nav from '../generic/Nav'
import HeroImg from "./HeroImg"

export default props => {
  return (
    <div className="hero-container">
      <HeroImg />
      <style jsx>{`
        .hero-container {
          position: relative;
          height: 679px;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
