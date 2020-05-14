const lowerGradientRGBString = '0, 0, 0'

export default (theme) => ({
  card: {
    background: theme.palette.common.black,
    overflow: 'hidden',
    border: '1px solid #424242',
    borderRadius: 4,
    height: 430,
    boxShadow: '0 0 0 transparent',
    textAlign: 'left',
    transform: 'translateY(0)',
    transition: 'all .2s ease-in-out',
    '&:hover $content': {
      transform: 'translateY(-60px)',
    },
    '&:focus $content': {
      transform: 'translateY(-60px)',
    },
    '&:hover $playLink': {
      display: 'block',
    },
    '&:hover $buttonsOuter': {
      display: 'flex',
    },
  },

  figure: {
    position: 'relative',
    height: 250,
    margin: 0,
    border: 'none',
  },
  playLink: {
    color: '#fff',
    display: 'none',

    '& svg': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '50px !important',
      height: 'auto !important',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      '&:hover': {
        width: '60px !important',
      },
    },
  },
  img: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    objectPosition: 'top center',
    transition: 'opacity .2s ease-in-out',
  },
  content: {
    minHeight: 148,
    transform: 'translateY(0)',
    position: 'relative',
    transition: 'all .2s ease-in-out',
    padding: theme.spacing(2),
    background: theme.palette.common.black,
  },
  aTag: {
    color: theme.palette.common.white,
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
  },
  title: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: theme.palette.common.white,
    height: 54,
  },
  description: {
    fontSize: '0.9rem',
    color: theme.palette.common.white,
    maxHeight: '3.6em',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    content: '""',
    position: 'relative',
    lineHeight: '1rem',
    cursor: 'pointer',

    '&:before': {
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      background: `linear-gradient(to top,  rgba(${lowerGradientRGBString}, 0.9) 0%, rgba(${lowerGradientRGBString}, 0.1) 97%, rgba(${lowerGradientRGBString}, 0.1) 100%)`,
    }
  },
  status: {
    fontWeight: 'bold',
    fontSize: '1.0rem',
    color: theme.palette.secondary.main,
    marginBottom: theme.spacing(1),
  },

  label: {
    color: theme.palette.common.white,
  },

  buttonsOuter: {
    width: '90%',
    marginTop: theme.spacing(3),
    display: 'none',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-around',
  },
  hoverButton: {
    padding: 0,
    minWidth: '40px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: '1px solid ' + theme.palette.background.default,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.black,
  },

  textButton: {
    width: 'auto',
    borderRadius: '5px',
    padding: '5px 20px',
    fontWeight: 'bold',
  },
  tooltip: {
    maxWidth: 250,
    fontSize: '0.9rem',
  },
})
