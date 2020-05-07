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
  FundsView,
  APIAccessView,
  AccountActivityView,
  DocumentsView,
  DepositView,
  IdentityView,
  OrdersView,
  SecurityView,
} from '../../components/account'

import { 
  googlePageView, 
  toDashString, 
  loginRequired,
  isNullQuery,
  slugFromPath,
} from '../../util'

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
    const slug = slugFromPath()

    const isValidComponent = (child) => child.props.slugName === slug;
    const tabIndex = tabbedViews.findIndex(isValidComponent)
  
    if (slug && tabIndex !== -1) {
      this.setState({tabIndex})
    } else {
      // redirect to activity tab if slug is invalid
      this.setState({tabIndex: 0})
      const href = `${BASE_ROUTE}/[slug]`
      const asRref = `${BASE_ROUTE}/activity`
      this.props.router.push(href, asRref, {shallow: true})
    }
}


  onTabSelected = (i) => {
    this.setState({tabIndex: i})

    const slug = tabbedViews[i].props.slugName

    const href = `${BASE_ROUTE}/[slug]`
    const asRref = `${BASE_ROUTE}/${slug}`
    this.props.router.push(href, asRref, {shallow: true})
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

// {tabbedViews.map((child, i) => ((i === this.state.tabIndex) ? child : null))}

const tabbedViews = [
  <AccountActivityView tabTitle='Account Activity' slugName='activity' />,
  <ProfileView tabTitle='Profile' slugName='profile'/>,
  <FundsView tabTitle='Funds' slugName='funds'/>, 
  <APIAccessView tabTitle='API Access' slugName='access'/>,
  <DocumentsView tabTitle='Documents' slugName='documents'/>,
  <DepositView tabTitle='Deposit' slugName='deposit'/>,
  <IdentityView tabTitle='Identity' slugName='identity'/>,
  <OrdersView tabTitle='Orders' slugName='orders'/>,
  <SecurityView tabTitle='Security' slugName='security'/>,
]
