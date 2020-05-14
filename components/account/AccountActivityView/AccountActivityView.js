import {
  Card,
  CardContent,
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core'

import ThirdPartyAppsElements from './ThirdPartyAppsElements'
import ActiveSessionElements from './ActiveSessionElements'
import CloseAccountElements from './CloseAccountElements'

import styles from '../account.style'

const useStyles = makeStyles(styles)

export default (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <ThirdPartyAppsElements classes={classes} />
        </CardContent>
      </Card>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <ActiveSessionElements classes={classes} />
        </CardContent>
      </Card>
      <Card elevation={2} className={classes.cardContainer}>
        <CardContent>
          <CloseAccountElements classes={classes} />
        </CardContent>
      </Card>
    </Paper>
  )
}
