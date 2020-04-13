import { 
  Box, 
  Collapse, 
  fade, 
  makeStyles, 
  Typography, 
  RootRef 
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'

import { UpdatesContainer, DiscussionsContainer } from '../'

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
    padding: `${theme.spacing(0)} ${theme.spacing(3)}`,
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
    date: 'February 14, 2020',
    heading: 'Only two weeks left to invest!',
    details:
      'Thanks to our amazing community for supporting us, we love you back fam. We would especially like to thank our fans in Detroit for their incredible support. The SAW franchise is powered by millions of horror hungry fans ...',
  },
  {
    date: 'January 1, 2020',
    heading: 'Fundraising is now open for everyone',
    details:
      'We are now accepting investors for our crowdsale of SAW 9. Don\'t miss out on this exciting opportunity to be part of SAW history! Join us on our journey to ...',
  },
  {
    date: 'December 6th 2019',
    heading: 'Prospectus approved by SEC',
    details:
      'The SEC has now approved our prospectus, and invesment will soon open. Sign up to stay in the loop about everything SAW. Don\'t miss out on this legendary ...',
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

export default ({ updatesDiscussionsRef }) => {
  const [view, toggleView] = React.useState('updates')

  const handleChange = (event, newToggle) => {
    if (newToggle) toggleView(newToggle)
  }
  const classes = useStyles()
  return (
    <RootRef rootRef={updatesDiscussionsRef}>
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
    </RootRef>
  )
}
