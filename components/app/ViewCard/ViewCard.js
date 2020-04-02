import {
  Paper,
  makeStyles,
} from '@material-ui/core'

const styles = (theme) => ({
  sectionOuter: {
    width: '100%',
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
  const { children } = props
  let { classes } = props

  if (!classes) {
    classes = makeStyles(styles)()
  }

  return (
    <Paper className={classes.sectionOuter}>
      <div className={classes.sectionBody}>
        {children}
      </div>
    </Paper>
  )
}
