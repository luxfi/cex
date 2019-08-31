import Ticker from './Ticker'

export default props => {
    // console.log("The first title: ", props.movieStore.movies && props.movieStore.movies[0].title)
    const tickers = props.movies.slice(0, 14).map((ticker, key) => {
        const { title, price, change, percentChange, symbol, Imdbid } = ticker;
        return <Ticker
            key={Imdbid}
            title={title}
            price={price}
            change={change}
            symbol={symbol}
            percentChange={percentChange} />
    })

    return (
        <div>
            <div className="navi-markets-bar">
                <div className="navi-data-strip">
                    <div className="navi-data-strip__ticker-viewport">
                        <div className="navi-data-strip__ticker-viewport-inner">
                            <ul className="navi-data-strip__tickers-list-first animate-tickers-left" style={{ left: '-50px' }}>
                                {tickers}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .navi,
                .navi-markets-bar {
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    box-sizing: border-box;
                    font: initial;
                    line-height: 1;
                    visibility: visible
                }

                .navi-menu {
                    -webkit-transform: translateX(-100%);
                    transform: translateX(-100%);
                    transition: -webkit-transform .4s step-end;
                    transition: transform .4s step-end;
                    transition: transform .4s step-end, -webkit-transform .4s step-end;
                    overflow: hidden;
                    position: absolute;
                    visibility: hidden
                }

                .navi-menu__inner {
                    display: table;
                    box-sizing: border-box;
                    background-color: #000;
                    -webkit-transform: translateY(-100%);
                    transform: translateY(-100%);
                    transition: -webkit-transform .3s ease .1s;
                    transition: transform .3s ease .1s;
                    transition: transform .3s ease .1s, -webkit-transform .3s ease .1s
                }

                .navi-menu__inner .navi-submenu {
                    height: 0
                }

                .navi-menu__inner .navi-sections,
                .navi-menu__inner .navi-submenu--is-open {
                    opacity: 0;
                    transition: opacity .2s ease
                }

                .navi-menu__inner .navi-sections {
                    height: 0
                }

                .navi {
                    position: relative
                }

                .navi[data-user-subscribed=true] .navi-subscribe-link {
                    display: none
                }

                .navi-bar {
                    background-color: #fff;
                    text-align: center;
                    margin-bottom: 20px;
                    padding-top: 11px
                }

                .navi-bar__left,
                .navi-bar__right {
                    position: absolute;
                    display: inline-block
                }

                .navi-bar__left {
                    left: 20px;
                    text-align: left
                }

                .navi-bar__logo--text {
                    display: inline-block;
                    font-size: 50px;
                    line-height: 1;
                    text-decoration: none;
                    color: #000
                }


                .navi-markets-bar {
                    margin: auto
                }

                
                @-webkit-keyframes animateFirstList {
                    0% {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                    50% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 1
                    }
                    50.1% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 0
                    }
                    50.2% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 0
                    }
                    50.3% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                    to {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                }

                @keyframes animateFirstList {
                    0% {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                    50% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 1
                    }
                    50.1% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 0
                    }
                    50.2% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 0
                    }
                    50.3% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                    to {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                }

                @-webkit-keyframes animateSecondList {
                    0% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                    50% {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                    99.7% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 1
                    }
                    99.8% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 0
                    }
                    99.9% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 0
                    }
                    to {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                }

                @keyframes animateSecondList {
                    0% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                    50% {
                        -webkit-transform: translateX(0);
                        transform: translateX(0);
                        opacity: 1
                    }
                    99.7% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 1
                    }
                    99.8% {
                        -webkit-transform: translateX(-100%);
                        transform: translateX(-100%);
                        opacity: 0
                    }
                    99.9% {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 0
                    }
                    to {
                        -webkit-transform: translateX(100%);
                        transform: translateX(100%);
                        opacity: 1
                    }
                }

                .navi-data-strip {
                    display: block;
                    position: relative;
                    width: 100%;
                    height: 32px;
                    background: #000000d4;
                }

                .navi-data-strip__ticker-viewport {
                    display: block;
                    position: absolute;
                    top: 0;
                    overflow: hidden;
                    width: 100%;
                    height: 30px;
                    -webkit-backface-visibility: hidden;
                    backface-visibility: hidden
                }

                .navi-data-strip__ticker-viewport-inner {
                    position: absolute;
                    width: 10000px;
                    height: 32px;
                    display: table
                }

                .navi-data-strip__tickers-list-first {
                    list-style: none;
                    position: absolute;
                    display: inline-block;
                    -webkit-transform: translateX(0);
                    transform: translateX(0);
                    margin: 0;
                    padding: 0;
                }

                .navi-data-strip__tickers-list-first.animate-tickers-left {
                    transition: 120s linear;
                    -webkit-animation: animateFirstList 120s linear;
                    animation: animateFirstList 120s linear;
                    -webkit-animation-iteration-count: infinite;
                    animation-iteration-count: infinite
                }

                .navi-data-strip__tickers-list-second {
                    list-style: none;
                    position: absolute;
                    display: inline-block;
                    -webkit-transform: translateX(100%);
                    transform: translateX(100%);
                    margin: 0;
                    padding: 0;
                }

                .navi-data-strip__tickers-list-second.animate-tickers-left {
                    transition: 120s linear;
                    -webkit-animation: animateSecondList 120s linear;
                    animation: animateSecondList 120s linear;
                    -webkit-animation-iteration-count: infinite;
                    animation-iteration-count: infinite
                }

                .navi-data-strip__ticker--hidden {
                    display: none
                }
            `}</style>
        </div>
    )
}
