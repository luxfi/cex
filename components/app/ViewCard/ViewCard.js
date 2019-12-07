import {
  Typography,
  Paper,
  makeStyles,
} from '@material-ui/core'

const styles = (theme) => ({
  sectionOuter: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  sectionTitleOuter: {
    marginBottom: theme.spacing(2),
    borderBottom: '1px solid #555',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

export default (props) => {
  const { title, controlUI, children } = props
  let { classes } = props

  if (!classes) {
    classes = makeStyles(styles)()
  }

  const control = (!controlUI) ? null :
    <div className={classes.sectionControlUI}>
      {controlUI}
    </div>

  return (
    <Paper className={classes.sectionOuter}>
      <div className={classes.sectionTitleOuter} >
        <Typography variant='h5' color='textPrimary' className={classes.sectionTitle}>{title}</Typography>
        {control}
      </div>
      <div className={classes.sectionBody}>
        {children}
      </div>
    </Paper>
  )
}
