export default theme => ({

  facetsOuter: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  facetsLabel: {
    display: 'block',
    marginRight: theme.spacing(3),
  },
  

  facetOuter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: theme.spacing(1),
    borderRadius: '9px',
  },

  facetDropdownButton: {
    backgroundColor: '#222',
    borderRadius: '9px',
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
  
  facetValueMenuItemOuter:{
    paddingLeft: '10px'
  },

  facetValueIcon: {
    fontSize: '0.85rem',
    lineHeight: 'inherit',
    marginRight: '6px',
  },
  facetValueIconInactive: {
      // using visibility: hidden rather than display: none so layout is preserved
    visibility: 'hidden'
  },
  facetValueTitle: {
    fontSize: '0.9rem',
    lineHeight: 'inherit',
      // border color is set when rendered
    borderBottomThickness: '4px',
    borderBottomStyle: 'solid',
    minWidth: theme.spacing(11)
  },

  activeFacetPill: {
    backgroundColor: '#2f2f2f',
    position: 'relative',
    top: '1.5px',
    paddingLeft: '8px',
    paddingRight: '2px',
    paddingBottom: '2px',
    borderRadius: '9px',
    marginRight: theme.spacing(0.6),
    '&:last-child': {
      marginRight: 0
    }
  },
  activeFacetPillInner: {
  },
  activeFacetTitle: {
    fontSize: '0.75rem',
      // border color is set when rendered
    borderBottomThickness: '3px',
    borderBottomStyle: 'solid',
    borderRadius: '2px',
  },
  activeFacetCloseButton: {
    fontSize: '0.75rem',
    padding: '2px',
    marginLeft: '2px',
    opacity: 0.3,
    '&:hover': {
      opacity: 1,
      backgroundColor: '#3f3f3f',
    }
  },
  activeFacetCloseButtonIcon: {
    verticalAlign: 'middle',
    fontSize: 'inherit',
  }
})


