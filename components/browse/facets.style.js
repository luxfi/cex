export default theme => ({
  facetsOuter: {
    marginLeft: 'auto',
    display: 'flex'
  },
  facetsLabel: {
    marginRight: theme.spacing(3)
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


