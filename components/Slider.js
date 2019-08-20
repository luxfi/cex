import slide1 from '../assets/images/home/slide1.jpg'
import slide2 from '../assets/images/home/slide2.jpg'
import slide3 from '../assets/images/home/slide3.jpg'
import slide4 from '../assets/images/home/slide4.jpg'
import slide5 from '../assets/images/home/slide5.jpg'
import slide6 from '../assets/images/home/slide6.jpg'
import Carousel from 'react-multi-carousel'
// import 'react-multi-carousel/lib/styles.css'

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

export default props => {
    return (
        <div className="slider">
            <div className="background">
                <div className="left">left</div>
                <div className="right">right</div>
            </div>
            <Carousel
                className="content-container"
                responsive={responsive}
                ssr
            >
                <img src={slide1} alt="slide1" />
                <img src={slide2} alt="slide2" />
                <img src={slide3} alt="slide3" />
                <img src={slide4} alt="slide4" />
                <img src={slide5} alt="slide5" />
                <img src={slide6} alt="slide6" />
            </Carousel>

            <style jsx>{`
                .slider {
                    margin-top: 86px;
                    height 300px;
                    width: 1440px;
                }
                img {
                    width: 164px;
                    margin: 0px 8px;
                }
                .container {
                    display: flex;
                    height: 100%;
                }
                .background {
                    display: flex;
                    height: 100%;
                }

                .left {
                    // background: black;
                    width: 30%;
                    position: relative;
                }

                .left:before {
                    content: '';
                    position: absolute;
                    // background-image: linear-gradient(to right,#000,transparent);
                    top: 0;
                    bottom: 0;
                    left: 100%;
                    width: 275px;
                }

                .right {
                    // background: green;
                    width: 70%;
                }

                .content-container {
                    color: white;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin-left: 270px;
                    // padding: 30px
                }
            `}</style>
        </div>
    )
}