import React from 'react'
import {
  Box,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { formatCurrency, isNumber } from '../../../util/generic'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: { width: '100%' },
  removePadding: {
    padding: 0,
  },
}))

const useExpansionPanelStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
})

const DEAL_TERMS = [
  {
    heading: 'Valuation Cap',
    value: 250.92,
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading: 'Type of Security',
    value: 'Maximum',
    details: [
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw franchise. The film is directed by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete Goldfinger, based on a story by Chris Rock.',
    ],
  },
]

const DealTermsSection = () => {
  const classes = useStyles()
  const expansionClasses = useExpansionPanelStyles()
  return (
    <Box mb={4}>
      <Typography variant="h5">
        <Box mb={2} mt={4} fontWeight="fontWeightBold">
          Deal Terms
        </Box>
      </Typography>
      <Divider />
      <div className={classes.root}>
        {DEAL_TERMS.map(({ heading, value, details }, i) => (
          <ExpansionPanel key={i} classes={{ root: expansionClasses.root }}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              className={classes.removePadding}
            >
              <div className={classes.container}>
                <Typography gutterBottom variant="h6" color="textSecondary">
                  {heading}
                </Typography>
                <Typography gutterBottom className={classes.value} variant="h6">
                  <Box mb={1} mt={1} fontWeight="fontWeightBold">
                    {isNumber(value) ? formatCurrency(value) : value}
                  </Box>
                </Typography>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.removePadding}>
              <div className={classes.container}>
                {details.map((p, i) => (
                  <Typography variant="subtitle1" color="textSecondary">
                    <Box mb={2} mt={2}>
                      {p}
                    </Box>
                  </Typography>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
      <Divider />
    </Box>
  )
}

export default DealTermsSection
