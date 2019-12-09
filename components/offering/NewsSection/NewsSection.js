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
    title: 'Market Watch',
    date: '1hr ago',
    heading:
      'Former HBO chief is in advanced talks to sign exclusive production deal with Apple.',
    details:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur...',
  },
  {
    title: 'Saw9',
    date: '3hr ago',
    heading:
      'This movie is going to be so good. It will also be quite bloody and intense but that’s the point, right?',
    details:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur...',
  },
  {
    title: 'Saw9',
    date: '4hr ago',
    heading:
      'This movie is going to be so good. It will also be quite bloody and intense but that’s the point, right?',
    details:
      'Ex ea commodo consequat. Duis aute irure dolor in reprehenderit involuptate velit esse cillum dolore eu fugiat nulla pariatur...',
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
        {NEWS.map(({ title, date, heading, details }, i) => {
          const [hover, setHover] = useState(false)
          const handleMouseOver = () => {
            setHover(true)
          }
          const handleMouseOut = () => {
            setHover(false)
          }
          return (
            <div key={i}>
              <Grid container spacing={4} alignItems="center">
                <Grid item sm={8}>
                  <Box mb={1} mt={5}>
                    <Typography variant="h6" component="span">
                      <Box mr={2} fontWeight="fontWeightBold" component="span">
                        {title}
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
                      src={`https://placekitten.com/260/170`}
                      disableSpinner
                    />
                  </Box>
                </Grid>
              </Grid>
              <Divider />
            </div>
          )
        })}
      </Box>
    </RootRef>
  )
}

export default NewsSection
