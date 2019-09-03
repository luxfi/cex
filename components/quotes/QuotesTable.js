export default props => (
    <div className="container">
        < table className="table" >
            <tr>
                <th className="table-cell" scope="col">Player</th>
                <th className="table-cell" scope="col">Gloobles</th>
                <th className="table-cell right" scope="col">Za'taak</th>
            </tr>
            <tr>
                <th className="table-cell" scope="row">TR-7</th>
                <td className="table-cell" >7</td>
                <td className="table-cell right" >4,569</td>
            </tr>
            <tr>
                <th className="table-cell" scope="row">Khiresh Odo</th>
                <td className="table-cell" >7</td>
                <td className="table-cell right" >7,223</td>
            </tr>
            <tr>
                <th className="table-cell" scope="row">Mia Oolong</th>
                <td className="table-cell" >9</td>
                <td className="table-cell right" >6,219</td>
            </tr>
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
        `}</style>
    </div >

)