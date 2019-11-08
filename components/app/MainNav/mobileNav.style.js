export default (theme) => {
  return {
    logoImg: {
      height: "26px",
    },
    logoLink: {
      display: "block",
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
    },

    listButton: {
      fontSize: "1rem",
      paddingLeft: theme.spacing(2),
      minWidth: "0",
      whiteSpace: "nowrap"
    },

    listButtonSublist: {
      fontSize: "1rem",
      paddingLeft: theme.spacing(3),
      minWidth: "0",
      whiteSpace: "nowrap"
    },

  }
}
