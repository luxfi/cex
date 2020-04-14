import React from 'react'
import { inject, observer } from 'mobx-react'

import {
  Tab,
  Tabs,
  makeStyles, 
  Typography
} from '@material-ui/core'

import {
  TabbedNav,
  //SideMenuSection,
  //PageSections,
  //MainContentSection,
  SidebarLayout
} from '../../components/app'

import { 
  InvestorInfoView,
 } from '../../components/account'

import { googlePageView, toDashString, withOnDemandAuth } from '../../util'

//import AccountTabs from '../../settings/accountTabs'


@inject("store")
@observer
class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.userStore = props.store.userStore
    this.classes = props.classes
    this.state = {
      tabIndex: (props.tabIndex || 0)
    }
  }

  componentDidMount() {
    googlePageView()
  }

  Tabs = () => (
    <Tabs value={this.state.tabIndex} onChange={(ignore, i) => { this.setState({tabIndex: i})}} orientation='vertical' /* classes={tabsClasses} */>
    {tabbedViews.map((child, i) => (
      <Tab
        label={child.props.tabTitle}
        disableFocusRipple
        key={`${toDashString(child.props.tabTitle)}-tab-key-${i}`}
        //classes={tabClasses}
      />
    ))}
    </Tabs>
  ) 

  Header = () => (
    <div style={{height: '50px'}} >
      <Typography variant='h4'>{`${this.userStore.getFullName}: ${tabbedViews[this.state.tabIndex].props.tabTitle}`}</Typography>
    </div>
  ) 
  
  render() {
    return (
      <SidebarLayout top={this.Header()} left={this.Tabs()} minHeight='60vh'>
        {tabbedViews.map((child, i) => ((i === this.state.tabIndex) ? child : null))}
      </SidebarLayout>
    )
  }
}


const Funds = (props) => (
  <h1> TESTING FUNDS</h1>
)

const tabbedViews = [
  <InvestorInfoView tabTitle='Profile'/>,
  <Funds tabTitle='Funds' /> 
]



export default withOnDemandAuth(Profile)

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