/* eslint-disable react/prop-types */
import React, { useState } from "react"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    type: "light"
    // primary: {
    //   main: blue[500],
    // },
    // secondary: {
    //   main: 'rgba(29,226,160,0.7)',
    // },
    // background: {
    //   paper: '#1e2748',
    // },
  },
  typography: {
    fontFamily: "‘BWHaasGroteskTF-55Roman-Web, sans-serif’, sans-serif",
    useNextVariants: true
  },
  overrides: {
    MuiTabs: {
      // root: {
      //   width: "100%"
      // },
      indicator: {
        display: "none"
      }
      // centered: {
      //   alignItems: "center",
      //   justifyContent: "center"
      // }
    },
    MuiTab: {
      root: {
        position: "relative",
        display: "block",
        borderRadius: "30px",
        textAlign: "center",
        transition: "all .5s",
        padding: "0px 0px",
        // these four declarations below force the style to chips
        // minWidth: "0px !important",
        // minHeight: "unset",
        // paddingRight: "12px",
        // paddingLeft: "12px",
        minWidth: "0px !important",
        minHeight: "unset",
        paddingRight: "12px",
        paddingLeft: "12px",
        height: "32px",
        marginRight: "16px",
        // padding: "10px 15px",
        // color: "pink",
        // height: "auto",
        // opacity: "1",
        // margin: "10px 0",
        // width: "100%",
        // float: "none",
        // "& + button": {
        //   margin: "10px 0"
        // },
        "&$selected": {
          "&, &:hover": {
            color: "rgb(29,38,50)",
            backgroundColor: "rgb(201,205,209)"
            // boxShadow: "0 7px 10px -5px rgba(76, 175, 80, 0.4)"
          }
        }
      },
      labelContainer: {
        padding: "0!important",
        color: "inherit"
      },
      label: {
        lineHeight: "24px",
        textTransform: "uppercase",
        fontSize: "13px",
        fontWeight: "500",
        position: "relative",
        display: "block",
        color: "inherit",
        paddingLeft: "12px",
        paddingRight: "12px"
      }
    }
  }
})

const PillsTabs = () => {
  const [index, onChange] = useState(0)
  return (
    <MuiThemeProvider theme={theme}>
      <Tabs
        // variant={"fullWidth"}
        value={index}
        onChange={(e, val) => onChange(val)}
      >
        <Tab label="Portfolio" />
        <Tab label="Trade" />
        <Tab label="Benefits" />
        <Tab label="Newsfeed" />
      </Tabs>
    </MuiThemeProvider>
  )
}

export default PillsTabs
