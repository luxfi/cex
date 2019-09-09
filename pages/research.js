import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import HeaderInfo from '../components/research/HeaderInfo'
import ShareIcons from '../components/research/ShareIcons'
import StockInfo from '../components/research/StockInfo'
import MoreLikeThis from '../components/research/MoreLikeThis'
import RelatedPosts from '../components/research/RelatedPosts'
import Forecasts from '../components/research/Forecasts'
import Chart from '../components/generic/Chart'

@inject('store')
@observer
export default class Research extends React.Component {
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
                    <div className="inner-container">
                        <div className="wide-column">
                            <HeaderInfo />
                            <StockInfo movies={movieStore.movies} />
                            <iframe className="video" width="886" height="498" src="https://www.youtube.com/embed/hEJnMQG9ev8" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        </div>
                        <div className="thin-column">
                            <ShareIcons />
                            <MoreLikeThis movies={movieStore.movies} />
                            <RelatedPosts />
                        </div>
                    </div>
                </div>
                <div className="container-center" style={{ paddingTop: "20px" }}>
                    <div className="inner-container">
                        <div className="thin-column">
                            <Forecasts />
                        </div>
                        <div className="wide-column">
                            <Chart />
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
                    }
                    .inner-container {
                        display: flex;
                        flex-direction: row;
                        width: 1146px;
                    }
                    .wide-column {
                        width: 906px;
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
                `}</style>
            </TickerStripLayout>
        )
    }
}

