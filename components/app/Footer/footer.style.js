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

    logoGridItem: {
      order: 0,
      [theme.breakpoints.down("md")]: {
        display: "none"
      },
    },

    navGridItem: {
      order: 2,
      [theme.breakpoints.up("lg")]: {
        order: 1,
      },
      [theme.breakpoints.down("sm")]: {
        order: 3,
      },
    },

    socialAndAppGridItem: {
      order: 2,
    },

    logoImg: {
      display: "block",
      position: "relative",
      top: "-10px",
      [theme.breakpoints.only("md")]: {
        height: "32px !important"
      },

    },

    socialGridItem: {
      order: 1,
      marginBottom: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-end",
        order: 0, // arbitrary, doesn't factor into main ordering
      },
    },

    socialIconRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    socialIcon: {
      display: "block",
      padding: 0,
      paddingRight: theme.spacing(3),
      "&:last-child": {
        paddingRight: 0
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
      [theme.breakpoints.down("md")]: {
        alignItems: "center",
      },
      marginBottom: theme.spacing(2),
    },
    navSectionTitle: {
      fontSize: "1.3rem"
    },
    navSectionHR: {
      display: "none",
      [theme.breakpoints.only("xs")]: {
        margin: 0,
        marginBottom: "4px",
        display: "block",
        width: "17%",
        borderBottom: "none",
        opacity: "0.7"
      }
    },

    appStoreGridItem: {
      order: 3,
      display: "flex",
      flexDirection: "row",
      [theme.breakpoints.down("sm")]: {
        marginBottom: theme.spacing(3),
        order: 2
      },
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-end",
      },
      [theme.breakpoints.down("md")]: {
        justifyContent: "center",
      },
    },
    appStoreOuter: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      [theme.breakpoints.up("lg")]: {
        alignItems: "flex-end",
      },
    },
    appStoreTitle: {
      fontSize: "0.9rem",
      marginBottom: theme.spacing(1)
    },
    appStoreButtonsOuter: {
    },
    appStoreApple: {
      width: "110px",
      paddingRight: theme.spacing(1)
    },

    copyrightGridItem: {
      order: 4,
    },

    copyrightOuter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: theme.spacing(2),
      [theme.breakpoints.up("lg")]: {
        justifyContent: "flex-start",
        marginTop: theme.spacing(1),
      },
      "& p": {
        marginRight: theme.spacing(1)
      },
      marginBottom: theme.spacing(2),
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
