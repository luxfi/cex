import React from "react"
import { inject, observer } from "mobx-react"

import { Paper, withStyles } from "@material-ui/core"

import DocumentElement from './DocumentElement';

import styles from '../account.style'

@withStyles(styles)
@inject("store")
@observer
export default class extends React.Component {
  componentDidMount() {
    this.props.store.userStore.generateFakeDocs()
  }

  render() {
    const { store, classes } = this.props
    const { userStore: { taxDocuments, accountStatements } } = store

    return (
    <Paper className={classes.root}>
      <DocumentElement
        documents={taxDocuments}
        title="Tax Documents"
        message="There are no tax documents for you!"
        type='Apex Clearing 1099'
      />
      <DocumentElement
        documents={accountStatements}
        title="Account Statements"
        type='ESX Securities Account Statement'
      />
    </Paper>
    )
  }
}
