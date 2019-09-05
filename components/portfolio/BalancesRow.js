import React from 'react'
import { inject, observer } from 'mobx-react'
import PageRow from '../generic/PageRow'


@inject('movieStore')
@observer
export default class BalancesRow extends React.Component {
    state = {
        whiteGutter: true,
    }
    static async getInitialProps({ mobxStore }) {
        await mobxStore.movieStore.fetch();
        return {
            movies: mobxStore.movieStore.movies,
            topMovies: mobxStore.movieStore.topMovies,
        };
    }

    render() {
        const { topMovies, movies } = this.props
        const { currentPage } = this.state;

        const balancesFitler = () => (
            <div className="container">
                <ul>
                    <li>
                        <a href="#" className="filter selected">day</a>
                    </li>
                    <li>
                        <span className="filter">|</span>
                    </li>
                    <li>
                        <a href="#" className="filter">month</a>
                    </li>
                    <li>
                        <span className="filter">|</span>
                    </li>
                    <li>
                        <a href="#" className="filter">year</a>
                    </li>
                </ul>

                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                    }
                    ul {
                        list-style-type: none;
                        display: flex;
                        padding-left: 24px;
                    }
                    .filter {
                        padding-right: 10px;
                        color: #6a5a5a;
                    }
                    .selected {
                        color: #6da7ee;
                        text-decoration: none;
                    }
                `}</style>
            </div>
        )

        return (
            <PageRow whiteGutter={this.state.whiteGutter} rowTitle={"Balances"} hideInnerPadding filters={balancesFitler()}>
                <div className="container-center-content">
                    <div className="flex-container">
                        <div className="flex-item"> 1</div>
                        <div className="flex-item">2</div>
                        <div className="flex-item">3</div>
                    </div>
                    <style jsx>{`
                        .flex-container {
                            display: flex;
                            justify-content: space-around;
                            align-items: stretch;
                            width: 1146px;
                        }
                        .flex-item {
                            background: grey;
                            line-height: 100px;
                            font-weight: bold;
                            font-size: 2em;
                            color: white;
                            text-align: center;
                            flex-grow: 1;
                            margin: 8px;
                        }
                        .container-center-content {
                            display: flex;
                            justify-content: center;
                        }
                    `}</style>
                </div>
            </PageRow>
        );
    }
}

