import heroImg from "../../assets/img/terminator.jpg"
export default props => {
  return (
    <div>
      <img src={heroImg} alt="hero image" />
      <style jsx>{`
        img {
          width: 100%;
          position: relative;
          z-index: -1;
          object-fit: cover;
          margin-top: -70px;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
