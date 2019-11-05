import React from "react"

import NextLink from "next/link"

import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Link,
} from "@material-ui/core"

import {
  AccountCircle,
  ExitToApp,
  Search,
} from "@material-ui/icons"

import { withStyles } from "@material-ui/core/styles"

import { AutoCompleteSearch } from ".."
//import { faCcDiscover } from "@fortawesome/free-brands-svg-icons"

const CustomLink = React.forwardRef(
  ({ className, href, hrefAs, children, }, ref) => (
    <NextLink ref={ref} href={href} as={hrefAs}>
      <a className={className}>{children}</a>
    </NextLink>
  )
)

const navStructure = [
  {
    title: "Discover",
    items: [
      {
        title: "Movies",
        link: "/film" 
      },
      {
        title: "TV Series",
        placeholder: "TV Series"
      },
      {
        title: "Music",
        placeholder: "Music"
      },
      {
        title: "Gaming",
        placeholder: "Gaming"
      }
    ]
  },
  {
    title: "Investors",
    placeholder: "Investors"
  },  
  {
    title: "Communities",
    placeholder: "Communities"
  },  
  {
    title: "Loyalty",
    placeholder: "Loyalty"
  },  

]

const renderMainNav_Temp = (props) => {

  const {classes, openModal} = props

  return (
    <div className={classes.menuBarOuter}>
      <div className={classes.menuSpacer} />
      <Button
        aria-controls="menu"
        aria-haspopup="true"
        onClick={handleClick2}
        color="inherit"
        className={classes.menuButton}
      >
        Discover
        </Button>
      <Menu
        id="menu"
        anchorEl={anchorEl2}
        keepMounted
        open={open2}
        onClose={handleClose2}
        className={classes.menuButton}
        style={{} /*{ marginTop: "50px", transform: "translate(-22px, 0px)" }*/}
      >
        <MenuItem onClick={() => {
          openModal("Movies")
        }}>
          <span style={{ padding: "16px" }}>Movies</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("TV Series")
        }}>
          <span style={{ padding: "16px" }}>TV Series</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("Music")
        }}>
          <span style={{ padding: "16px" }}>Music</span>
        </MenuItem>
        <MenuItem onClick={() => {
          openModal("Gaming")
        }}>
          <span style={{ padding: "16px" }}>Gaming</span>
        </MenuItem>
      </Menu>
      <Button
        onClick={() => {
          openModal("Shop")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Shop
                    </Button>
      <Button
        onClick={() => {
          openModal("Investors")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Investors
                    </Button>
      <Button
        onClick={() => {
          openModal("Communities")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Communities
                    </Button>
      <Button
        onClick={() => {
          openModal("Loyalty")
        }}
        color="inherit"
        className={classes.menuButton}
      >
        Loyalty
        </Button>
    </div>
  )
}

const renderAccountArea = (accountLoaded, logout, classes) => {

  return (<>
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <Search />
      </div>
      <AutoCompleteSearch
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
      />
    </div>
    {accountLoaded ? (
      <>
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <AccountCircle style={{ fontSize: "2rem" }} />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          style={{ marginTop: "50px" }}
        >
          <MenuItem component={CustomLink} href={"/account"}>
            <AccountCircle />
            <span style={{ padding: "15px" }}>Account</span>
          </MenuItem>
          <MenuItem component={CustomLink} href={"/portfolio"}>
            <AccountCircle />
            <span style={{ padding: "15px" }}>Portfolio</span>
          </MenuItem>
          <MenuItem onClick={logout}>
            <ExitToApp />
            <span style={{ padding: "15px" }}>Logout</span>
          </MenuItem>
        </Menu>
      </>
    ) : (
        <>
          <Button
            component={CustomLink}
            href={"/login"}
            color="inherit"
            className={classes.menuButton}
          >
            Login
          </Button>
          <Button
            component={CustomLink}
            color="inherit"
            variant="outlined"
            href={"/signup"}
            className={classes.menuButton}
          >
            Sign Up
          </Button>
        </>
      )}
  </>)
}

function renderMainNav(structure, classes) {

  let result = []

  structure.forEach((item) => {
    result.push(
      <Button color="inherit" className={classes.menuButton}>
        {item.title}
      </Button>
    )
  })
  return result;
}



export default (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [anchorEl2, setAnchorEl2] = React.useState(null)
  const open = Boolean(anchorEl)
  const open2 = Boolean(anchorEl2)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  function handleClick2(event) {
    setAnchorEl2(event.currentTarget)
  }

  function handleClose2() {
    setAnchorEl2(null)
  }


  const {
    showElements,
    classes,
    accountLoaded,
    openModal
  } = props

  if (!showElements) {
    return ""
  }

  return (
    <>
      <Link href="/" component={CustomLink}>
        <img src="/static/images/esx/esx-white-logo.png" alt="ESX" className={classes.logo} height="52px" />
      </Link>
      <div className={classes.menuBarOuter}>
        <div className={classes.menuSpacer} />
        {renderMainNav(navStructure, classes)}
      </div>

      <div className={classes.accountOuter} >
        {renderAccountArea(accountLoaded, logout, classes)}
      </div>
    </>
  )
}
