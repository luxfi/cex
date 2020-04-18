import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  withStyles,
  Paper, 
  Tab,
  Tabs,
  Typography
} from '@material-ui/core'

import { SidebarLayout } from '../../components/app'

import { 
  InvestorInfoView,
  FundsView
} from '../../components/account'

import { 
  googlePageView, 
  toDashString, 
  loginRequired 
} from '../../util'

//import AccountTabs from '../../settings/accountTabs'

const styles = (theme) => ({
  header: {
    marginBottom: theme.spacing(2)
  },
  tabs: {
    //marginTop: '2px'
  },
  tabsIndicator: {
    display: 'none'
  },
  tab: {
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  tabSelected: {
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    '&:hover': {
      textDecoration: 'none',
      cursor: 'default'
    }
  }
}) 

@loginRequired
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
  }

  Tabs = () => (
    <Tabs 
      value={this.state.tabIndex} 
      onChange={(ignore, i) => { this.setState({tabIndex: i})}} 
      orientation='vertical'
      classes={{root: this.props.classes.tabs, indicator: this.props.classes.tabsIndicator}} 
    >
    {tabbedViews.map((child, i) => (
      <Tab
        label={child.props.tabTitle}
        disableFocusRipple
        disableRipple
        key={`${toDashString(child.props.tabTitle)}-tab-key-${i}`}
        classes={{root: this.props.classes.tab, selected: this.props.classes.tabSelected}}
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
        {tabbedViews.map((child, i) => ((i === this.state.tabIndex) ? child : null))}
      </SidebarLayout>
    )
  }
}

const Third = (props) => (
  <Paper >
  <h1> Third FUNDS</h1>
  </Paper>
)

const tabbedViews = [
  <InvestorInfoView tabTitle='Profile'/>,
  <FundsView tabTitle='Funds' />, 
  <Third tabTitle='third' />
]



/*
<PageSections>
<SideMenuSection title={userStore.getFullName}>
  <TabbedNav tabs={AccountTabs} tab='' orientation='vertical' />
</SideMenuSection>
<MainContentSection>
  <InvestorInfoView tabTitle='Profile'/>
</MainContentSection>
</PageSections>
*/