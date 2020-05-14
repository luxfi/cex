import {
  Paper,
  makeStyles,
} from '@material-ui/core'

import FillableSection from './FillableSection'
import APIVersionAndNotifications from './APIVersionAndNotifications'

import { labels } from './apiAccessValues'

import styles from '../account.style'

const useStyles = makeStyles(styles);

export default (props) => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <FillableSection
        noneYetTitle={labels.apiKeys.noneYetTitle}
        noneYetCopy={labels.apiKeys.noneYetCopy}
        classes={classes}
      />
      <FillableSection
        noneYetTitle={labels.oauthApps.noneYetTitle}
        noneYetCopy={labels.oauthApps.noneYetCopy}
        classes={classes}
      />
      <APIVersionAndNotifications classes={classes} />
    </Paper>
  )
}
