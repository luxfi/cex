export default (theme) => ({

  shareList: {
    display: 'flex',
    flexDirection: 'column' 
  },

  verticalList: {
    flexDirection: 'column' 
  },

  horizantalList: {
    flexDirection: 'row' 
  },

  shareListItem: {
    paddingLeft: 0,

    '&:last-child': {
      paddingRight: 0
    }
  },

  shareIcon: {
    display: 'block'
  },

  horizantalButtonLayout: {
    display: 'flex',
    flexDirection: 'row',
    '& $shareLabel': {
      marginLeft: theme.spacing(1)
    }
  },

  verticalButtonLayout: {
    display: 'flex',
    flexDirection: 'column'
  },

  shareLabel: {
    whiteSpace: 'nowrap'
  },

  hiddenText: {
    display: 'none'
  },


  shareButton: {
    cursor: 'pointer',
    '&:hover $shareIcon': {
      border: '1px solid #555',
      borderRadius: '3px',
      backgroundColor: "#fff",
    },
    '&:hover $shareLabel': {
      textDecoration: 'underline'
    }
  },

  facebookShareButton: {
    '&:hover $shareIcon': {
      color: "#3b5998",
    },
  },

  twitterShareButton: {
    '&:hover $shareIcon': {
      color: "#00acee",
    },
  },

  linkedInShareButton: {
    '&:hover $shareIcon': {
      color: "#0e76a8",
    },
  },

  emailShareButton: {
    '&:hover $shareIcon': {
      color: "#a11",
    },
  },

  clipboardShareOuter: {
    '&:hover $shareIcon': {
      color: "#111",
      border: '1px solid #555',
      borderRadius: '3px',
      backgroundColor: "#fff",

    },
  },

  hiddenTooltip: {
    display: 'none'
  }
})
