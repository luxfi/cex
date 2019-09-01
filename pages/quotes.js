import Link from 'next/link'
import React from 'react'
import TickerStripLayout from "../components/generic/TickerStripLayout"
import PageRow from '../components/generic/PageRow'
import { inject, observer } from 'mobx-react'

@inject('movieStore')
@observer
export default class Quotes extends React.Component {
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch();
    return {
      movies: mobxStore.movieStore.movies,
    };
  }

  render() {
    const { movies } = this.props;
    return (
      <TickerStripLayout movies={movies} darkNav={true}>
        <p>This is the quotes page</p>
        <Link href="/">
          <a>index</a>
        </Link>
      </TickerStripLayout>
    );
  }
}