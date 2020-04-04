import { makeStyles } from '@material-ui/core'

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

export default (props) => {

  const s = myStyles()
  return (
    <div className={s.root} />
  )
}
