import { useState } from 'react'
import classNames from 'classnames'
import { Box, Typography, Divider, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.secondary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
}))

const DiscussionContainer = ({ discussions }) => {
  const classes = useStyles()
  //  date: 'December 6th 2019',
  // userName: 'Lawrence Doyle',
  // avatarSrc: 'https://i.pravatar.cc/300',
  // details:
  //   'How many free autoresponders have you tried? Really how many? And how many emails did you get through using them? How do you know? How many people opened your followup message? My point here is that if you have no clue for the answers above you probably are not operating a followup campaign successfully.',
  // like: true,
  return (
    <>
      {discussions.map(({ userName, date, avatarSrc, details, like }, i) => {
        return (
          <div key={i}>
            <Box display="flex" mb={1} mt={5}>
              <Box flexShrink={1} mr={2.5}>
                <Avatar alt={userName} src={avatarSrc} />
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
    </>
  )
}

export default DiscussionContainer
