import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ESXLogo from '../assets/images/esx/u1.png'

export default props => {
    return (
        <div>
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
                header {
                    width: 100%;
                    height: 70px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    background: #232323;
                    color: #fff;
                    line-height: 30px;
                    font-family: 'BWHaasGroteskTF-55Roman-Web,sans-serif', sans-serif;
                    font-size: 12px;
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
                    width: 30%;
                }
                .nav-right {
                    display: flex;
                    justify-content: space-around;
                    width: 12%;
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