import Layout from './Layout'
import TickerStrip from './TickerStrip'

@inject('movieStore')
@observer
export default class TickerStripLayout extends React.Component {
  static async getInitialProps({ mobxStore }) {
    await mobxStore.movieStore.fetch();
    return {
      movies: mobxStore.movieStore.movies,
    };
  }

  render() {
    const TickerStripLayout = ({ movies, children }) => (
      <div>
        <TickerStrip movies={movies} />
        <Layout>{children}</Layout>
      </div>
    );
  }
}
