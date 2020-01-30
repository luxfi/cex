import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import RootRef from '@material-ui/core/RootRef'
const useStyles = makeStyles(theme => ({
  bullet: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    transform: 'scale(1.5)',
  },
}))

const SummarySection = ({ summaryRef }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <RootRef rootRef={summaryRef}>
      <Box mb={4}>
        <Typography variant="h5">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            Summary
          </Box>
        </Typography>
        <Typography variant="h5">
          <Box mb={2} mt={2} fontWeight="fontWeightBold">
            For the first time ever, invest in the legendary horror franchise.
          </Box>
        </Typography>
        <Typography gutterBottom variant="subtitle1" color="textSecondary">
          <Box mb={3}>
            The Organ Donor is an upcoming American horror film. The film will
            serve as the ninth installment in the Saw franchise. The film is directed
            by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete
            Goldfinger, based on a story by Chris Rock.
          </Box>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <Box mb={3}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.
          </Box>
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          <Box mb={3}>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus, ut aut reiciendis voluptatibus maiores alias consequatur
            aut perferendis doloribus asperiores repellat.
          </Box>
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          <Box mb={2} fontWeight="fontWeightBold">
            {bull} SAW9 Might be the most intense movie since Bambi
          </Box>
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          <Box mb={2} fontWeight="fontWeightBold">
            {bull} "Utterly disgusting" - Gordon Ramsey
          </Box>
        </Typography>
        <Typography variant="subtitle1" color="textPrimary">
          <Box mb={2} fontWeight="fontWeightBold">
            {bull} If you like movies that keep you at the edge of your seat, go
            see this movie!
          </Box>
        </Typography>
      </Box>
    </RootRef>
  )
}

export default SummarySection
