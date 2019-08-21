import ESXLogo from '../assets/images/esx/u1.png'
import "../assets/styles/base.css"
import 'react-multi-carousel/lib/styles.css'

export default props => {
    return (
        <div className="footer-container">
            <div className="footer-gutter"/>
            <div className="footer-column">
                <h2 className="title" >
                    Company
                </h2>
                <p className="element" >
                    <a href="#">About</a>
                </p>
                <p className="element" >
                    <a href="#">Legal & Privacy</a>
                </p>
                <p className="element" >
                    <a href="#">Support</a>
                </p>
            </div>
            <div className="column-pad"/>
            <div className="footer-column">
                <h2 className="title" >
                    Learn
                </h2>
                <p className="element" >
                    <a href="#">How to trade</a>
                </p>
                <p className="element" >
                    <a href="#">Technology</a>
                </p>
                <p className="element" >
                    <a href="#">Supported Platforms</a>
                </p>
            </div>
            <div className="column-pad"/>
            <div className="footer-column">
                <h2 className="title" >
                    Social
                </h2>
                <p className="element" >
                    <a href="#">Blog</a>
                </p>
                <p className="element" >
                    <a href="#">Twitter</a>
                </p>
                <p className="element" >
                    <a href="#">Facebook</a>
                </p>
            </div>
            <div className="column-pad"/>
            <div className="footer-column">
                <h2 className="title" >
                    Media
                </h2>
                <p className="element" >
                    <a href="#">Brand</a>
                </p>
                <p className="element" >
                    <a href="#">Press</a>
                </p>
                <p className="element" >
                    <a href="#">Clients & Partners</a>
                </p>
            </div>
            <div className="column-pad"/>
            <div className="footer-column">
                <img src={ESXLogo} alt="ESX" height='40px' style={{ margin: `-16px` }} />
                <p className="element" >
                    2018 © ESX, Co
                </p>
            </div>
            <div className="footer-gutter"/>
            <style jsx>{`

                a {
                    color: gray;
                    text-decoration: none;
                }

                .footer-container {
                    display: flex;
                    margin: auto;
                    background: #333333;
                    font-family: ‘BWHaasGroteskTF-55Roman-Web,sans-serif’, sans-serif;
                    color: white;
                    z-index: 1;
                    width: 100%;
                    height: 156px;
                    column-gap: 40px;
                }

                .footer-gutter {
                    width: 18%;
                }

                .column-pad {
                    width: 8%;
                }

                .element {
                    font-size: 11px;
                    color: gray;
                    margin: 0px 0px 1px 0px;
                }

                .title {
                    font-size: 12px;
                    margin: 0px 0px 3px 0px;
                }

                .footer-column {
                    display: flex;
                    flex-direction: column;
                    line-height: 25px;
                    justify-content: center;
                }
            `}</style>
        </div>
    )
}