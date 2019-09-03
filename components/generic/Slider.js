import Carousel from 'react-multi-carousel'
import Head from 'next/head'
import "../../assets/styles/base.css"
import 'react-multi-carousel/lib/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 6,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 6,
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
        const CustomLeftArrow = ({ onClick }) => {
            return <FontAwesomeIcon onClick={() => this.Carousel.previous()} icon={faArrowLeft} style={{ cursor: 'pointer', width: "28px", left: "0px", paddingBottom: "34px", color: "#2d92dd", paddingRight: "22px" }} />;
        };
        const CustomRightArrow = ({ onClick }) => {
            return <FontAwesomeIcon onClick={() => this.Carousel.next()} icon={faArrowRight} style={{ cursor: 'pointer', width: "28px", right: "0px", paddingBottom: "34px", color: "#2d92dd", paddingLeft: "22px" }} />
        };
        return (
            <div className="container">
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Hind&display=swap" rel="stylesheet" />
                </Head>
                <CustomLeftArrow />
                < div className="slider" >
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
                        additionalTransfrom={-1 * 5}
                    >

                        {this.props.sliderItems}
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
              width: 1146px;
          }
          .container {
              display: flex;
              width: 100%;
              padding: 30px 0px;
              justify-content: center;
          }
        `}</style>
            </div >
        )
    }
}

export default Slider;
