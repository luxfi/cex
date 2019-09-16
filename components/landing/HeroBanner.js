import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default props => {
  return (
    <div className="container">
      <header>
        <div className="info-container">
          <h2 className="title" style={{ fontSize: "40px", margin: "0px 0px 4px 0px" }}>
            Mad Max: Fury Road
                    </h2>
          <p className="price" style={{ fontSize: "18px", margin: "0px 0px 4px 0px" }}>
            $12.50
                    </p>
          <p className="change" style={{ fontSize: "27px", margin: "0px" }}>
            <FontAwesomeIcon icon={faArrowUp} style={{ width: '18px', paddingRight: "8px" }} />
            $1 (8.7%)
                    </p>
        </div>
        <div className="links">
          <ul className="nav">
            <li className="navlink"><a href="#">Trailer 1</a></li>
            <div className="divider" />
            <li className="navlink"><a href="#">Trailer 2</a></li>
            <div className="divider" />
            <li className="navlink"><a href="#">Official Website</a></li>
            <div className="break" />
            <a href="#" className="btn invert">Start Trading Now</a>
            <div className="break" />
            <li className="navlink"><a href="#">View Demo</a></li>
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
                    width: 100%;
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
                    margin: auto;
                }
                .info-container {
                    display: flex;
                    flex-direction: column;
                    width: 50%;
                }
                .change {
                    color: #0dc109;
                    margin-top: 2px;
                }
                .links {
                    display: flex;
                    justify-content: space-around;
                    width: 226px;
                }
                .nav {
                    display: flex;
                    justify-content: center;
                    width: 100%;
                    align-items: center;
                    padding: 0;
                    flex-wrap: wrap;
                }
                .navlink {
                    list-style: none;
                    margin: 8px 0px;
                }
                .navlink a {
                    color: #fff;
                    font-size: 12px;
                }
                .divider {
                    width: 1px;
                    background: #fff;
                    height: 12px;
                    margin: 8px;
                }
                .search {
                    text-decoration: none;
                    width: 12px;
                    // display: none;
                }
                .break {
                    flex-basis: 100%;
                    height: 0;
                }
                .btn.invert {
                    margin: 0;
                    padding: 0 48px;
                    height: 48px;
                    line-height: 48px;
                    border-radius: 7px;
                    background-color: #ff911e;
                    box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
                    color: white;
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
    </div>
  )
}