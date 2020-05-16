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

import { loginRequired,  slugFromPath } from '../../util'

import styles from './account.style.js'

const BASE_ROUTE = '/account'
const DEFAULT_TAB = 'profile'

@loginRequired
@withRouter
@withStyles(styles)
@inject('store')
@observer
export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tab: (props.tab || DEFAULT_TAB)
    }
  }

  componentDidMount() {
    const slug = slugFromPath()

    if (slug) {
      this.setState({tab: slug})
    } 
    else {
      this.setState({tab: DEFAULT_TAB})
      const href = `${BASE_ROUTE}/[slug]`
      const asRref = `${BASE_ROUTE}/${DEFAULT_TAB}`
      this.props.router.push(href, asRref, {shallow: true})
    }
  }

  onTabSelected = (tab) => {
    this.setState({tab})

    const href = `${BASE_ROUTE}/[slug]`
    const asRref = `${BASE_ROUTE}/${tab}`
    this.props.router.push(href, asRref, {shallow: true})
  } 

  Tabs = () => (
    <Tabs 
      value={this.state.tab} 
      onChange={(ignore, tab) => {this.onTabSelected(tab)}} 
      orientation='vertical'
      classes={{root: this.props.classes.tabs, indicator: this.props.classes.tabsIndicator}} 
    >
    {TAB_VIEWS.map((child, i) => (
      <Tab
        label={child.props.tabTitle}
        value={child.props.tabValue}
        key={`${child.props.tabValue}-tab-key-${i}`}
        classes={{root: this.props.classes.tab, wrapper: this.props.classes.tabText, selected: this.props.classes.tabSelected}}
        disableFocusRipple
        disableRipple
      />
    ))}
    </Tabs>
  ) 

  Header = () => (
    <Paper classes={{root: this.props.classes.header}}>
      <Typography variant='h4'>{`${this.props.store.userStore.getFullName}: ${TAB_VIEWS.find((el) => (el.props.tabValue === this.state.tab)).props.tabTitle}`}</Typography>
    </Paper>
  ) 
  
  render() {
    return (
      <SidebarLayout top={this.Header()} left={this.Tabs()} minHeight='60vh'>
        {TAB_VIEWS.find((el) => (el.props.tabValue === this.state.tab))}
      </SidebarLayout>
    )
  }
}

const TAB_VIEWS = [
  <ProfileView tabTitle='Profile' tabValue='profile'/>,
  <FundsView tabTitle='Funds' tabValue='funds'/>, 
  <DepositView tabTitle='Deposit' tabValue='deposit'/>,
  <OrdersView tabTitle='Orders' tabValue='orders'/>,
  <APIAccessView tabTitle='API Access' tabValue='access'/>,
  <IdentityView tabTitle='Identity' tabValue='identity'/>,
  <AccountActivityView tabTitle='Activity' tabValue='activity' />,
  <DocumentsView tabTitle='Documents' tabValue='documents'/>,
  <SecurityView tabTitle='Security' tabValue='security'/>,
]
