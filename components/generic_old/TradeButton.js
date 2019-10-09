import Link from 'next/link'

const TradeButton = ({ ticker }) => {
  return (
    <div>
      <Link href={`/trade?ticker=${ticker}`}>
        <button className="btn invert">
          Trade
        </button>
      </Link>
      <style jsx>{`
                .btn.invert {
                    margin: 0;
                    padding: 0 6px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 2px;
                    background-color: #ff911e;
                    // box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
                    color: white;
                    margin: -3px 7px 0px 0px;;
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
                .btn.trade{
                    font-size: 9px;
                }
        `}</style>
    </div >
  )
}

export default TradeButton