import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles } from '@material-ui/core/styles'

const LinearProgressBar = withStyles(theme => ({
  root: {
    height: 6,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
  },
  bar: {
    borderRadius: 20,
    backgroundColor: theme.palette.secondary.main,
  },
}))(LinearProgress)

export default LinearProgressBar
