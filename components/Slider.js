import slide1 from '../assets/images/home/slide1.jpg'
import slide2 from '../assets/images/home/slide2.jpg'
import slide3 from '../assets/images/home/slide3.jpg'
import slide4 from '../assets/images/home/slide4.jpg'
import slide5 from '../assets/images/home/slide5.jpg'
import slide6 from '../assets/images/home/slide6.jpg'
import Carousel from 'react-multi-carousel'
import "../assets/styles/base.css"
import 'react-multi-carousel/lib/styles.css'
import SliderItem from "./SliderItem"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
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

class Slider extends React.Component {
    setCarouselRef(el) {
        this.Carousel = el;
    }

    render() {
        const sliderItems = this.props.movieStore.movies.slice(0, 14)
            .filter(item => item.verticalImg !== "N/A")
            .map((sliderItem, key) => {
                const { title, Imdbid, verticalImg } = sliderItem;
                return <SliderItem
                    key={Imdbid}
                    title={title}
                    imgSrc={verticalImg}
                    width="164px" />
            })
        const CustomLeftArrow = ({ onClick }) => {
            return <FontAwesomeIcon onClick={() => this.Carousel.next()} icon={faArrowLeft} style={{ width: "28px", left: "0px", paddingBottom: "34px", color: "#2d92dd", paddingRight: "22px" }} />;
        };
        const CustomRightArrow = ({ onClick }) => {
            return <FontAwesomeIcon onClick={() => this.Carousel.previous()} icon={faArrowRight} style={{ width: "28px", right: "0px", paddingBottom: "34px", color: "#2d92dd", paddingLeft: "22px" }} />
        };
        return (
            <div className="container">
                <CustomLeftArrow />
                < div className="slider" >
                    <div className="title">Trending Now</div >
                    <Carousel
                        ref={this.setCarouselRef.bind(this)}
                        arrows={false}
                        responsive={responsive}
                        ssr
                        infinite
                        beforeChange={() => this.setState({ isMoving: true })}
                        afterChange={() => this.setState({ isMoving: false })}
                        itemClass="custom-item"
                        containerClass="carousel-container"
                    >

                        {sliderItems}
                    </Carousel>
                </div>
                <CustomRightArrow />
                <style jsx>{`
                    .title {
                        color: #2d92dd;
                        font-size: 37px;
                        margin: 29px 0px 14px 0px;
                    }
                    .slider {
                        height 300px;
                        width: 885px;
                        // padding: 0px 278px;
                    }
                    .custom-item {
                        padding: 8px;
                    }
                    .container {
                        display: flex;
                        justify-content: center;
                    }
                `}</style>
            </div >
        )
    }
}

export default Slider;
