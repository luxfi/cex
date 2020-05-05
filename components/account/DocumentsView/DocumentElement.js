import React from 'react'

import {
  Button,
  Grid,
  Typography,
  Divider,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core'
import GetAppIcon from '@material-ui/icons/GetApp';

import styles from '../account.style'

const useStyles = makeStyles(styles)

export default (props) => {
  const classes = useStyles()
  const { 
    documents,
    message,
    title,
    type,
  } = props

  const CustomDownload = React.forwardRef(
    ({ className, href, hrefAs, children }, ref) => (
      <a ref={ref} href={href} as={hrefAs} className={className} target='_blank' download>{children}</a>
    )
  )

  if (!documents && !documents.length) {
    return (
      <Typography variant='body2'>{message}</Typography>
    )
  }

  const showDivider= (i) => i < documents.length - 1

  return (
    <Card elevation={2} className={classes.cardContainer}>
      <CardContent>
        <Typography variant="h4" gutterBottom>{title}</Typography>
        {
          documents.map((document, i) => (
            <Grid container direction='column' key={`statement_${i}`}>
              <Grid container item>
                <Grid item xs={6} sm={9}>
                  <Typography variant='body2'>{document.date} - {type}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button component={CustomDownload} startIcon={<GetAppIcon />} href={document.link} download>Download</Button>
                </Grid>
              </Grid>
              {
                showDivider(i) ?
                <Grid item xs={12}>
                  <Divider className={classes.divider} />
                </Grid> : null
              }
            </Grid>
          ))
        }
      </CardContent>
    </Card>
  )
}
