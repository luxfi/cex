import { useState } from 'react'
import classNames from 'classnames'
import {
  Box,
  Typography,
  Divider,
  Fab,
  ButtonGroup,
  Button,
} from '@material-ui/core'
import { fade } from '@material-ui/core/styles'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import EventNoteIcon from '@material-ui/icons/EventNote'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.secondary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
  toggleButtonGroup: {
    backgroundColor: 'transparent',
  },
  root: {
    ...theme.typography.subtitle1,
    border: `2px solid ${theme.palette.secondary.main}`,
    fontWeight: 'bold',
    height: 40,
    padding: `${theme.spacing(0)}px ${theme.spacing(3)}px`,
    fontSize: theme.typography.pxToRem(11),
    '&$selected': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main,
        },
      },
    },
    '&:hover': {
      textDecoration: 'none',
      // Reset on mouse devices
      backgroundColor: fade(theme.palette.secondary.main, 0.05),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
  },
  selected: {},
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

const UpdatesDiscussionsSection = () => {
  const [toggle, setToggle] = React.useState('updates')

  const handleChange = (event, newToggle) => {
    if (newToggle) setToggle(newToggle)
  }
  const classes = useStyles()
  return (
    <Box mb={4}>
      <Box display="flex" mb={3} mt={5}>
        <Box width="100%">
          <Typography variant="h4">
            <Box fontWeight="fontWeightBold">Updates &amp; Discussions</Box>
          </Typography>
        </Box>
        <Box flexShrink={1}>
          <ToggleButtonGroup
            value={toggle}
            exclusive
            onChange={handleChange}
            className={classes.toggleButtonGroup}
          >
            <ToggleButton
              classes={{ root: classes.root, selected: classes.selected }}
              key={1}
              value="updates"
            >
              Updates
            </ToggleButton>
            <ToggleButton
              classes={{ root: classes.root, selected: classes.selected }}
              key={2}
              value="discussions"
            >
              Discussions
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
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

export default UpdatesDiscussionsSection
