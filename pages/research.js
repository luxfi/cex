import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import UpcomingIPOsSliderItem from "../components/landing/UpcomingIPOsSliderItem"
import PageRow from '../components/generic/PageRow'
import { inject, observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faColumns, faTh, faThList } from '@fortawesome/free-solid-svg-icons'
import HeaderInfo from '../components/research/HeaderInfo'

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
        const { topMovies, movies } = this.props

        return (
            <TickerStripLayout movies={movies} darkNav={true}>
                <header className="container-center">
                    <HeaderInfo />
                </header>
                <style jsx>{`
                    .container-center {
                        display: flex;
                        justify-content: center;
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

