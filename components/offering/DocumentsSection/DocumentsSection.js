import React from 'react'
import {
  Box,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined'
const useStyles = makeStyles(theme => ({
  listItemIcon: {
    color: 'inherit',
    display: 'inline-flex',
    minWidth: 38,
    flexShrink: 0,
  },
  listItem: {
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    '&:hover': {
      color: 'gold',
    },
    cursor: 'pointer',
  },
}))

const documents = [
  'SAW9-Document-111220.pdf',
  'InvestorsProfile.pdf',
  'AnotherDocument-forthismovie.pdf',
  'SAW9-Doc-2884.pdf',
  'Terms&Agreements',
]

const DocumentsSection = () => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <Box mb={4}>
      <Typography variant="h5">
        <Box mb={2} mt={4} fontWeight="fontWeightBold">
          Documents
        </Box>
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        <Box mb={2} mt={2}>
          Temporibus autem quibusdam et aut officiis debitis aut rerum
          necessitatibus saepe eveniet ut et voluptates repudiandae sint et
          molestiae non recusandae.
        </Box>
      </Typography>
      {documents.map((doc, i) => (
        <ListItem component="a" disableGutters className={classes.listItem}>
          <ListItemIcon className={classes.listItemIcon}>
            <DescriptionOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={doc} />
        </ListItem>
      ))}
    </Box>
  )
}

export default DocumentsSection
