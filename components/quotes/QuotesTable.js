import TradeButton from '../generic/TradeButton.js'
const row = (props) => {
    <tr>
        <th className="table-cell left" scope="row">{props.name || "Name"}</th>
        <td className="table-cell left" >{props.symbol || "SMBL"}</td>
        <td className="table-cell left" >{props.price || "$1.11"}</td>
        <td className="table-cell left" >{props.change || "1.1%"}</td>
        <td className="table-cell left" >{props.marketCap || "$111"}</td>
        <td className="table-cell left" >{props.chart || "TBD"}</td>
        <td className="table-cell left" ><TradeButton /></td>

    </tr>
}
export default props => (
    <div className="container">
        < table className="table" >
            <tr>
                <th className="table-cell head left" scope="col">Name</th>
                <th className="table-cell head left" scope="col">Symbol</th>
                <th className="table-cell head left" scope="col">Price</th>
                <th className="table-cell head left" scope="col">Market Cap</th>
                <th className="table-cell head left" scope="col">Chart</th>
                <th className="table-cell head left" scope="col">Trade</th>
            </tr>
            {row(props)}
        </table>
        <style jsx>{`
            .table-cell {
                display: table-cell;
                padding: 14px 40px 14px 16px;
                font-size: 0.875rem;
                text-align: left;
                font-weight: 400;
                line-height: 1.43;
                border-bottom: 1px solid rgba(224, 224, 224, 1);
                letter-spacing: 0.01071em;
            }
            .table {
                width: 1146px;
                display: table;
                border-spacing: 0;
                border-collapse: collapse;
            }
            .container {
                display: flex;
                justify-content: center;
            }
            .right {
                text-align: right;
            }
            .lefft {
                text-align: left;
            }
            .head {
                color: rgba(0, 0, 0, 0.54);
                font-size: 12px;
                line-height: 1.3125rem;
                font-weight: 500;
                text-transform: uppercase;
                border-top: 1px solid rgba(224, 224, 224, 1);
            }
        `}</style>
    </div >

)