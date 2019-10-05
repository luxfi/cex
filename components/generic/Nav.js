import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
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
    <div className={`container ${props.darkNav ? 'darkNav' : ''}`} >
      <header>
        <Link href="/">
          <a>
            <div className="logo">
              <img src="/static/img/logo.png" alt="ESX LOGO" height='80px' style={{ margin: `-16px` }} />
              <div className="tagline">
                <span>BUY AND SELL</span>
                <span>HOLLYWOOD MOVIES</span>
              </div>
            </div>
          </a>
        </Link>
        <ul className="nav">
          <NavLink href="/portfolio" title="MY PORTFOLIO" />
          <NavLink href="/quotes" title="TRADE" />
          <NavLink href="/research" title="RESEARCH" />
          <NavLink href="#" title="NEWS &amp; EVENTS" />
        </ul>
        <ul className="nav nav-right">
          <div className="search">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <NavLink href="/register" title="SIGN UP" />
          <NavLink href="/login" title="LOGIN" />
        </ul>
      </header>
      <style jsx>{`
        a {
          color: #fff;
          text-decoration: none;
        }
        .container {
          display: flex;
          margin: auto;
          background: #0000005e;
          width: 100%;
          
        }
        .darkNav {
          background: #333 !important;
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
          padding-left: 0px;
          padding-right: 0px;
          width: 1242px;
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
        }
    `}</style>
    </ div>
  )
}