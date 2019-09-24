import heroImg from '../../assets/images/home/madmax.jpg'
export default props => {
  return (
    <div>
      <img src={heroImg} alt="hero image" />
      <style jsx>{`
                img {
                    width: 100%;
                    position: relative;
                    z-index: -1;
                    height: 685px;
                    object-fit: cover;
                    margin-top: -70px;
                }
            `}</style>
    </div>
  )
}