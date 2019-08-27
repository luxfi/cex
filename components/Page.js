import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import TickerStrip from './TickerStrip'
import Hero from './Hero'
import PageRow from './PageRow'
import Slider from './Slider'
import Footer from './Footer'
import Chart from './Chart'
import PartnerGrid from './PartnerGrid'
import SecuredByGrid from './SecuredByGrid'
// import Clock from './Clock'

@inject('store')
@observer
class Page extends React.Component {
  // componentDidMount() {
  //   this.props.store.start()
  // }

  // componentWillUnmount() {
  //   this.props.store.stop()
  // }

  render() {
    // console.log('Page.js', this.props.store)
    return (
      <div style={{ width: `1440px` }}>
        <TickerStrip movieStore={this.props.store} />
        <Hero />
        <PageRow rowTitle={"Trending Now"} hideInnerPadding>
          <Slider movieStore={this.props.store} />
        </PageRow>
        <PageRow rowTitle={"Top Gainers"}>
          <Chart topMovies={this.props.store.topMovies} />
        </PageRow>
        <PageRow rowTitle={"Our Partners"}>
          <PartnerGrid/>
        </PageRow>
        <PageRow rowTitle={"Secured By"}>
          <SecuredByGrid/>
        </PageRow>
        <Footer />
      </div >
    )
  }
}

// @inject('store')
// @observer
// export default Page
// class Page extends React.Component {
//   componentDidMount() {
//     this.props.store.start()
//   }

//   componentWillUnmount() {
//     this.props.store.stop()
//   }

//   render() {
//     return (
//       <div>
//         <h1>{this.props.title}</h1>
//         <Clock
//           lastUpdate={this.props.store.lastUpdate}
//           light={this.props.store.light}
//         />
//         <nav>
//           <Link href={this.props.linkTo}>
//             <a>Navigate</a>
//           </Link>
//         </nav>
//       </div>
//     )
//   }
// }

export default Page
