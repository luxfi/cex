import { fade } from "@material-ui/core/styles"

export default (theme) => ({
  searchOuter: {
    width: 600,
    height: 63,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: 'transparent',

    [theme.breakpoints.down('lg')]: {
      width: 500,
    },

    [theme.breakpoints.down('md')]: {
      width: 300,
    },

    [theme.breakpoints.down('xs')]: {
      width: 200,
    }
  },
  input: {
    position: 'absolute',
    top: 10,
    right: 10,
    boxSizing: 'border-box',
    width: 0,
    height: 42,
    padding: '0 20px',
    outline: 'none',
    fontSize: 18,
    borderRadius: 63,
    color: 'inherit',
    border: 'none',
    transition: 'all 0.8s ease',
    background: 'initial',
  },
  opened: {
    width: '100%',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    background: 'rgb(255,255,255,0.15)',
  },
  iconButton: {
    position: 'absolute',
    width: 42,
    height: 42,
    borderRadius: '50%',
    right: 10,
    textAlign: 'center',
    lineHeight: 80,
    fontSize: 20,
    color: '#fff',
    border: 'none',
    background: 'initial',
  },
})

