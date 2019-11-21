export default theme => {
  return {
    root: {
      paddingLeft: theme.spacing(4),  // 32px
      paddingRight: theme.spacing(4),

      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
    },

    logoImg: {
      display: "block",
      position: "relative",
      top: "-10px"
    },
    socialIconRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "left",
      alignItems: "center",
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
    },
    "@global": {
      ul: {
        margin: 0,
        padding: 0
      },
      li: {
        listStyle: "none"
      }
    },
  }
}
