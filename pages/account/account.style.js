export default (theme) => ({
  header: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
      // To match left edge of selected tab      
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tabs: {

  },
  tabsIndicator: {
    display: 'none'
  },
  tab: {
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  tabText: {
    textAlign: 'left',
  },
  tabSelected: {
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,

    '&:hover': {
      textDecoration: 'none',
      cursor: 'default'
    }
  }
}) 
