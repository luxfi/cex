import TradeLink from './TradeLink'

export default (props) => {
  return (
    <div className="non-row">
      <TradeLink title={"Start Trading Now"} ticker={"MDMXFR"} />
      <a href="#" className="demo">View Demo</a>

      <style jsx>{`
          .btn {
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
            max-width: 30em;
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
          .demo {
              font-size: 11px;
              color: gray;
              padding-top: 10px;
          }
          .non-row {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
    </div>
  )
}