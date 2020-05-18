import { makeStyles } from '@material-ui/core'
import classNames from 'classnames'

const LOGO = '/static/images/esx/logo-esx-mixed-color-72x42.png'

const myStyles = makeStyles({
  root: {
    width: '72px',
    height: '42px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${LOGO})`
  }    
})

export default ({className, handleClose}) => {

  const s = myStyles()
  return (
    <div onClick={handleClose} className={classNames(s.root, className)} />
  )
}
