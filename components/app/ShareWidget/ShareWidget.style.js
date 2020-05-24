import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'inline-block',
  },
  shareButton: {
    background: '#fff',
    '&:hover': {
      background: theme.palette.secondary.main,
    },
  },
}))

export default useStyles
