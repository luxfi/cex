import React from 'react'
import { Box, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles(theme => ({
  bullet: {
    display: 'inline-block',
    marginRight: theme.spacing(1),
    transform: 'scale(1.5)',
  },
}))

const SummarySection = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Box mb={4}>
      <Typography variant="h5">
        <Box mb={2} mt={4} fontWeight="fontWeightBold">
          Summary
        </Box>
      </Typography>
      <Typography variant="h5">
        <Box mb={2} mt={2} fontWeight="fontWeightBold">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
        </Box>
      </Typography>
      <Typography gutterBottom variant="subtitle1" color="textSecondary">
        <Box mb={3}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga.
        </Box>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        <Box mb={3}>
          Et harum quidem rerum facilis est et expedita distinctio. Nam libero
          tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
          minus id quod maxime placeat facere possimus, omnis voluptas assumenda
          est, omnis dolor repellendus.
        </Box>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        <Box mb={3}>
          Temporibus autem quibusdam et aut officiis debitis aut rerum
          necessitatibus saepe eveniet ut et voluptates repudiandae sint et
          molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
          delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut
          perferendis doloribus asperiores repellat.
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
  )
}

export default SummarySection
