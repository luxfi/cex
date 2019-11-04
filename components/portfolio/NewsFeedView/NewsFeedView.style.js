const miniReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({

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

  itemTitle: {
    ...miniReset,
    fontSize: "1.1rem",
    fontWeight: 600,
    margin: theme.spacing(0.5, 0)
  },

})
