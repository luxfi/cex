export default theme => {
  return {
    "@global": {
      ul: {
        margin: 0,
        padding: 0
      },
      li: {
        listStyle: "none"
      }
    },

    root: {
      //flexGrow: 1,
      //padding: theme.spacing(4),

      margin: "0 auto",
      
      [theme.breakpoints.down("xs")]: {
        width: "98%",
      },
      [theme.breakpoints.down("sm")]: {
        width: "90%",
      },
      [theme.breakpoints.down("md")]: {
        width: "80%",
      },
      [theme.breakpoints.down("xl")]: {
        width: "100%",
      }
    },

    logoLink: {
//      display: "block",
//      width: "auto",
    },
    logoImg: {
      display: "block",
      position: "relative",
      top: "-10px"
    },


    
    socialIconRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
      }
    },
    socialIcon: {
      display: "block",
      padding: 0,
      paddingRight: theme.spacing(2)
    },

    footerColumnsOuter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingRight: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column-reverse",
        marginBottom: theme.spacing(1),
      }
    },
    footerColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "align-left",
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
      }
    },
    footerColumnInner: {
      display: "flex",
      flexDirection: "column",
      alignItems: "align-left",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        alignItems: "center",
      }
    },
    appArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3)
      }
    },
    appStoreButtons: {

    },
    appleAppStore: {
      width: "100px",
    },
    androidAppStore: {
      width: "120px",
    },


    copyrightOuter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      "& p": {
        marginRight: theme.spacing(1)
      }
    }
  }
}
