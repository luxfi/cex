export default (theme) => ({

  contactOuter: {
    width: "600px"
  },

  formItself: {
    display: "flex",
    flexDirection: "column",
  },

  fieldsOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },

  textField: {
    flexGrow: 1,
    "&:first-child": {
      marginRight: theme.spacing(2)
    }
  },

  commentTextField: {
  },

  buttonsOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: theme.spacing(2)
  },
})