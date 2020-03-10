import { makeStyles } from '@material-ui/core/styles'

const YELLOW = '#FBC43E'

const useStyles = makeStyles(() => ({
  shareButton: {
    background: '#fff',
    '&:hover': {
      background: YELLOW,
    },
  },
}))

export default useStyles
