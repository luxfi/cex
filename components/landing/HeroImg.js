import React from "react"
import { Parallax, Background } from 'react-parallax'

export default props => {
  const { className, children, img } = props
  return (
    <>
      <div className={`hero-image-container ${className}`}>
        <Parallax strength={200}>
          <Background>
            <div className='hero-image'>
              { img }
            </div>
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
          height: 110vh;
          min-height: 600px;
          margin: 0px;
          padding: 0px;
          border: 0px;
          display: flex;
          align-items: center;
        }

        .hero-image-container :global(.react-parallax) {
          height: 100%;
        }

        .hero-image :global(img) {
          min-height: 800px;
          height: 130vh;
          margin-left: 50vw;
          margin-top: 5vh;
          width: auto !important;
        }

        .hero-image-content {
          width: 100vw;
        }
      `}</style>
    </>
  )
}
