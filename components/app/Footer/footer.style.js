const hrOpacity = "0.4"
const fadedTextOpacity = "0.6"

export default theme => {
  return {
    root: {
      [theme.breakpoints.up("lg")]: {
        width: "1050px",
        margin: "0 auto",
      },
      [theme.breakpoints.down("md")]: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
      },
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
      },
    },

    logoAreaGridItem: {
      [theme.breakpoints.up("lg")]: {
        paddingRight: theme.spacing(3),
      },
    },
    navGridItem: {
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(2),
      },
    },

    logoImg: {
      display: "block",
      position: "relative",
      top: "-10px",
    },
    byline: {
      marginBottom: theme.spacing(2)
    },

    socialIconRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      [theme.breakpoints.down("md")]: {
        marginBottom: theme.spacing(3),
      },
    },
    socialIcon: {
      display: "block",
      padding: 0,
      marginRight: theme.spacing(2),
      "&:last-child": {
        marginRight: 0
      }
    },

    navOuter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(1),
      }
    },
    navGridContainer: {
      flexDirection: "row",
      justifyContent: "center",
      [theme.breakpoints.down("xs")]: {
        alignItems: "stretch",
      }
    },
    navSectionGridItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginBottom: theme.spacing(3),
    },
    navSectionTitle: {
      fontSize: "1.3rem",
      opacity: fadedTextOpacity
    },
    navSectionHR: {
        margin: 0,
        marginBottom: theme.spacing(3),
        display: "block",
        width: "90%",
        borderWidth: "0 0 1px 0",
        opacity: hrOpacity
    },
    appStoreSectionHR: {
      margin: 0,
      marginBottom: theme.spacing(2),
      display: "block",
      width: "100%",
      borderWidth: "0 0 1px 0",
      opacity: hrOpacity
    },
    appStoreOuter: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    appStoreTitle: {
      fontSize: "0.6rem",
      marginBottom: theme.spacing(0.5)
    },
    appStoreButtonsOuter: {
    },
    appStoreApple: {
      width: "110px",
      paddingRight: theme.spacing(1)
    },

    copyrightOuter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
      opacity: fadedTextOpacity,
      "& p": {
        marginRight: theme.spacing(1)
      },
      marginBottom: theme.spacing(1),
    },

    finePrint: {
      opacity: fadedTextOpacity,
      fontSize: "0.8rem"
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
