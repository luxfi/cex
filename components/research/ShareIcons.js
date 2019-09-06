import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faGoogle, faPinterest } from '@fortawesome/free-brands-svg-icons'

export default props => {
    return (
        <div>
            <div className="share-container">
                <div className="social-links">
                    <a href="https://www.facebook.com/sharer/sharer.php?u={PAGEURL}&t={PAGETITLE}" target="_blank" title="Share on Facebook" className="fa-facebook">
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="https://twitter.com/intent/tweet?source={PAGEURL}&text={PAGETITLE}:{PAGEURL}&via={TWITTERUSERNAME}" target="_blank" title="Tweet" className="fa-twitter">
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="https://plus.google.com/share?url={PAGEURL}" target="_blank" title="Share on Google+" className="fa-google">
                        <FontAwesomeIcon icon={faGoogle} />
                    </a >
                    <a href="http://pinterest.com/pin/create/button/?url={PAGEURL}&media={PAGEIMAGEURL}&description={PAGEDESCRIPTION}" target="_blank" title="Pin it" className="fa-pinterest">
                        <FontAwesomeIcon icon={faPinterest} />
                    </a >
                    <a href="mailto:?subject={PAGETITLE}&body={PAGEDESCRIPTION}:{PAGEURL}" target="_blank" title="Share via Email" className="fa-envelope">
                        <FontAwesomeIcon icon={faEnvelope} />
                    </a >
                    <a href="#" target="_blank" title="likes" className="likes">
                        1.5k
                    </a >
                </div >
                <style jsx>{`
                .share-container {
                    display: flex;
                    flex-direction: row;
                    margin-top: 20px;
                }
                .social-links {
                    width: 221px;
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
            </div>
        </div >
    )
}