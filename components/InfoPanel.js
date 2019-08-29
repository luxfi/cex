export default props => {
    return (
        <div className="info-panel">
            <div className="content-panel">
                <img className="info-panel-img" src={props.imgSrc} alt={props.imgAlt}/>
            </div>
            <div className="content-panel">
                <h2>{props.headerTxt}</h2>
            </div>
            <div className="content-panel">
                <p>{props.bodyTxt}</p>
            </div>
            <style jsx>{`
            .info-panel {
                font-family: ‘BWHaasGroteskTF-55Roman-Web,sans-serif’, sans-serif;
                flex: 1;
                height: auto;
                margin: 26px 0px;
                align: center;
            }
            .content-panel {
                width: 100%;
                align-content: center;
                text-align: center;
                padding: 5px;
            }
            .info-panel-img {
                height: 150px;
            }
            `}</style>
        </div>
    )
}