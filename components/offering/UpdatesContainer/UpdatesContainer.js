import { useState } from 'react'
import classNames from 'classnames'
import { Box, Typography, Divider, Fab } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EventNoteIcon from '@material-ui/icons/EventNote'

const useStyles = makeStyles(theme => ({
  hover: {
    color: theme.palette.primary.main,
  },
  pointer: {
    cursor: 'pointer',
  },
}))

const UpdatesContainer = ({ updates }) => {
  const classes = useStyles()
  return (
    <>
      {updates.map(({ title, date, heading, details }, i) => {
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
                <Fab size="medium" color="primary" aria-label="add">
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
    </>
  )
}

export default UpdatesContainer
