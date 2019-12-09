import { useEffect, useRef } from 'react'
import { Tabs, Tab, Grid, Box, Typography } from '@material-ui/core'
import { tabsStylesHook, navStylesHook } from './offeringNavBar.style.js'
import classNames from 'classnames'

const scrollTo = element => {
  // account for navbar heights on scrollintoview
  const padding = 24
  const navBarHeights = 64 + 56 + padding
  window.scrollTo({
    behavior: 'smooth',
    top: element.offsetTop - navBarHeights,
  })
}

const OfferingNavBar = ({
  summaryRef,
  dealTermsRef,
  documentsRef,
  teamRef,
  newsRef,
  risksDisclosuresRef,
  updatesDiscussionsRef,
}) => {
  const [tabIndex, setTabIndex] = React.useState(0)
  const tabsStyles = tabsStylesHook.useTabs()
  const tabItemStyles = tabsStylesHook.useTabItem()
  const navStyles = navStylesHook.useNav()
  useEffect(() => {
    const handleScroll = () => {}
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
              <Tab
                onClick={() => {
                  scrollTo(summaryRef.current)
                }}
                classes={tabItemStyles}
                label={'Summary'}
              />
              <Tab
                onClick={() => {
                  scrollTo(dealTermsRef.current)
                }}
                classes={tabItemStyles}
                label={'Deal Terms'}
              />
              <Tab
                onClick={() => {
                  scrollTo(documentsRef.current)
                }}
                classes={tabItemStyles}
                label={'Documents'}
              />
              <Tab
                onClick={() => {
                  scrollTo(teamRef.current)
                }}
                classes={tabItemStyles}
                label={'Team'}
              />
              <Tab
                onClick={() => {
                  scrollTo(newsRef.current)
                }}
                classes={tabItemStyles}
                label={'News'}
              />
              <Tab
                onClick={() => {
                  scrollTo(risksDisclosuresRef.current)
                }}
                classes={tabItemStyles}
                label={'Risks & Disclosures'}
              />
              <Tab
                onClick={() => {
                  scrollTo(updatesDiscussionsRef.current)
                }}
                classes={tabItemStyles}
                label={'Updates & Discussion'}
              />
            </Tabs>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default OfferingNavBar
