import {
  Card,
  CardContent,
  Icon,
  Typography,
} from '@material-ui/core'
  
const FillableSection = (props) => {
  const {
    classes,
    noneYetTitle,
    noneYetCopy,
  } = props

  return (
    <Card elevation={2} className={classes.cardContainer}>
      <CardContent>
        <Icon className={classes.apiSectionListInfoIcon} color='primary'>info_circle</Icon>
        <div className={classes.apiSectionListNoneOuter} >
          <Typography>{noneYetTitle}</Typography>
          <Typography>{noneYetCopy}</Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default FillableSection
