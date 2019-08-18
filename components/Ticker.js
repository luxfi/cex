export default props => {
    return (
        <div>
            <div className="navi-markets-bar">
                <div className="navi-data-strip">
                    <div className="navi-data-strip__ticker-viewport">
                        <div className="navi-data-strip__ticker-viewport-inner">
                            <ul className="navi-data-strip__tickers-list-first animate-tickers-left" style={{ left: '-600px' }}>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">S&amp;P 500 Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">2891.50</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+42.900</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.51%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">Dow Jones Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">25907</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+332</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.30%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">S&amp;P 500 Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">2891.50</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+42.900</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.51%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">Dow Jones Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">25907</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+332</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.30%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">S&amp;P 500 Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">2891.50</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+42.900</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.51%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">Dow Jones Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">25907</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+332</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.30%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">S&amp;P 500 Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">2891.50</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+42.900</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.51%</div>
                                    </a>
                                </li>
                                <li className="navi-data-strip__ticker">
                                    <a href="#" className="navi-data-strip__ticker-link">
                                        <div className="navi-data-strip__ticker-label">Dow Jones Futures</div>
                                        <div className="navi-data-strip__ticker-market-price">25907</div>
                                        <div className="navi-data-strip__ticker-direction navi-data-strip__ticker-direction--positive" />
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+332</div>
                                        <div className="navi-data-strip__ticker-value navi-data-strip__ticker-value--positive">+1.30%</div>
                                    </a>
                                </li>
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

                // .navi *,
                // .navi-markets-bar *,
                // .navi-markets-bar :after,
                // .navi-markets-bar :before,
                // .navi :after,
                // .navi :before {
                //     box-sizing: inherit;
                //     margin: 0;
                //     padding: 0;
                //     border: 0;
                //     font: inherit
                // }

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
                    font-family: Bloomberg Logotypes-Medium, sans-serif;
                    font-size: 50px;
                    line-height: 1;
                    text-decoration: none;
                    color: #000
                }


                .navi-markets-bar {
                    margin: auto
                }

                // @media screen and (min-width:761px) {
                //     .navi-bar__button--menu:hover:before,
                //     .navi-bar__button--search:hover:before {
                //         opacity: .4
                //     }
                //     .navi[data-state=desktop-menu] .navi-bar__button--menu {
                //         color: #fff;
                //         background: #000
                //     }
                //     .navi[data-state=desktop-menu] .navi-bar__button--menu:before {
                //         background: url(https://assets.bwbx.io/s3/navi/images/hamburger_white-1856b100c7.svg) no-repeat 50%
                //     }
                //     .navi[data-state=desktop-menu] .navi-bar__button--menu:hover:before {
                //         opacity: 1
                //     }
                //     .navi[data-state=desktop-search] .navi-bar__button--search {
                //         color: #fff;
                //         background: #000;
                //         border: 1px solid #000
                //     }
                //     .navi[data-state=desktop-search] .navi-bar__button--search:before {
                //         background: url(https://assets.bwbx.io/s3/navi/images/search_white-25886d2f4b.svg) no-repeat 50%
                //     }
                //     .navi[data-state=desktop-search] .navi-bar__button--search:hover:before {
                //         opacity: 1
                //     }
                // }

                // @media screen and (min-width:1021px) {
                //     .navi-markets-bar {
                //         display: block
                //     }
                //     .navi-bar__button--sign-in:before {
                //         display: none
                //     }
                //     .navi-bar__right .navi-edition__dropdown {
                //         right: 0
                //     }
                //     .navi-bar__left .navi-edition {
                //         display: none
                //     }
                // }

                // @media screen and (min-width:1021px) and (max-width:1279px) {
                //     .navi-markets-bar {
                //         width: 980px
                //     }
                // }

                // @media screen and (min-width:1280px) {
                //     .navi-markets-bar {
                //         width: 1160px
                //     }
                // }

                // @media screen and (min-width:761px) and (max-width:1020px) {
                //     .navi-bar__button--sign-in:before {
                //         display: none
                //     }
                //     .navi-bar__left {
                //         left: 20px
                //     }
                //     .navi-bar__right {
                //         right: 20px
                //     }
                //     .navi-bar__logo--text {
                //         font-size: 38px
                //     }
                //     .navi-bar__left .navi-edition__dropdown {
                //         left: 0
                //     }
                //     .navi-bar__right .navi-edition,
                //     .navi-quick-links {
                //         display: none
                //     }
                // }

                // @media screen and (max-width:760px) {
                //     .navi-bar {
                //         margin: 0;
                //         border-bottom: 1px solid #999;
                //         height: 42px;
                //         padding-top: 0
                //     }
                //     .navi-bar__left {
                //         left: 0
                //     }
                //     .navi-bar__left:after {
                //         content: none
                //     }
                //     .navi-bar__left .navi-bar__button {
                //         margin-right: 0
                //     }
                //     .navi-bar__right {
                //         right: 0
                //     }
                //     .navi-bar__right:before {
                //         content: none
                //     }
                //     .navi-bar__right .navi-bar__button {
                //         margin-left: 0
                //     }
                //     .navi-bar__button {
                //         padding: 0 10px;
                //         line-height: 42px
                //     }
                //     .navi-bar__button--menu {
                //         display: inline-block;
                //         font-size: 0;
                //         border: 0
                //     }
                //     .navi-bar__button--menu:before {
                //         content: "";
                //         display: inline-block;
                //         margin: 0;
                //         width: 16px;
                //         height: 16px;
                //         vertical-align: middle;
                //         background: url(https://assets.bwbx.io/s3/navi/images/hamburger-1f9c80b47c.svg) no-repeat 50%
                //     }
                //     .navi-bar__button--search {
                //         display: none
                //     }
                //     .navi-bar__button--subscribe {
                //         border: 0
                //     }
                //     .navi-bar__button--sign-in {
                //         display: none;
                //         font-size: 0
                //     }
                //     .navi-bar__button--sign-in:before {
                //         display: inline-block
                //     }
                //     .navi-bar__logo--text {
                //         font-size: 28px;
                //         line-height: 42px
                //     }
                //     .navi-edition,
                //     .navi-quick-links,
                //     .navi .navi-menu {
                //         display: none
                //     }
                //     .navi[data-user-signed-in=true] .navi-bar .navi-sign-in-link {
                //         display: block
                //     }
                //     .navi[data-user-signed-in=true] .navi-bar .navi-subscribe-link {
                //         display: none
                //     }
                // }






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

                .navi-data-strip__ticker {
                    display: inline-block;
                    line-height: 30px;
                    padding: 0 10px;
                    font-family: BWHaasGrotesk-75Bold-Web, sans-serif;
                    font-size: 12px;
                }

                .navi-data-strip__ticker,
                .navi-data-strip__ticker-link {
                    color: #ffffffb5;
                    text-decoration: none
                }

                .navi-data-strip__ticker-link:visited {
                    color: #fff
                }

                .navi-data-strip__ticker-link:active,
                .navi-data-strip__ticker-link:hover {
                    cursor: pointer;
                    color: #767676
                }

                .navi-data-strip__ticker--hidden {
                    display: none
                }

                .navi-data-strip__ticker-label {
                    display: inline
                }

                .navi-data-strip__ticker-direction {
                    display: inline-block;
                    vertical-align: baseline;
                    vertical-align: initial
                }

                .navi-data-strip__ticker-direction--positive {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 5px 10px;
                    border-color: transparent transparent #1ecd93
                }

                .navi-data-strip__ticker-direction--negative {
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 10px 5px 0;
                    border-color: #ff433d transparent transparent
                }

                .navi-data-strip__ticker-value {
                    display: inline;
                    padding: 2px 2px 1px !important;
                    font-family: BWHaasGroteskTF-55Roman-Web, sans-serif;
                    font-size: 12px
                }

                .navi-data-strip__ticker-value--positive {
                    color: #1ecd93
                }

                .navi-data-strip__ticker-value--negative {
                    color: red
                }

                .navi-data-strip__ticker-market-price {
                    margin: 0px 4px !important;
                    display: inline;
                    font-size: 12px;
                    font-family: BWHaasGroteskTF-55Roman-Web, sans-serif
                }

                // @media screen and (max-width:760px) {
                //     .navi-data-strip {
                //         border-left: 0
                //     }
                //     .navi-data-strip__label {
                //         display: none
                //     }
                // }
            `}</style>
        </div>
    )
}
