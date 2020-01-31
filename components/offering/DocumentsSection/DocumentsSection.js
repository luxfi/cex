import React from 'react'
import {
  Box,
  Divider,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
  RootRef,
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
  'Form S1',
  'Subscription Agreement',
  'Investor Deck',
  'Financial Analysis & Comparables',
  'ESX Diligence Report',
]

const DocumentsSection = ({ documentsRef }) => {
  const classes = useStyles()
  const bull = <span className={classes.bullet}>•</span>

  return (
    <RootRef rootRef={documentsRef}>
      <Box mb={4}>
        <Typography variant="h5">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            Documents
          </Box>
        </Typography>
        <Divider />
        {documents.map((doc, i) => (
          <ListItem
            key={i}
            component="a"
            disableGutters
            className={classes.listItem}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <DescriptionOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={doc} />
          </ListItem>
        ))}
      </Box>
    </RootRef>
  )
}

export default DocumentsSection
