import React from 'react'
import {
  Box,
  Typography,
  Divider,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Link,
  Collapse,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

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
    '&:before': {
      opacity: '1 !important',
      display: 'inline !important',
    },
  },
})

const RISKS_DISCLOSURES = [
  {
    heading:
      'Our additional financing requirements could result in dilution to existing equity holders.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading: 'We may face significant competition in our markets.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading:
      'Your ownership in the Company may be diluted upon and following purchase of the Securities.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading:
      'The Company will have broad discretion in the use of the proceeds of this Offering.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading:
      'Purchasers will not be entitled to any inspection or information rights other than those required by Regulation CF.',
    details: [
      'The Organ Donor is an upcoming American horror film. The film will serve as the ninth installment in the Saw franchise. The film is directed by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete Goldfinger, based on a story by Chris Rock.',
    ],
  },
  {
    heading:
      'Purchasers will be unable to declare the Security in "default" and demand repayment.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading:
      'There is no present market for the Securities and we have arbitrarily set the price.',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
]

const RisksDisclosuresSection = () => {
  const classes = useStyles()
  const expansionClasses = useExpansionPanelStyles()
  return (
    <Box mb={4}>
      <Typography variant="h5">
        <Box mb={3} mt={5} fontWeight="fontWeightBold">
          Risks &amp; Disclosures
        </Box>
      </Typography>
      <Divider />
      <div className={classes.root}>
        {RISKS_DISCLOSURES.map(({ heading, value, details }, i) => {
          let limit = 48
          const [open, setOpen] = React.useState(false)

          const handleClick = () => {
            setOpen(!open)
          }

          return (
            <ExpansionPanel key={i} classes={{ root: expansionClasses.root }}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                className={classes.removePadding}
              >
                <div className={classes.container}>
                  <Typography gutterBottom variant="h6">
                    <Box mb={1} mt={1}>
                      {heading}
                    </Box>
                  </Typography>
                </div>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails className={classes.removePadding}>
                <div className={classes.container}>
                  {details.map((str, i, array) => {
                    const last = array.length - 1 === i
                    const currentLimit = limit
                    const body = str
                      .split(' ')
                      .slice(0, limit)
                      .join(' ')
                    const restOfBody = str
                      .split(' ')
                      .slice(limit)
                      .join(' ')
                    const ending = body[body.length - 1] === '.' ? null : '...'
                    limit = limit - str.length
                    if (currentLimit > 0) {
                      return (
                        <Typography
                          key={i}
                          variant="subtitle1"
                          color="textSecondary"
                        >
                          <Box mb={2} mt={2}>
                            {body}
                            {!open && restOfBody && (
                              <span>
                                {ending}{' '}
                                <Link color="secondary" onClick={handleClick}>
                                  Learn More
                                </Link>
                              </span>
                            )}
                            <Collapse in={open} timeout="auto" unmountOnExit>
                              {restOfBody}
                              {open && last && (
                                <Link color="secondary" onClick={handleClick}>
                                  <ExpandLessIcon />
                                </Link>
                              )}
                            </Collapse>
                          </Box>
                        </Typography>
                      )
                    } else {
                      return (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Typography variant="subtitle1" color="textSecondary">
                            <Box mb={2} mt={2}>
                              {str}{' '}
                              {open && last && (
                                <Link color="secondary" onClick={handleClick}>
                                  <ExpandLessIcon />
                                </Link>
                              )}
                            </Box>
                          </Typography>
                        </Collapse>
                      )
                    }
                  })}
                </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </div>
      <Divider />
    </Box>
  )
}

export default RisksDisclosuresSection
