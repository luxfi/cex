export default ({ title = "Missing Title", symbol = "XXX", price = 11.11, change = 1, percentChange = .1111, id }) => {
  const direction = change >= 0 ? "positive" : "negative";
  return (
    <span className="navi-data-strip__ticker">
      <a href="#" className="navi-data-strip__ticker-link">
        <span className="navi-data-strip__ticker-label">{title}</span>
        <span className="navi-data-strip__ticker-symbol">({symbol})</span>
        <span className="navi-data-strip__ticker-market-price">{price}</span>
        <span className={`navi-data-strip__ticker-direction navi-data-strip__ticker-direction--${direction}`} />
        <span className={`navi-data-strip__ticker-value navi-data-strip__ticker-value--${direction}`}>{change}</span>
        <span className={`navi-data-strip__ticker-value navi-data-strip__ticker-value--${direction}`}>{percentChange}</span>
      </a>
      <style jsx>{`
                .navi-data-strip__ticker {
                    display: inline-block;
                    line-height: 30px;
                    padding: 0 10px;
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

                .navi-data-strip__ticker-symbol,
                .navi-data-strip__ticker-label {
                    display: inline
                }

                .navi-data-strip__ticker-symbol {
                    margin-left 4px !important;
                }

                .navi-data-strip__ticker-market-price {
                    margin: 0px 4px !important;
                    display: inline;
                    font-size: 12px;
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
                    font-size: 12px
                }

                .navi-data-strip__ticker-value--positive {
                    color: #1ecd93
                }

                .navi-data-strip__ticker-value--negative {
                    color: #ff433d;
                }
        `}</style>
    </span>



  )
}
