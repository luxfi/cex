import React from "react"
import Link from "next/link"
import { inject, observer } from "mobx-react"
import { withRouter } from "next/router"

// @material-ui/core components
import { withStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"

// core components
import Breadcrumbs from "../../components/Breadcrumbs.js"
import Button from "../../components/CustomButtons/Button"
import ContentLoader from "react-content-loader"
import ImageAvatars from "../../components/ImageAvatars"

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../../assets/jss/views/articlePage.js"

// Sections for this page
import InvestNowSection from "../../views/LandingPage/Sections/InvestNowSection"

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

const ButtonLink = React.forwardRef(
  ({ className, href, hrefAs, children, prefetch }, ref) => (
    <Link ref={ref} href={href} as={hrefAs} prefetch>
      <a className={className}>{children}</a>
    </Link>
  )
)

@inject("store")
@observer
class Index extends React.Component {
  // static async getInitialProps({ mobxStore }) {
  //   await mobxStore.movieStore.fetch()
  //   return {
  //     store: mobxStore
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
    const { classes, store } = this.props
    const { loggedIn } = store.userStore
    const hrefLink = loggedIn ? "/portfolio" : "/signup"

    // get router slug and find article
    const { router } = this.props
    const { slug } =
      router.query || "edward-furlong-edward-furlong-terminator-dark-fate" // remove this when safe
    const article = store.articleStore.getArticle(slug)

    return (
      <>
        <div className={classes.container}>
          <Breadcrumbs />
          <article>
            <div className={classes.flex}>
              <h1 className={classes.title} style={{ textAlign: "left" }}>
                {article.articleTitle}
              </h1>
              <div className={classes.grow} />
              <Button
                component={ButtonLink}
                color="outlined"
                href={hrefLink}
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
            <p className={classes.description}>{article.description}</p>
            <div className={classes.mainImage}>
              <img src={article.heroImage} alt={article.articleTitle} />
              {/* <MyLoader /> */}
            </div>
            <ArtcleSections classes={classes} />
            <div style={{ height: "70px" }}></div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "70px"
              }}
            >
              <span style={{ width: "30px" }}>
                <ImageAvatars alt={article.author} src={article.avatar} />
                {/* <AvatarLoader /> */}
              </span>
              <span
                style={{
                  marginLeft: "12px",
                  fontWeight: "bold"
                }}
              >
                {article.author}
              </span>
            </div>
          </article>
          <InvestNowSection loggedIn={loggedIn} />
          <div
            style={{
              height: "70px"
            }}
          ></div>
        </div>
      </>
    )
  }
}

const ArtcleSections = ({ classes }) => {
  return (
    <>
      <section className={classes.articleSection}>
        <h2>What people are saying</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed at felis
          convallis, posuere lorem vitae, efficitur neque. Integer auctor odio
          convallis lacus maximus, quis dictum dolor venenatis. Aliquam erat
          volutpat. Sed non ipsum vel lorem dignissim volutpat eget id neque.
          Maecenas sollicitudin ante felis. Ut tincidunt mollis risus, ut tempor
          mi tempus vel. Donec sit amet tellus sit amet nulla volutpat imperdiet
          non ac magna. Donec tincidunt nisl non sapien venenatis, sit amet
          scelerisque purus tincidunt. Aenean orci quam, malesuada vitae tellus
          vitae, tristique pellentesque turpis. Cras eget lectus hendrerit,
          dignissim risus non, finibus arcu. Nullam blandit turpis sed nisi
          suscipit, eget condimentum ante blandit. Integer aliquam metus non
          quam placerat, et interdum elit aliquet.{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed at felis
          convallis, posuere lorem vitae, efficitur neque. Integer auctor odio
          convallis lacus maximus, quis dictum dolor venenatis. Aliquam erat
          volutpat. Sed non ipsum vel lorem dignissim volutpat eget id neque.
          Maecenas sollicitudin ante felis. Ut tincidunt mollis risus, ut tempor
          mi tempus vel. Donec sit amet tellus sit amet nulla volutpat imperdiet
          non ac magna. Donec tincidunt nisl non sapien venenatis, sit amet
          scelerisque purus tincidunt. Aenean orci quam, malesuada vitae tellus
          vitae, tristique pellentesque turpis. Cras eget lectus hendrerit,
          dignissim risus non, finibus arcu. Nullam blandit turpis sed nisi
          suscipit, eget condimentum ante blandit. Integer aliquam metus non
          quam placerat, et interdum elit aliquet.{" "}
        </p>
      </section>
      <section className={classes.articleSection}>
        <div className={classes.secondImage}>
          <SecondImageLoader />
        </div>
        <h2 className={classes.sectionTitle}>Words To Live By</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed at felis
          convallis, posuere lorem vitae, efficitur neque. Integer auctor odio
          convallis lacus maximus, quis dictum dolor venenatis. Aliquam erat
          volutpat. Sed non ipsum vel lorem dignissim volutpat eget id neque.
          Maecenas sollicitudin ante felis. Sed at felis convallis, posuere
          lorem vitae, efficitur neque. Integer auctor odio convallis lacus
          maximus, quis dictum dolor venenatis. Aliquam erat volutpat.{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed non ipsum vel
          lorem dignissim volutpat eget id neque. Maecenas sollicitudin ante
          felis. Ut tincidunt mollis risus, ut tempor mi tempus vel. Donec sit
          amet tellus sit amet nulla volutpat imperdiet non ac magna. Donec
          tincidunt nisl non sapien venenatis, sit amet scelerisque purus
          tincidunt. Ut tincidunt mollis risus, ut tempor mi tempus vel. Donec
          sit amet tellus sit amet nulla volutpat imperdiet non ac magna. Donec
          tincidunt nisl non sapien venenatis, sit amet scelerisque purus
          tincidunt. Aenean orci quam, malesuada vitae tellus vitae, tristique
          pellentesque turpis. Cras eget lectus hendrerit, dignissim risus non,
          finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
          condimentum ante blandit. Integer aliquam metus non quam placerat, et
          interdum elit aliquet. Aenean orci quam, malesuada vitae tellus vitae,
          tristique pellentesque turpis. Cras eget lectus hendrerit, dignissim
          risus non, finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
          condimentum ante blandit. Integer aliquam metus non quam placerat, et
          interdum elit aliquet. Integer auctor odio convallis lacus maximus,
          quis dictum dolor venenatis. Aliquam erat volutpat. Sed non ipsum vel
          lorem dignissim volutpat eget id neque.{" "}
        </p>
      </section>
      <section className={classes.articleSection}>
        <div className={classes.thirdImage}>
          <ThirdImageLoader />
        </div>
        <h2 className={classes.sectionTitle}>Things to Know About Wolves</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed at felis
          convallis, posuere lorem vitae, efficitur neque. Maecenas sollicitudin
          ante felis. Ut tincidunt mollis risus, ut tempor mi tempus vel. Donec
          sit amet tellus sit amet nulla volutpat imperdiet non ac magna. Donec
          tincidunt nisl non sapien venenatis, sit amet scelerisque purus
          tincidunt. Aenean orci quam, malesuada vitae tellus vitae, tristique
          pellentesque turpis. Cras eget lectus hendrerit, dignissim risus non,
          finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
          condimentum ante blandit. Integer aliquam metus non quam placerat, et
          interdum elit aliquet. Aenean orci quam, malesuada vitae tellus vitae,
          tristique pellentesque turpis. Cras eget lectus hendrerit, dignissim
          risus non, finibus arcu. Nullam blandit turpis sed nisi suscipit, eget
          condimentum ante blandit. Integer aliquam metus non quam placerat, et
          interdum elit aliquet. Integer auctor odio convallis lacus maximus,
          quis dictum dolor venenatis.{" "}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et
          felis nulla. Suspendisse consectetur, dui in molestie molestie, leo
          lacus tempor mi, in pretium sem arcu non tellus. Sed at felis
          convallis, posuere lorem vitae, efficitur neque. Aliquam erat
          volutpat. Sed non ipsum vel lorem dignissim volutpat eget id neque.
          Maecenas sollicitudin ante felis. Ut tincidunt mollis risus, ut tempor
          mi tempus vel. Donec sit amet tellus sit amet nulla volutpat imperdiet
          non ac magna. Donec tincidunt nisl non sapien venenatis, sit amet
          scelerisque purus tincidunt.{" "}
        </p>
      </section>
    </>
  )
}

export default withRouter(withStyles(styles)(Index))
