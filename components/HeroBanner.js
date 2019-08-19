import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ESXLogo from '../assets/images/esx/u1.png'

export default props => {
    return (
        <div className="container">
            <header>
                <div className="info-container">
                    <h2 style={{ "font-size": "38px", margin: "0px 0px 8px 0px" }}>
                        Mad Max: Fury Road
                    </h2>
                    <p style={{ "font-size": "18px", margin: "0px 0px 8px 0px" }}>
                        $12.50
                    </p>
                    <p style={{ "font-size": "34px", margin: "0px" }}>
                        $1 (8.7%)
                    </p>
                </div>
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
                    justify-content: space-between;
                    
                    
                }
                header {
                    width: 888px;
                    height: 146px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: transparent;
                    color: #fff;
                    font-family: 'BWHaasGroteskTF-55Roman-Web,sans-serif', sans-serif;
                    margin: auto;
                }
                .tagline {
                    display: flex;
                    flex-direction: column;
                    line-height: 16px;
                    justify-content: center;
                }
                .info-container {
                    display: flex;
                    flex-direction: column;
                    width: 50%;
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