import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faGoogle, faPinterest } from '@fortawesome/free-brands-svg-icons'

export default props => {
    const madMaxMovie = props.movies.find(movie => movie.Imdbid === "tt1392190")
    return (

        <div className="stock-info">
            <img src={madMaxMovie.verticalImg} alt="poster" style={{ width: "290px", padding: "20px 0px" }} />
            <div className="right-column">
                <div className="links">
                    <a href="#" className="link">16+</a>
                    <a href="#" className="link">|</a>
                    <a href="#" className="link">43min</a>
                    <a href="#" className="link">|</a>
                    <a href="#" className="link">Action, Adventure, Drama</a>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            <style jsx>{`
                .stock-info {
                    display: flex;
                }
                .right-column {
                    padding: 20px;
                    width: 576px;
                }
                p {
                    padding: 0px;
                    margin: 0px;
                }
                .link {
                    font-size: 8pt;
                    padding-right: 10px;
                    color: #6da7ee;
                }
                .links {
                    margin-bottom: 8px;
                }           
            `}</style>
        </div >
    )
}