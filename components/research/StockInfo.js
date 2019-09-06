import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faGoogle, faPinterest } from '@fortawesome/free-brands-svg-icons'

export default props => {
    const madMaxMovie = props.movies.find(movie => movie.Imdbid === "tt1392190")
    return (

        <div className="share-container">
            <img src={madMaxMovie.verticalImg} alt="poster" style={{ width: "290px" }} />
            <style jsx>{`
                .share-container {
                    display: flex;
                    flex-direction: row;
                    margin-top: 20px;
                }
                .social-links a {     
                    margin: 3px;
                    display: inline-block;
                    color: white;
                    padding: 6px;
                    border-radius: 2px;
                }
                .fa-facebook { background: #3B5998; }
                .fa-twitter { background: #55ACEE; }
                .fa-google { background: #dd4b39; }
                .fa-pinterest { background: #cb2027; }
                .fa-envelope { background: #007bb5; }
                .social-links a.likes {
                    color: black;
                    text-decoration: none;
                    border: 1px solid black;
                }
               
            `}</style>
        </div >
    )
}