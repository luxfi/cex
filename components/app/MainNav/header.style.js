export default (theme) => {

  return {

    appBar: {
      boxShadow: "none",
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.down("xs")]: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
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

    mobileLogo : {
      height: "26px",
      display: "block"
    },

    mobile: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center"
    }
  }
}

