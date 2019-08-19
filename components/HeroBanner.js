import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ESXLogo from '../assets/images/esx/u1.png'

export default props => {
    return (
        <div className="container">
            <header>
                <div className="info-container">
                    <h2 className="title" style={{ "font-size": "40px", margin: "0px 0px 4px 0px" }}>
                        Mad Max: Fury Road
                    </h2>
                    <p className="price" style={{ "font-size": "18px", margin: "0px 0px 4px 0px" }}>
                        $12.50
                    </p>
                    <p className="change" style={{ "font-size": "27px", margin: "0px" }}>
                        $1 (8.7%)
                    </p>
                </div>
                <div className="links">
                    <ul className="nav">
                        <li className="navlink"><a href="#">Trailer 1</a></li>
                        <li className="navlink"><a href="#">Trailer 2</a></li>
                        <li className="navlink"><a href="#">Official Website</a></li>
                    </ul>
                </div>
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
                .info-container {
                    display: flex;
                    flex-direction: column;
                    width: 50%;
                }
                .change {
                    color: #1ecd93;
                }
                .links {
                    display: flex;
                    justify-content: space-around;
                    width: 226px;
                }
                .nav {
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    align-items: center;
                }
                .navlink {
                    list-style: none;
                    margin: 0;
                }
                .navlink a {
                    color: #fff;
                    text-decoration: none;
                    font-size: 12px;
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