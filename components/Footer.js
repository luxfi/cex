import ESXLogo from '../assets/images/esx/u1.png'

export default props => {
    return (
        <div>
            <div className="column-company">
                <h2 className="title" style={{ "font-size": "12px", margin: "0px 0px 4px 0px" }}>
                    Company
                </h2>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">About</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Legal & Privacy</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Support</a>
                </p>
            </div>
            <div className="column-learn">
                <h2 className="title" style={{ "font-size": "12px", margin: "0px 0px 4px 0px" }}>
                    Learn
                </h2>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">How to trade</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Technology</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Supported Platforms</a>
                </p>
            </div>
            <div className="column-social">
                <h2 className="title" style={{ "font-size": "12px", margin: "0px 0px 4px 0px" }}>
                    Social
                </h2>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Blog</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Twitter</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Facebook</a>
                </p>
            </div>
            <div className="column-media">
                <h2 className="title" style={{ "font-size": "12px", margin: "0px 0px 4px 0px" }}>
                    Media
                </h2>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Brand</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Press</a>
                </p>
                <p className="element" style={{ "font-size": "11px", margin: "0px 0px 4px 0px" }}>
                    <a href="#">Clients & Partners</a>
                </p>
            </div>
            <div className="column-logo">
                <img src={ESXLogo} alt="ESX" height='40px' style={{ margin: `-16px` }} />
                <p className="element" style={{ "font-size": "8px", margin: "0px 0px 4px 0px" }}>
                    2018 © ESX, Co
                </p>
            </div>
            <style jsx>{``}</style>
        </div>
    )
}