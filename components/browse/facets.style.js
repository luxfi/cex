export default theme => ({

  facetsOuter: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    //justifyContent: 'center',
    //alignContent: 'center',
  },
  facetsLabel: {
    display: 'block',
    marginRight: theme.spacing(3)
  },
  

  facetOuter: {
    display: 'flex',
    flexDirection: 'row',
  },

  facetDropdownButton: {
    backgroundColor: '#222',
    marginRight: theme.spacing(2),
    '&:last-child': {
      marginRight: 0
    },
    textTransform: 'capitalize', 
  },
  
  facetButtonText: {
    textTransform: 'capitalize', 
  },
  
  facetValuesMenu: {
    zIndex: 20
  },
  
  facetValueIconInactive: {
      // using visibility: hidden rather than display: none so layout is preserved
    visibility: 'hidden'
  },
})


