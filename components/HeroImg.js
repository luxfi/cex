import heroImg from '../assets/images/home/madmax.jpg'
export default props => {
    return (
        <div>
            <img src={heroImg} alt="hero image" />
            <style jsx>{`
                img {
                    width: 1440px;
                    position: absolute;
                    z-index: 0;
                    opacity: .75;
                    height: 615px;;
                    object-fit: cover;
                }
            `}</style>
        </div>
    )
}