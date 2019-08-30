import howToTradeImg from '../assets/images/howtotrade.png'

export default () => {
    return (
        <div className="how-to-trade-panel">
            <img className="image-panel" src={howToTradeImg} alt="How To Trade"/>
            <span className="text-panel">
                <h2 className="text-header">
                    Buy and sell major entertainment entities
                </h2>
                <div className="text-body">
                    You can trade stock for movies, reality shows, TV series, musicals, and more instantly with a bank account or debit card.
                </div>
                <h2 className="text-header">
                    Access prices and price charts
                </h2>
                <div className="text-body">
                    Wondering how your stock is doing? Check prices on the web or with our Android or iOS app.
                </div>
                <h2 className="text-header">
                    Store your trades safely
                </h2>
                <div className="text-body">
                    Over 98% of data is stored offline and the rest is protected by industry-leading online security.
                </div>
            </span>
            <style jsx>{`
            .how-to-trade-panel { 
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: center;
                padding: 0;
                flex-wrap: wrap;
            }
            .image-panel {
                width: 33%;
                padding-right: 20px;
            }
            .text-panel {
                width: 63%;
            }
            
            .text-header {
                width: 100%;
            }
            .text-body {
                width: 100%;
                padding-bottom: 10px;
            }
            .break {
                flex-basis: 100%;
                height: 0;
            }
            .demo {
                font-size: 11px;
                color: gray;
                padding-top: 10px;
            }
            `}</style>
        </div>
    )
}