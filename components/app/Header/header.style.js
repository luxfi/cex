export default (theme) => {

  return {

    appBar: {
      color: "inherit",
      boxShadow: "none",
      paddingLeft: theme.spacing(4),  // 32px
      paddingRight: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
      },
      [theme.breakpoints.up("lg")]: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
      },
    },

    transparent: {
      background: "transparent !important",
      transition: "background 0.5s ease-in-out"
    },

    translucent: {
      background: "rgba(17, 17, 17, 0.7)",
      transition: "background 0.5s ease-in-out"
    },

    toolbar: {
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "space-between"
    },

    mobileLogo : {
      height: "26px",
      display: "block",
    },

    mobile: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  }
}

