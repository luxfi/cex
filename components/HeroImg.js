import heroImg from '../assets/images/home/madmax.jpg'
export default props => {
    return (
        <div>
            <img src={heroImg} alt="hero image" />
            <style jsx>{`
                img {
                    width: 100%;
                    position: absolute;
                    z-index: 0;
                    height: 615px;;
                    object-fit: cover;
                }
            `}</style>
        </div>
    )
}