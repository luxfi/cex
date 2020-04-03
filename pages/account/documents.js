import React from "react"
import { inject, observer } from "mobx-react"

import { Typography } from "@material-ui/core"

import { TaxDocument } from '../../components/account'


import { googlePageView } from '../../util'
import AccountTabs from '../../settings/accountTabs'
import { withOnDemandAuth } from '../../util/HOC'
import {
  TabbedNav,
  SideMenuSection,
  PageSections,
  MainContentSection,
  MainContent,
} from '../../components/app'

@inject("store")
@observer
class Documents extends React.Component {
  componentDidMount() {
    googlePageView()
    this.props.store.userStore.generateFakeDocs()
  }

  render() {
    const store = this.props.store
    const { userStore } = store

    return (
      <PageSections>
        <SideMenuSection title={userStore.getFullName}>
          <TabbedNav tabs={AccountTabs} tab='documents' orientation="vertical" />
        </SideMenuSection>
        <MainContentSection>
          <MainContent title="Tax Documents">
            {
              userStore.taxDocuments && userStore.taxDocuments.length > 0 ?
              userStore.taxDocuments.map((d, i) => (
                <TaxDocument
                  key={`apex_${i}`}
                  type='Apex Clearing 1099'
                  link={d.link}
                  showDivider={i < userStore.taxDocuments.length - 1}
                  date={d.date} />
              ))
              : <Typography variant='body2'>There are no tax documents for you!</Typography>
            }
          </MainContent>
          <MainContent title="Account Statements">
            {
              userStore.accountStatements && userStore.accountStatements.length > 0 ?
              userStore.accountStatements.map((d, i) => (
                <TaxDocument
                  key={`statement_${i}`}
                  type='ESX Securities Account Statement'
                  link={d.link}
                  showDivider={i < userStore.accountStatements.length - 1}
                  date={d.date} />
              ))
              : <Typography variant='body2'>There are no account statements for you!</Typography>
            }
          </MainContent>
        </MainContentSection>
      </PageSections>
    )
  }
}

export default withOnDemandAuth(Documents)
