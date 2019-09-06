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
                <a href="#" className="btn invert">Trade This Stock</a>
                <a href="#" className="btn invert blue">Watch This Trailer</a>
                <div className="links-2">
                    <a href="#" className="link">Offical Website</a>
                    <a href="#" className="link">|</a>
                    <a href="#" className="link">Trailer 1</a>
                    <a href="#" className="link">|</a>
                    <a href="#" className="link">Trailer 2</a>
                </div>
                <div className="info-1 dark">
                    <a href="#">Creators:</a> George Miller, Brendan McCarthy
                </div>
                <div className="info-2 dark">
                    <a href="#">Stars:</a> Tom Hardy, Charlize Theron, Nicholas Hoult
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
                    margin-top: 16px;
                }
                .link {
                    font-size: 8pt;
                    padding-right: 10px;
                    color: #6da7ee;
                }
                .links {
                    margin-bottom: 8px;
                }
                .links-2 .link {
                    color: grey;
                }
                .links-2 {
                    margin-bottom: 16px
                }
                .btn.invert {
                    margin: 0;
                    padding: 0 48px;
                    height: 48px;
                    line-height: 48px;
                    border-radius: 4px;
                    background-color: #ff911e;
                    color: white;
                    margin: 8px 16px 16px 0px;
                }
                .btn.invert.blue {
                    background-color: rgb(60, 153, 247);
                }
                .btn {
                    display: inline-block;
                    cursor: pointer;
                    text-decoration: none;
                    padding: 0.25rem 0.5rem;
                    margin: -0.25rem -0.5rem;
                    border-radius: 7px;
                    color: #ff911e;
                    background-color: transparent;
                    border: none;
                    font-size: inherit;
                    line-height: inherit;
                    transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
                }        
            `}</style>
        </div >
    )
}