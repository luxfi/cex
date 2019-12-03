import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    position: 'relative',
    marginRight: '-2px',
    marginLeft: '-2px',
  },
  prevButton: {
    left: 0,
    '& > *': { transform: 'translateX(-50%)' },
  },
  nextButton: {
    right: 0,
    '& > *': { transform: 'translateX(50%)' },
  },
  sliderButton: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 4,
  },
  sliderWrapper: {
    overflow: 'hidden',
  },
  list: {
    whiteSpace: 'nowrap',
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  fab: {
    backgroundColor: '#fff',
  },
}))

export default useStyles
