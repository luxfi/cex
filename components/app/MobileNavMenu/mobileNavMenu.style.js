export default (theme) => {
  return {
    logoImg: {
      height: "32px",
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(2)
    },
    logoLink: {
      display: "block",
      padding: theme.spacing(1),
      // paddingLeft: theme.spacing(2),
    },

    listButton: {
      fontSize: "1rem",
      paddingLeft: theme.spacing(2),
      minWidth: "0",
      whiteSpace: "nowrap"
    },
    listButtonLink: {
      color: "inherit", //theme.palette.primary.dark,
      textDecoration: "none"
    },
    listButtonSublist: {
      fontSize: "1rem",
      paddingLeft: theme.spacing(3),
      minWidth: "0",
      whiteSpace: "nowrap"
    },

  }
}
