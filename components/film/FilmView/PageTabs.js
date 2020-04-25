import classNames from 'classnames'
import React from 'react'

const PageTabs = (props) => {
  const {
    classes,
    onTabSelected,
    selectedTab,
  } = props

  return (
    <div className={classes.pageTabsOuter}>
      <a
        className={classNames(
          classes.pageTab,
          selectedTab === 'about' ? classes.selectedTab : '',
        )}
        onClick={() => onTabSelected('about')}
      >
        About
      </a>
      <a
        className={classNames(
          classes.pageTab,
          selectedTab === 'invest' ? classes.selectedTab : '',
        )}
        onClick={() => onTabSelected('invest')}
      >
        Invest
      </a>
    </div>
  )
}

export default PageTabs
