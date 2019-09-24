import React from "react"
import heroImg from "../../assets/img/terminator.jpg"
export default props => {
  const { className, children } = props
  return (
    <>
      <div
        style={{
          backgroundImage: `url('${heroImg}')`
        }}
        className={`hero-image ${className}`}
      >
        {children}
      </div>
      <style jsx>{`
        .hero-image {
          overflow: hidden;
          height: 90vh;
          maxheight: "1000px";
          background-position: center center;
          background-size: cover;
          margin: 0px;
          padding: 0px;
          border: 0px;
          display: flex;
          align-items: center;
        }
      `}</style>
    </>
  )
}
