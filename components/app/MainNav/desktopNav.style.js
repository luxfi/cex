export default (theme) => {
  return {

    logo: {
      display: "inline-block",
      marginLeft: theme.spacing(1),
      marginTop: "-15px",
    },

    menuBarOuter: {
      display: "flex",
      flexWrap: "noWrap",
      justifyContent: "space-between",
      flexDirection: "row"
    },

    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        marginRight: theme.spacing(1),
      },
      minWidth: "0",
      whiteSpace: "nowrap"
    },

    menuSpacer: {
      width: theme.spacing(12)
    },

    accountOuter: {
      display: "flex",
      flexDirection: "row",
      marginLeft: "auto",
      paddingRight: theme.spacing(6),
      [theme.breakpoints.down("sm")] : {
        paddingRight: 0,
      }
    },
  }
}
