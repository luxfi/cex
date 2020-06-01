const MAIN_TRANSITION = 0.6
const FAST_TRANSITION = 0.2

export default (theme) => ({

  searchOuter: {
    marginRight: theme.spacing(4),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',

      // This could be in theme eventually 
    '& .MuiSvgIcon-root': {
      width: '1.3rem',
      height: '1.3rem',
    },  
  },

  searchWidgetClosed: {
    '& $input': {
      width: 0,
    },
    '& $iconButton': { 
        transition: `border-radius ${FAST_TRANSITION}s ease ${MAIN_TRANSITION}s`,
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
      backgroundColor: 'rgba(255,255,255,0.15)',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.25)',
      }
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
    backgroundColor: 'rgba(255,255,255,0.15)',
    color: 'rgba(255,255,255,0.90)',
    '&::placeholder': {
      color: 'rgba(255,255,255,0.60)'
    },

    transition: `width ${MAIN_TRANSITION}s ease, padding ${MAIN_TRANSITION}s ease`, 
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

