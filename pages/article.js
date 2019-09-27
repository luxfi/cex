import React from "react"
// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"

import { inject, observer } from "mobx-react"

// core components
import Breadcrumbs from "../components/Breadcrumbs.js"
import Button from "../components/CustomButtons/Button"
import ContentLoader from "react-content-loader"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/articlePage.js"

// Sections for this page
import InvestNowSection from "../views/LandingPage/Sections/InvestNowSection"

const MyLoader = () => (
  <ContentLoader
    height={800}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="400" height="800" />
  </ContentLoader>
)
const SecondImageLoader = () => (
  <ContentLoader
    height={218}
    width={388}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="388" height="218" />
  </ContentLoader>
)

const ThirdImageLoader = () => (
  <ContentLoader
    height={397}
    width={283}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="283" height="397" />
  </ContentLoader>
)

const AvatarLoader = () => (
  <ContentLoader
    height={70}
    width={60}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <circle cx="30" cy="30" r="30" />
  </ContentLoader>
)

@inject("store")
@observer
class Index extends React.Component {
  // static async getInitialProps({ mobxStore }) {
  //   await mobxStore.movieStore.fetch()
  //   return {
  //     movieStore: mobxStore.movieStore,
  //     orderBook: mobxStore.orderBook
  //   }
  // }

  // componentDidMount() {
  //   console.log("index props componentDidMount", this.props.store.orderBook)
  //   this.props.store.orderBook.initiateDataGenerator()
  // }

  // componentWillUnmount() {
  //   this.props.store.orderBook.terminateDataGenerator()
  // }

  render() {
    // const { movieStore } = this.props.store
    const { classes } = this.props
    return (
      <>
        <div style={{ height: "62px" }}></div>
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <div className={classes.container}>
            <Breadcrumbs />
            <article>
              <div className={classes.flex}>
                <h1 className={classes.title} style={{ textAlign: "left" }}>
                  Filming The Lone Wolf Dies
                </h1>
                <div className={classes.grow} />
                <Button
                  color="outlined"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "black",
                    marginLeft: "20px",
                    height: "48px"
                  }}
                  className={classes.investButton}
                >
                  Invest Now
                </Button>
              </div>
              <p className={classes.description}>
                The lion cannot protect himself from traps, and the fox cannot
                defend himself from wolves. One must therefore be a fox to
                recognize traps, and a lion to frighten wolves.
              </p>
              <div className={classes.mainImage}>
                <MyLoader />
              </div>
              <section className={classes.articleSection}>
                <h2>What people are saying</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed at felis convallis, posuere lorem vitae,
                  efficitur neque. Integer auctor odio convallis lacus maximus,
                  quis dictum dolor venenatis. Aliquam erat volutpat. Sed non
                  ipsum vel lorem dignissim volutpat eget id neque. Maecenas
                  sollicitudin ante felis. Ut tincidunt mollis risus, ut tempor
                  mi tempus vel. Donec sit amet tellus sit amet nulla volutpat
                  imperdiet non ac magna. Donec tincidunt nisl non sapien
                  venenatis, sit amet scelerisque purus tincidunt. Aenean orci
                  quam, malesuada vitae tellus vitae, tristique pellentesque
                  turpis. Cras eget lectus hendrerit, dignissim risus non,
                  finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
                  condimentum ante blandit. Integer aliquam metus non quam
                  placerat, et interdum elit aliquet.{" "}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed at felis convallis, posuere lorem vitae,
                  efficitur neque. Integer auctor odio convallis lacus maximus,
                  quis dictum dolor venenatis. Aliquam erat volutpat. Sed non
                  ipsum vel lorem dignissim volutpat eget id neque. Maecenas
                  sollicitudin ante felis. Ut tincidunt mollis risus, ut tempor
                  mi tempus vel. Donec sit amet tellus sit amet nulla volutpat
                  imperdiet non ac magna. Donec tincidunt nisl non sapien
                  venenatis, sit amet scelerisque purus tincidunt. Aenean orci
                  quam, malesuada vitae tellus vitae, tristique pellentesque
                  turpis. Cras eget lectus hendrerit, dignissim risus non,
                  finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
                  condimentum ante blandit. Integer aliquam metus non quam
                  placerat, et interdum elit aliquet.{" "}
                </p>
              </section>
              <section className={classes.articleSection}>
                <div className={classes.secondImage}>
                  <SecondImageLoader />
                </div>
                <h2 className={classes.sectionTitle}>Words To Live By</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed at felis convallis, posuere lorem vitae,
                  efficitur neque. Integer auctor odio convallis lacus maximus,
                  quis dictum dolor venenatis. Aliquam erat volutpat. Sed non
                  ipsum vel lorem dignissim volutpat eget id neque. Maecenas
                  sollicitudin ante felis. Sed at felis convallis, posuere lorem
                  vitae, efficitur neque. Integer auctor odio convallis lacus
                  maximus, quis dictum dolor venenatis. Aliquam erat volutpat.{" "}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed non ipsum vel lorem dignissim volutpat eget id
                  neque. Maecenas sollicitudin ante felis. Ut tincidunt mollis
                  risus, ut tempor mi tempus vel. Donec sit amet tellus sit amet
                  nulla volutpat imperdiet non ac magna. Donec tincidunt nisl
                  non sapien venenatis, sit amet scelerisque purus tincidunt. Ut
                  tincidunt mollis risus, ut tempor mi tempus vel. Donec sit
                  amet tellus sit amet nulla volutpat imperdiet non ac magna.
                  Donec tincidunt nisl non sapien venenatis, sit amet
                  scelerisque purus tincidunt. Aenean orci quam, malesuada vitae
                  tellus vitae, tristique pellentesque turpis. Cras eget lectus
                  hendrerit, dignissim risus non, finibus arcu. Nullam blandit
                  turpis sed nisi suscipit, eget condimentum ante blandit.
                  Integer aliquam metus non quam placerat, et interdum elit
                  aliquet. Aenean orci quam, malesuada vitae tellus vitae,
                  tristique pellentesque turpis. Cras eget lectus hendrerit,
                  dignissim risus non, finibus arcu. Nullam blandit turpis sed
                  nisi suscipit, eget condimentum ante blandit. Integer aliquam
                  metus non quam placerat, et interdum elit aliquet. Integer
                  auctor odio convallis lacus maximus, quis dictum dolor
                  venenatis. Aliquam erat volutpat. Sed non ipsum vel lorem
                  dignissim volutpat eget id neque.{" "}
                </p>
              </section>
              <section className={classes.articleSection}>
                <div className={classes.thirdImage}>
                  <ThirdImageLoader />
                </div>
                <h2 className={classes.sectionTitle}>
                  Things to Know About Wolves
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed at felis convallis, posuere lorem vitae,
                  efficitur neque. Maecenas sollicitudin ante felis. Ut
                  tincidunt mollis risus, ut tempor mi tempus vel. Donec sit
                  amet tellus sit amet nulla volutpat imperdiet non ac magna.
                  Donec tincidunt nisl non sapien venenatis, sit amet
                  scelerisque purus tincidunt. Aenean orci quam, malesuada vitae
                  tellus vitae, tristique pellentesque turpis. Cras eget lectus
                  hendrerit, dignissim risus non, finibus arcu. Nullam blandit
                  turpis sed nisi suscipit, eget condimentum ante blandit.
                  Integer aliquam metus non quam placerat, et interdum elit
                  aliquet. Aenean orci quam, malesuada vitae tellus vitae,
                  tristique pellentesque turpis. Cras eget lectus hendrerit,
                  dignissim risus non, finibus arcu. Nullam blandit turpis sed
                  nisi suscipit, eget condimentum ante blandit. Integer aliquam
                  metus non quam placerat, et interdum elit aliquet. Integer
                  auctor odio convallis lacus maximus, quis dictum dolor
                  venenatis.{" "}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Integer et felis nulla. Suspendisse consectetur, dui in
                  molestie molestie, leo lacus tempor mi, in pretium sem arcu
                  non tellus. Sed at felis convallis, posuere lorem vitae,
                  efficitur neque. Aliquam erat volutpat. Sed non ipsum vel
                  lorem dignissim volutpat eget id neque. Maecenas sollicitudin
                  ante felis. Ut tincidunt mollis risus, ut tempor mi tempus
                  vel. Donec sit amet tellus sit amet nulla volutpat imperdiet
                  non ac magna. Donec tincidunt nisl non sapien venenatis, sit
                  amet scelerisque purus tincidunt.{" "}
                </p>
              </section>
              <div style={{ height: "70px" }}></div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <span style={{ width: "30px" }}>
                  <AvatarLoader />
                </span>
                <span
                  style={{
                    marginLeft: "12px",
                    fontWeight: "bold",
                    marginBottom: "70px"
                  }}
                >
                  Author's Name
                </span>
              </div>
            </article>
            <InvestNowSection />
            <div
              style={{
                height: "70px"
              }}
            ></div>
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Index)
