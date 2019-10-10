import React from "react"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

// core components
import ContentLoader from "react-content-loader"
import Modal from "./CustomModal"

// style
import styles from "./portfolioPageProTraderCTAStyle"
const useStyles = makeStyles(styles)

const MyLoader = () => (
  <ContentLoader
    height={217}
    width={400}
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#ecebeb"
  >
    {/* Only SVG shapes */}
    <rect x="0" y="0" rx="5" ry="5" width="388" height="217" />
  </ContentLoader>
)

const RemindLater = ({ classes }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        onClick={handleOpen}
        style={{
          marginLeft: "20px"
        }}
      >
        Remind Later
      </Button>
      <Modal handleClose={handleClose} open={open} title="Remind Later">
        <p>We will set a reminder for you to sign up to a pro trader account</p>{" "}
        <p>
          Research and trade film stocks from our intuitive streaming platform.
        </p>{" "}
      </Modal>
    </>
  )
}

const JoinNow = ({ classes }) => {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Button
        variant="outlined"
        style={{
          color: "black",
          marginLeft: "20px"
        }}
        onClick={handleOpen}
      >
        Join Now
      </Button>
      <Modal handleClose={handleClose} open={open} title="Join Now">
        <p>
          Research and trade film stocks from our intuitive streaming platform.
        </p>{" "}
        <p>
          ESX makes it simple to just buy and sell stocks or take advantage of
          our bloomberg terminal real-time data tracking and charting tools. We
          will cater to every class of investor and trading style with our cloud
          scalable 10,000x transactions per second capable platform.
        </p>{" "}
        <p>
          When money is at stake, you want answers. Get valuable insights from
          professionals who know the markets and share your passion.
        </p>{" "}
      </Modal>
    </>
  )
}

export default props => {
  const classes = useStyles()

  return (
    <>
      <div
        className={classes.section}
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            flexDirection: "column"
          }}
        >
          <h2 className={classes.title}>Become a Pro Trader.</h2>
          <span>
            Level up your trading game - use our pro tools to maximize your profits.
          </span>
        </div>
        <div style={{ display: "flex", width: "40%" }}>
          <RemindLater />
          <JoinNow />
        </div>
      </div>
      <style jsx>{`
        .hero-container {
          position: relative;
          overflow: hidden;
        }
      `}</style>
    </>
  )
}
