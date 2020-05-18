import React from 'react'
import classNames from 'classnames'

export default ({
  classes,
  onTabSelected,
  selectedTab,
}) => (
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
