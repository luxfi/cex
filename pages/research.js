import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import HeaderInfo from '../components/research/HeaderInfo'
import ShareIcons from '../components/research/ShareIcons'
import StockInfo from '../components/research/StockInfo'
import MoreLikeThis from '../components/research/MoreLikeThis'

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
                        <div className="left-column">
                            <HeaderInfo />
                            <StockInfo movies={movieStore.movies} />
                        </div>
                        <div className="right-column">
                            <ShareIcons />
                            {/* <MoreLikeThis /> */}
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
                    .left-column {
                        width: 906px;
                    }
                    .right-column {
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
                `}</style>
            </TickerStripLayout>
        );
    }
}

