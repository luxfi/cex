import { useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import { 
  Grid, 
  useMediaQuery, 
  Tabs, 
  Tab
} from '@material-ui/core'

import { tabsStylesHook, navStylesHook } from './offeringNavBar.style.js'

export default ({
  summaryRef,
  dealTermsRef,
  documentsRef,
  teamRef,
  newsRef,
  risksDisclosuresRef,
  updatesDiscussionsRef,
}) => {
  const isMobileDevice = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const sectionRefs = [
    { section: 'Summary', ref: summaryRef, index: 0 },
    { section: 'DealTerms', ref: dealTermsRef, index: 1 },
    { section: 'Documents', ref: documentsRef, index: 2 },
    { section: 'Team', ref: teamRef, index: 3 },
    { section: 'News', ref: newsRef, index: 4 },
    { section: 'RisksDisclosures', ref: risksDisclosuresRef, index: 5 },
    { section: 'UpdatesDiscussions', ref: updatesDiscussionsRef, index: 6 },
  ]
  const [tabIndex, setTabIndex] = React.useState(0)
  const [index, setIndex] = React.useState(0)
  const [scrolling, setScrolling] = React.useState(0)
  const tabsStyles = tabsStylesHook.useTabs()
  const tabItemStyles = tabsStylesHook.useTabItem()
  const navStyles = navStylesHook.useNav()
  const handleScroll = () => {
    const { height: headerHeight } = getDimensions(headerRef.current)
    const scrollPosition = window.scrollY + headerHeight
    const selected = sectionRefs.find(({ section, ref }) => {
      const element = ref.current
      if (element) {
        const { offsetBottom, offsetTop } = getDimensions(element)
        return scrollPosition > offsetTop && scrollPosition < offsetBottom
      }
    })
    if (selected && selected.section !== visibleSection) {
      setVisibleSection(selected.section)
      setIndex(selected.index)
    } else if (!selected && visibleSection) {
      setVisibleSection(undefined)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleSection])

  useEffect(() => {
    if (!scrolling) {
      setTabIndex(index)
    } else if (scrolling && index === tabIndex) {
      setScrolling(false)
    }
  }, [index])

  const scrollTo = element => {
    setScrolling(true)
    // account for navbar heights on scrollintoview
    const padding = 24
    const navBarHeights = 64 + 56 + padding
    window.scrollTo({
      behavior: 'smooth',
      top: element.offsetTop - navBarHeights,
    })
    // if user clicks and stops the section for reaching its destination, this will eventually reset the flag
    setTimeout(() => {
      setScrolling(false)
    }, 1000)
  }

  const getDimensions = element => {
    const { height } = element.getBoundingClientRect()
    const offsetTop = element.offsetTop - 100 // navbar heights
    const offsetBottom = offsetTop + height
    return {
      height,
      offsetTop,
      offsetBottom,
    }
  }

  const [visibleSection, setVisibleSection] = useState()
  const headerRef = useRef(null)

  return (
    <div
      className={classNames(
        navStyles.container,
        navStyles.sticky,
        {
          [navStyles.hideNavBar]: isMobileDevice,
        }
      )}
      ref={headerRef}
    >
      <div className={classNames(navStyles.root)}>
        <Grid container justify="center" className={navStyles.navBar}>
          <Grid item container lg={12} justify="center">
            <Tabs
              classes={tabsStyles}
              variant="fullWidth"
              value={tabIndex}
              onChange={(e, index) => {
                setTabIndex(index)
              }}
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
