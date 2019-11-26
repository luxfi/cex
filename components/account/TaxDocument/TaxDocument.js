import React from 'react'

import {
  Button,
  Grid,
  Typography,
  Divider
} from '@material-ui/core'

export default props => {
  const { 
    date,
    type,
    link,
    showDivider
  } = props

  const icon = (
    <i className="material-icons" style={{ fontSize: '20px' }}>
      get_app
    </i>
  )

  const CustomDownload = React.forwardRef(
    ({ className, href, hrefAs, children }, ref) => (
      <a ref={ref} href={href} as={hrefAs} className={className} target='_blank' download>{children}</a>
    )
  )

  console.log(link)

  return (
    <Grid container direction='column'>
      <Grid container item>
        <Grid item xs={8}>
          <Typography variant='body2'>{date} - {type}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button component={CustomDownload} startIcon={icon} href={link} download>Download</Button>
        </Grid>
      </Grid>
      {
        showDivider ?
        <Grid item xs={12}>
          <Divider style={{ marginBottom: '15px' }} />
        </Grid> : null
      }
    </Grid>
  )
}
