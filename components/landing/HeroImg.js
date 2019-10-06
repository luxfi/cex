import React from "react"
import { Parallax, Background } from 'react-parallax'

export default props => {
  const { className, children, img } = props
  return (
    <>
      <div className={`hero-image-container ${className}`}>
        <Parallax strength={600}>
          <Background>
            <img className='hero-image' src={img} alt='Terminator Dark Fate'/>
          </Background>
          <div className='hero-image-content'>
            {children}
          </div>
        </Parallax>
      </div>
      <style jsx>{`
        .hero-image-container {
          overflow: hidden;
          background-color: #000;
          height: 95vh;
          min-height: 600px;
          max-height: 1000px;
          margin: 0px;
          padding: 0px;
          border: 0px;
          display: flex;
          align-items: center;
        }

        .hero-image-container :global(.react-parallax) {
          height: 100%;
        }

        .hero-image {
          min-height: 800px;
          height: 120vh;
          margin-left: 50vw;
          margin-top: 35vh;
          width: auto !important;
        }

        .hero-image-content {
          width: 100vw;
        }
      `}</style>
    </>
  )
}
