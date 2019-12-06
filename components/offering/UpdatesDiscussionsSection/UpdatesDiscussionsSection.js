import { useState } from 'react'
import classNames from 'classnames'
import { Box, Typography, Divider, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EventNoteIcon from '@material-ui/icons/EventNote'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.secondary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
}))

const Updates = [
  {
    date: 'December 6th 2019',
    heading: 'Investors are bringing the rain!',
    details:
      'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
  },
  {
    date: 'December 5th 2019',
    heading: 'Investors are bringing the rain!',
    details:
      'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
  },
  {
    date: 'December 3th 2019',
    heading: 'Investors are bringing the rain!',
    details:
      'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
  },
]

const NewsSection = () => {
  const classes = useStyles()
  return (
    <Box mb={4}>
      <Typography variant="h4">
        <Box mb={3} mt={5} fontWeight="fontWeightBold">
          Updates &amp; Discussions
        </Box>
      </Typography>
      <Divider />
      {Updates.map(({ title, date, heading, details }, i) => {
        const [hover, setHover] = useState(false)
        const handleMouseOver = () => {
          setHover(true)
        }
        const handleMouseOut = () => {
          setHover(false)
        }
        return (
          <div key={i}>
            <Box display="flex" mb={1} mt={5}>
              <Box flexShrink={1} mr={2.5}>
                <Fab size="medium" color="secondary" aria-label="add">
                  <EventNoteIcon />
                </Fab>
              </Box>
              <Box width="100%">
                <Typography
                  variant="body1"
                  component="span"
                  color="textSecondary"
                >
                  {date}
                </Typography>

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
              </Box>
            </Box>

            <Divider />
          </div>
        )
      })}
    </Box>
  )
}

export default NewsSection
