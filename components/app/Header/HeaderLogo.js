import React from 'react'

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

/*

        <img src='/static/images/esx/u1.png' alt='ESX' className={classes.logo} height='90px' />

            <img
              src='/static/images/esx/esx-white-logo.png'
              alt='ESX'
              className={classes.mobileLogo}
              height='26px'
            />

*/