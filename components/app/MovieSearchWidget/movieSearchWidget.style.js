export default (theme) => ({

  searchOuter: {
    marginRight: theme.spacing(4),

      // This could be in theme eventually 
    '& .MuiSvgIcon-root': {
      width: '1.3rem',
      height: '1.3rem',
    },  

    '& > .react-autosuggest__container': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
    }
  },

  searchWidgetClosed: {
    '& $input': {
      width: 0,
    },
    '& $iconButton': { 
        transition: 'border-radius 0.3s ease 0.8s',
    },

      // Search Icon is centered on spyglass
      // circle, not on arbitrary center of icon
    '& .MuiIconButton-label': {
      display: 'block',
      position: 'relative',
      top: '5px',
      left: '2px'
    }
  },

  searchWidgetOpened: {
    '& $input': {
      padding: '5px',
      paddingLeft: '16px',
      width: '100%',
    },
    '& $iconButton': { 
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
    }
  },


  input: {
    boxSizing: 'border-box',
    display: 'inline-block',
    width: 0,
    height: 42,
    padding: 0,

    outline: 'none',
    fontSize: '18px', // TODO
    borderTopLeftRadius: 42 * 0.5,
    borderBottomLeftRadius: 42 * 0.5,
    color: 'inherit',
    border: 'none',
    background: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.90)',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.60)'
    },

    transition: 'width 0.8s ease, padding 0.8s ease', 
  },
  
  iconButton: {
    display: 'block',
    padding: 0, // better icon centering!
    width: 42,
    height: 42,
    borderRadius: '50%',
    textAlign: 'center',
    border: 'none',
    background: 'transparent',
  },
})

