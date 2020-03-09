import React from 'react'
import RootRef from '@material-ui/core/RootRef'
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
import { formatCurrency, isNumber } from '../../../util'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  container: { width: '100%' },
  removePadding: {
    padding: 0,
  },
  collapseRoot: { display: 'inline' },
  collapseWrapper: { display: 'inline' },
  collapseWrapperInner: { display: 'inline' },
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

const DEAL_TERMS = [
  {
    heading: 'Valuation Cap',
    value: 50000000,
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading: 'Minimum Investment',
    value: 50,
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading: 'Maximum Investment',
    value: 100000,
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
  {
    heading: 'Security Type',
    value: 'Preferred Equity',
    details: [
      'Spiral is an upcoming American horror film. The film will serve as the ninth installment in the Saw franchise. The film is directed by Darren Lynn Bousman, from a screenplay by Josh Stolberg and Pete Goldfinger, based on a story by Chris Rock.',
    ],
  },
  {
    heading: 'Deadline to Invest',
    value: 'June 1, 2020',
    details: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam aliquam sem et tortor consequat. Dictum non consectetur a erat nam at lectus urna duis. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Elementum eu facilisis sed odio. Magna fringilla urna porttitor rhoncus dolor purus non. Mollis aliquam ut porttitor leo a diam sollicitudin tempor id. Ultrices sagittis orci a scelerisque purus. Id diam vel quam elementum pulvinar. Rhoncus dolor purus non enim praesent elementum facilisis.',
      'Mollis nunc sed id semper risus in hendrerit gravida. Dictum at tempor commodo ullamcorper a lacus. In arcu cursus euismod quis viverra nibh. Sed sed risus pretium quam. Arcu vitae elementum curabitur vitae nunc sed. Imperdiet nulla malesuada pellentesque elit eget. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Amet porttitor eget dolor morbi non arcu risus quis. Vel pretium lectus quam id leo. Pellentesque pulvinar pellentesque habitant morbi tristique senectus et netus et. Scelerisque felis imperdiet proin fermentum leo vel. Vel turpis nunc eget lorem dolor sed viverra. Lectus proin nibh nisl condimentum. A arcu cursus vitae congue mauris rhoncus aenean vel. Convallis a cras semper auctor. Sem et tortor consequat id porta nibh venenatis cras.',
    ],
  },
]

const DealTermsSection = ({ dealTermsRef }) => {
  const classes = useStyles()
  const expansionClasses = useExpansionPanelStyles()
  return (
    <RootRef rootRef={dealTermsRef}>
      <Box mb={4}>
        <Typography variant="h5">
          <Box mb={3} mt={5} fontWeight="fontWeightBold">
            Deal Terms
          </Box>
        </Typography>
        <Divider />
        <div className={classes.root}>
          {DEAL_TERMS.map(({ heading, value, details }, i) => {
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
                    <Typography gutterBottom variant="h6" color="textSecondary">
                      {heading}
                    </Typography>
                    <Typography gutterBottom variant="h6">
                      <Box mb={1} mt={1} fontWeight="fontWeightBold">
                        {isNumber(value) ? formatCurrency(value, 'USD', false) : value}
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
                      const ending =
                        body[body.length - 1] === '.' ? null : '...'
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
                              <Collapse
                                in={open}
                                timeout="auto"
                                unmountOnExit
                                component="span"
                                classes={{
                                  wrapper: classes.collapseWrapper,
                                  wrapperInner: classes.collapseWrapperInner,
                                }}
                              >
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
                          <Collapse
                            key={i}
                            in={open}
                            timeout="auto"
                            unmountOnExit
                            component="span"
                            classes={{
                              wrapper: classes.collapseWrapper,
                              wrapperInner: classes.collapseWrapperInner,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              color="textSecondary"
                            >
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
    </RootRef>
  )
}

export default DealTermsSection
