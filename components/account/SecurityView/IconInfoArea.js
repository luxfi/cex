import {
  Button,
  Icon,
} from '@material-ui/core'

const IconInfoArea = (props) => {
  const {
    classes,
    iconName,
    children,
    buttonText,
    buttonAction,
  } = props

  return (
    <div className={classes.iconInfoAreaOuter}>
      <Icon className={classes.iconInfoAreaIcon}>{iconName}</Icon>
      <div className={classes.iconInfoAreaMain}>
        {children}
      </div>
      <div className={classes.iconInfoAreaButtonOuter} >
        <Button className={classes.iconInfoAreaButtonOuter} variant="outlined" onClick={buttonAction} >{buttonText}</Button>
      </div>
    </div>
  )
}

export default IconInfoArea
