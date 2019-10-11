import React from "react"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

// core components
import ContentLoader from "react-content-loader"
import { CustomLink, CustomModal } from ".."

// styles
import styles from "./InvestNow.style.js"
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

export default props => {
  const classes = useStyles()
  const { loggedIn, ...rest } = props
  const imageClasses = classNames(classes.imgCardTop)
  const hrefLink = loggedIn ? "/portfolio" : "/signup"

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <div className={classes.section}>
        <h2 className={classes.title}>
          Invest more than screen time in your favorite films.
        </h2>
        <Button component={CustomLink} href={hrefLink}>
          Invest Now
        </Button>

        <Button
          variant="outlined"
          style={{
            color: "black",
            marginLeft: "20px"
          }}
          onClick={handleOpen}
        >
          What is ESX?
        </Button>
        <CustomModal handleClose={handleClose} open={open} title="What is ESX?">
          <p>ESX is a film investing platform for everyone.</p>{" "}
          <p>
            We allow regular people — not just wealthy film producers — to
            invest in promising films, with as little as $10 or as much as
            $100,000 per investment.
          </p>{" "}
          <p>
            ESX was created to democratize fundraising for film while giving
            anyone the chance to back the next greatest film.
          </p>
        </CustomModal>
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
