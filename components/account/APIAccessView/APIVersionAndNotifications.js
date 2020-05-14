import {
  Button,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core'

export default (props) => {
  const { classes } = props
  return (
    <Card elevation={2} className={classes.cardContainer}>
      <CardContent>
        <Typography>
          API version is generally passed as a <code>CB-VERSION</code> header. If the API version is moitted, the version displayed below will be used. Learn more about API versioning.
        </Typography>
        <Typography>
          Notifications allow you to subscrive to updates for your OAuth application or API key. Since notifications are delivered via webhooks, they always 
          correspond to the API version displayed below. Before upgrading your service, ensure that your application is ready to accept the laterst notciation version.
        </Typography>
        <div className={classes.apiApiUpgradeOuter} >
          <strong className={classes.apiUpgradeVersion}>API Version: 2019-03-26</strong>
          <Button className={classes.apiUpgradeLink} variant='outlined' >Upgrade</Button>
        </div>
      </CardContent>
    </Card>
  )
}
