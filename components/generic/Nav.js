import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import ESXLogo from '../../assets/images/esx/u1.png'
import Link from 'next/link';

const NavLink = ({ href = '#', title }) => (
    <div>
        <li className="navlink">
            <Link href={href} >
                <a>{title}</a>
            </Link>
        </li>
        <style jsx>{`
        .navlink {
            list-style: none;
            margin: 0;
        }
        .navlink a {
            color: #fff;
            text-decoration: none;
        }
    `}</style>
    </div>
);

export default props => {
    return (
        <div className="container">
            <header>
                <div className="logo">
                    <img src={ESXLogo} alt="ESX LOGO" height='80px' style={{ margin: `-16px` }} />
                    <div className="tagline">
                        <span>BUY AND SELL</span>
                        <span>HOLLYWOOD MOVIES</span>
                    </div>
                </div>
                <ul className="nav">
                    <NavLink href="/quotes" title="MY PORTFOLIO" />
                    <NavLink href="/quotes" title="TRADE" />
                    <NavLink href="/quotes" title="RESEARCH" />
                    <NavLink href="/quotes" title="NEWS &amp; EVENTS" />
                </ul>
                <ul className="nav nav-right">
                    <div className="search">
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <NavLink href="/quotes" title="SIGN UP" />
                    <NavLink href="/quotes" title="LOGIN" />
                </ul>
            </header>
            <style jsx>{`
                .container {
                    display: flex;
                    margin: auto;
                    background: #0000005e;
                    width: 100%;
                    
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
                .search {
                    text-decoration: none;
                    width: 12px;
                    // display: none;
                }
            `}</style>
        </div>
    )
}