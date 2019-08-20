import slide1 from '../assets/images/home/slide1.jpg'
import slide2 from '../assets/images/home/slide2.jpg'
import slide3 from '../assets/images/home/slide3.jpg'
import slide4 from '../assets/images/home/slide4.jpg'
import slide5 from '../assets/images/home/slide5.jpg'
import slide6 from '../assets/images/home/slide6.jpg'

export default props => {
    return (
        <div className="slider">
            <div className="container">
                <img src={slide1} alt="slide1" />
                <img src={slide2} alt="slide2" />
                <img src={slide3} alt="slide3" />
                <img src={slide4} alt="slide4" />
                <img src={slide5} alt="slide5" />
                <img src={slide6} alt="slide6" />
            </div>
            <style jsx>{`
                .slider {
                    position: absolute;
                }
                img {
                    width: 166px;
                    margin: 0px 8px;
                }
            `}</style>
        </div>
    )
}