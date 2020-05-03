import React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'next/router'

import {
  withStyles,
  Paper, 
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'

import { SidebarLayout } from '../../components/app'

import { 
  ProfileView,
  FundsView
} from '../../components/account'

import { 
  googlePageView, 
  toDashString, 
  loginRequired,
  isNullQuery 
} from '../../util'


//import AccountTabs from '../../settings/accountTabs'

const BASE_ROUTE = '/account'

const styles = (theme) => ({
  header: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    borderLeft: `1px solid ${theme.palette.secondary.main}`,
      // To match left edge of selected tab      
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tabs: {

  },
  tabsIndicator: {
    display: 'none'
  },
  tab: {
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  tabText: {
    textAlign: 'left',
  },
  tabSelected: {
    backgroundColor: theme.palette.background.paper,
    borderLeft: `1px solid ${theme.palette.secondary.main}`,

    '&:hover': {
      textDecoration: 'none',
      cursor: 'default'
    }
  }
}) 

@loginRequired
@withRouter
@withStyles(styles)
@inject('store')
@observer
export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tabIndex: (props.tabIndex || 0)
    }
  }

  componentDidMount() {
    googlePageView()
    const { query } = this.props.router
    if (!isNullQuery(query) && 'tab' in query) {
      this.setState({tabIndex: parseInt(query.tab)})
    }
      // from back or refresh action
    else if (
      window &&
      window.location.search &&
      window.location.search.contains('tab')
    ) {
      const params = new URLSearchParams(window.location.search)
      this.setState({tabIndex: parseInt(params('tab'))})
    }
}


  onTabSelected = (i) => {
    this.setState({tabIndex: i})
    const href = `${BASE_ROUTE}?tab=${i}`
    this.props.router.push(href, href, {shallow: true})
  } 

  Tabs = () => (
    <Tabs 
      value={this.state.tabIndex} 
      onChange={(ignore, i) => {this.onTabSelected(i)}} 
      orientation='vertical'
      classes={{root: this.props.classes.tabs, indicator: this.props.classes.tabsIndicator}} 
    >
    {tabbedViews.map((child, i) => (
      <Tab
        label={child.props.tabTitle}
        disableFocusRipple
        disableRipple
        key={`${toDashString(child.props.tabTitle)}-tab-key-${i}`}
        classes={{root: this.props.classes.tab, wrapper: this.props.classes.tabText, selected: this.props.classes.tabSelected}}
      />
    ))}
    </Tabs>
  ) 

  Header = () => (
    <Paper classes={{root: this.props.classes.header}}>
      <Typography variant='h4'>{`${this.props.store.userStore.getFullName}: ${tabbedViews[this.state.tabIndex].props.tabTitle}`}</Typography>
    </Paper>
  ) 
  
  render() {
    return (
      <SidebarLayout top={this.Header()} left={this.Tabs()} minHeight='60vh'>
        {tabbedViews[this.state.tabIndex]}
      </SidebarLayout>
    )
  }
}

//         {tabbedViews.map((child, i) => ((i === this.state.tabIndex) ? child : null))}


const Third = (props) => (
  <Paper >
  <h1> Third FUNDS</h1>
  </Paper>
)

const tabbedViews = [
  <ProfileView tabTitle='Profile'/>,
  <FundsView tabTitle='Funds' />, 
  <Third tabTitle='third' />
]



/* Keep so we can remove these utility classes later
<PageSections>
<SideMenuSection title={userStore.getFullName}>
  <TabbedNav tabs={AccountTabs} tab='' orientation='vertical' />
</SideMenuSection>
<MainContentSection>
  <InvestorInfoView tabTitle='Profile'/>
</MainContentSection>
</PageSections>
*/