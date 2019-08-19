import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ESXLogo from '../assets/images/esx/u1.png'

export default props => {
    return (
        <div className="container">
            <header>
                <div className="logo">
                    <img src={ESXLogo} alt="ESX LOOG" height='80px' style={{ margin: `-16px` }} />
                    <div className="tagline">
                        <span>BUY AND SELL</span>
                        <span>HOLLYWOOD MOVIES</span>
                    </div>
                </div>
                <ul className="nav">
                    <li className="navlink"><a href="#">MY PORTFOLIO</a></li>
                    <li className="navlink"><a href="#">TRADE</a></li>
                    <li className="navlink"><a href="#">RESEARCH</a></li>
                    <li className="navlink"><a href="#">NEWS &amp; EVENTS</a></li>
                </ul>
                <ul className="nav nav-right">
                    <div className="search">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <li className="navlink"><a href="#">SIGN UP</a></li>
                    <li className="navlink"><a href="#">LOGIN</a></li>
                </ul>
            </header>
            <style jsx>{`
                .container {
                    // width: 100%;
                    display: flex;
                    margin: auto;
                    background: #0000005e;
                    z-index: 1;
                    width: 1440px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    
                }
                header {
                    width: 942px;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background: transparent;
                    color: #fff;
                    line-height: 30px;
                    font-family: 'BWHaasGroteskTF-55Roman-Web,sans-serif', sans-serif;
                    font-size: 12px;
                    margin: auto;
                }
                .tagline {
                    display: flex;
                    flex-direction: column;
                    line-height: 16px;
                    justify-content: center;
                }
                .logo {
                    display: flex;
                    flex-direction: row;
                }
                .nav {
                    display: flex;
                    justify-content: space-around;
                    width: 40%;
                }
                .nav-right {
                    display: flex;
                    justify-content: space-around;
                    width: 16%;
                }
                .navlink {
                    list-style: none;
                    margin: 0;
                }
                .navlink a {
                    color: #fff;
                    text-decoration: none;
                }
                .search {
                    text-decoration: none;
                    width: 12px;
                    // display: none;
                }
            `}</style>
        </div>
    )
}