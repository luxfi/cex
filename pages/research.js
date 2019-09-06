import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import { inject, observer } from 'mobx-react'
import HeaderInfo from '../components/research/HeaderInfo'
import ShareIcons from '../components/research/ShareIcons'
import StockInfo from '../components/research/StockInfo'

@inject('movieStore')
@observer
export default class Research extends React.Component {
    state = {
        whiteGutter: true,
    }
    static async getInitialProps({ mobxStore }) {
        await mobxStore.movieStore.fetch();
        return {
            movies: mobxStore.movieStore.movies,
        };
    }

    render() {
        const { movies } = this.props

        return (
            <TickerStripLayout movies={movies} darkNav={true}>
                <div className="container-center">
                    <div className="inner-container">
                        <div className="left-column">
                            <HeaderInfo />
                            <StockInfo movies={movies} />
                        </div>
                        <div className="right-column">
                            <ShareIcons />
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

