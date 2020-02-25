import { useState } from 'react'
import classNames from 'classnames'
import { Box, Typography, Divider, Grid, RootRef } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Image from '../../app/Image'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.secondary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
}))

const NEWS = [
  {
    publisher: 'NME',
    date: '2 hours ago',
    image: 'https://www.nme.com/wp-content/uploads/2020/01/GettyImages-451473112-1392x884.jpg',
    url: 'https://www.nme.com/news/film/chris-rock-teases-scary-bloody-saw-reboot-2596715',
    heading: 'Chris Rock teases his "really scary and really bloody" Saw reboot',
    details:
      'Asked how his involvement with Saw 9 came about, Rock revealed that it was down to a chance meeting with the franchise\'s production ...',
  },
  {
    publisher: 'MovieWeb',
    date: '2 weeks ago',
    image: 'https://cdn3.movieweb.com/i/article/63Z9ee5ZpXjbWRmNuTzbkNSOz7lf7v/798:75/Saw-9-Chris-Rock-Update.jpg',
    url: 'https://movieweb.com/saw-9-chris-rock-update/',
    heading:
      'Chris Rock Promises Saw 9 Is Not Scary Movie: It\'s Gory with a Sprinkling of Humor',
    details:
      'The Saw Reboot is hitting theaters this year and it\'s quite possibly the most interesting entry in the series since the original ...',
  },
  {
    publisher: 'The Wrap',
    date: '1 month ago',
    image: 'https://www.thewrap.com/wp-content/uploads/2019/05/ChrisRockSaw.jpg',
    url: 'https://www.thewrap.com/chris-rocks-saw-reboot-moves-up-5-months-to-may-2020-release/',
    heading:
      'Chris Rock\'s "Saw" Reboot Moves Up 5 Months',
    details:
      'Chris Rock\'s "Saw" reboot will slash into theaters five months earlier, with Lionsgate ...',
  },
]

const NewsSection = ({ newsRef }) => {
  const classes = useStyles()
  return (
    <RootRef rootRef={newsRef}>
      <Box mb={4}>
        <Typography variant="h4">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            News
          </Box>
        </Typography>
        <Divider />
        {NEWS.map(({ publisher, image, url, date, heading, details }, i) => {
          const [hover, setHover] = useState(false)
          const handleMouseOver = () => {
            setHover(true)
          }
          const handleMouseOut = () => {
            setHover(false)
          }
          return (
            <a key={i} href={url} style={{textDecoration: 'none', color: 'white'}}>
              <Grid container spacing={4} alignItems="center">
                <Grid item sm={8}>
                  <Box mb={1} mt={5}>
                    <Typography variant="h6" component="span">
                      <Box mr={2} fontWeight="fontWeightBold" component="span">
                        {publisher}
                      </Box>
                    </Typography>
                    <Typography
                      variant="body1"
                      component="span"
                      color="textSecondary"
                    >
                      {date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    onMouseOver={() => handleMouseOver()}
                    onMouseOut={() => handleMouseOut()}
                    className={classNames(classes.pointer, {
                      [classes.hover]: hover,
                    })}
                  >
                    <Box mb={1} fontWeight="fontWeightBold">
                      {heading}
                    </Box>
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    component="div"
                  >
                    <Box mb={5}>{details}</Box>
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Box mb={3} mt={3}>
                    <Image
                      className={classNames(classes.pointer)}
                      onMouseOver={() => handleMouseOver()}
                      onMouseOut={() => handleMouseOut()}
                      src={image}
                      disableSpinner
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider />
            </a>
          )
        })}
      </Box>
    </RootRef>
  )
}

export default NewsSection
