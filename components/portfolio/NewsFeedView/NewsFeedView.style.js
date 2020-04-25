const miniReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({
  newsCard: {
    height: 'auto',
  },
  image: {
    height: 225,
    width: '100%',
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
    margin: theme.spacing(0.5, 0),
    minHeight: 75,
  },

  itemCopy: {
    overflow: 'hidden',
    display: '-webkit-box',
    textOverflow: 'ellipsis',
    WebkitLineClamp: 3,
    WebkitBoxOrient: 'vertical'
  },

  itemCategories: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  },

  link: {
    color: 'white',
    paddingRight: '.5em'
  },

  chipLink: {
    textDecoration: 'none'
  }

})
