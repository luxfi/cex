import { Box, Typography, Divider, Fab } from '@material-ui/core'
import { fade } from '@material-ui/core/styles'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'
import { UpdatesContainer, DiscussionsContainer } from '../'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.secondary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
  viewButtonGroup: {
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

const UPDATES = [
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

const DISCUSSIONS = [
  {
    date: 'December 6th 2019',
    userName: 'Lawrence Doyle',
    avatarSrc: 'https://i.pravatar.cc/300',
    details:
      'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
    like: true,
  },
  {
    date: 'December 6th 2019',
    userName: 'Sir Arthur Conan',
    avatarSrc: 'https://i.pravatar.cc/300',
    details:
      'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
    like: true,
  },
]

const UpdatesDiscussionsSection = () => {
  const [view, toggleView] = React.useState('updates')

  const handleChange = (event, newToggle) => {
    if (newToggle) toggleView(newToggle)
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
            value={view}
            exclusive
            onChange={handleChange}
            className={classes.viewButtonGroup}
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
      <Collapse in={view === 'updates'}>
        <UpdatesContainer updates={UPDATES} />
      </Collapse>
      <Collapse in={view === 'discussions'}>
        <DiscussionsContainer discussions={DISCUSSIONS} />
      </Collapse>
    </Box>
  )
}

export default UpdatesDiscussionsSection
