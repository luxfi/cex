import React from "react"
// nodejs library that concatenates classes
import classNames from "classnames"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"

// core components
import Button from "../../components/CustomButtons/Button.js"
import ContentLoader from "react-content-loader"
import Modal from "../../components/Modal.js"

// import styles from "../../../assets/jss/views/landingPageSections/investorTopPicksStyle.js"
import styles from "../../assets/jss/views/portfolioPageSections/proTraderCTAStyle.js"

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
      <Modal handleClose={handleClose} open={open} title="What is ESX?">
        <p>ESX is a film investing platform for everyone.</p>{" "}
        <p>
          We allow regular people — not just wealthy film producers — to invest
          in promising films, with as little as $10 or as much as $100,000 per
          investment.
        </p>{" "}
        <p>
          ESX was created to democratize fundraising for film while giving
          anyone the chance to back the next greatest film.
        </p>
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
        color="outlined"
        style={{
          color: "black",
          marginLeft: "20px"
        }}
        onClick={handleOpen}
      >
        Join Now
      </Button>
      <Modal handleClose={handleClose} open={open} title="What is ESX?">
        <p>ESX is a film investing platform for everyone.</p>{" "}
        <p>
          We allow regular people — not just wealthy film producers — to invest
          in promising films, with as little as $10 or as much as $100,000 per
          investment.
        </p>{" "}
        <p>
          ESX was created to democratize fundraising for film while giving
          anyone the chance to back the next greatest film.
        </p>
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
            Pro Traders make a lot more money and know a lot more things than
            non pro traders.
          </span>
        </div>
        <div style={{ display: "flex", width: "40%" }}>
          <RemindLater />
          <JoinNow />
        </div>
        {/* <Button
          style={{
            marginLeft: "20px"
          }}
        >
          Remind Later
        </Button>
        <Button
          color="outlined"
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "black",
            marginLeft: "20px"
          }}
        >
          Join Now
        </Button> */}
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
