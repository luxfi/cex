import React from 'react'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { Tabs, Tab, Grid, Box, Typography } from '@material-ui/core'
import { tabsStylesHook, navStylesHook } from './offeringNavBar.style.js'
import classNames from 'classnames'

const OfferingNavBar = () => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const tabsStyles = tabsStylesHook.useTabs()
  const tabItemStyles = tabsStylesHook.useTabItem()
  const navStyles = navStylesHook.useNav()
  const trigger = useScrollTrigger()
  return (
    <div className={classNames(navStyles.container, navStyles.sticky)}>
      <div className={classNames(navStyles.root)}>
        <Grid container justify="center" className={navStyles.navBar}>
          <Grid item container lg={7} justify="center">
            <Tabs
              classes={tabsStyles}
              variant="fullWidth"
              value={tabIndex}
              onChange={(e, index) => setTabIndex(index)}
            >
              <Tab classes={tabItemStyles} label={'Summary'} />
              <Tab classes={tabItemStyles} label={'Deal Terms'} />
              <Tab classes={tabItemStyles} label={'Documents'} />
              <Tab classes={tabItemStyles} label={'Team'} />
              <Tab classes={tabItemStyles} label={'News'} />
              <Tab classes={tabItemStyles} label={'Risks & Disclosures'} />
              <Tab classes={tabItemStyles} label={'Updates & Discussion'} />
            </Tabs>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default OfferingNavBar
