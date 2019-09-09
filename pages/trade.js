import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import StockInfo from '../components/trade/StockInfo'
import Chart from '../components/generic/Chart'
import madmax from '../assets/images/trade/madmax.jpeg'

@inject('store')
@observer
export default class Trade extends React.Component {
    state = {
        whiteGutter: true,
    }
    static async getInitialProps({ mobxStore }) {
        await mobxStore.movieStore.fetch();
        return {
            movieStore: mobxStore.movieStore,
        };
    }

    render() {
        const { movieStore } = this.props.store

        return (
            <TickerStripLayout movies={movieStore.movies} darkNav={true}>
                <div className="container-center">
                    <div className="inner-container row">
                        <div className="column-container">
                            <h2 className="title dark" style={{ fontSize: "40px", margin: "20px 0px 4px 0px", fontWeight: "lighter" }}>
                                Mad Max: Fury Road
                            </h2>
                            <div className="flex-row space-between">
                                <StockInfo movies={movieStore.movies} />
                                <div className="box-item">
                                    <table className="noborder">
                                        <tbody>
                                            <tr><td className="light-grey" style={{ paddingTop: "0px" }}>Price</td><td className="white" style={{ paddingTop: "0px" }} >$12.25</td></tr>
                                            <tr><td className="light-grey">Change</td><td className="white">$0.80 (7.0%)</td></tr>
                                            <tr><td className="light-grey">Market Cap</td><td className="white">$90.2M</td></tr>
                                            <tr><td className="light-grey" style={{ paddingBottom: "0px" }} >Volume</td><td className="white" style={{ paddingBottom: "0px" }}>$1.7M</td></tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-center" style={{ paddingTop: "20px" }}>
                    <div className="inner-container row">
                        <div className="wide-column">
                            <Chart width="844px" />
                        </div>
                        <div className="thin-column">
                            <img src={madmax} style={{ width: "282px", paddingLeft: "20px", paddingTop: "99px" }} />
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
                    }
                    .column-container {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                    }
                    .inner-container.row {
                        display: flex;
                        flex-direction: row;
                        width: 1146px;
                    }
                    .flex-row {
                        display: flex;
                        flex-direction: row;
                    }
                    .space-between {
                        justify-content: space-between;
                    }
                    .box-item {
                        background: #6f6a6a;
                        color: white;
                        text-align: left;
                        // flex-grow: 1;
                        margin: 20px 0px;
                        padding: 16px;
                        width: 250px;
                    }
                    .wide-column {
                        // width: 906px;
                        width: 844px;
                    }
                    .thin-column {
                        width: 240px;
                    }
                    .links {
                        display: flex:
                        justify-content: center:
                    }
                    .link {
                        padding: 0px 12px;
                        color: grey;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                    .divider {
                        text-decoration: none;
                    }
                    .video {
                        padding-top: 20px;
                    }
                    td {
                        padding-right: 30px;
                        padding-bottom: 4px;
                    }  
                    .white {
                        color: white;
                        padding-right: 0px;
                    }
                    .light-grey {
                        color: #bdbdbd;
                    }
                `}</style>
            </TickerStripLayout>
        )
    }
}

