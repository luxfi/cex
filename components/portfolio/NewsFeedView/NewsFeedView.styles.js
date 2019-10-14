const miniReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({

  itemOuter: {
    padding: theme.spacing(2),
    height: "375px",
    color: theme.palette.text.primary,
    flex: "1 1 33%",

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  itemTitle: {
    ...miniReset,
    fontSize: "1.2rem",
    fontWeight: 600,
    margin: theme.spacing(0, 2)
  },

  sectionTitle: {
    ...miniReset,
    fontSize: "1.5rem",
    fontWeight: 600,
    margin: theme.spacing(0, 1)
  },

  outerMost: {
    display: "flex",
    flexDirection: "column",
  },

  rowOuter: {
    flex: "0 0 100%",

    display: "flex",
    flexDirection: "row",
  },


  itemTitle: {
    ...miniReset,
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: theme.spacing(0.5, 0)
  },

})
