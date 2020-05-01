import React from 'react'

import { Breadcrumbs, Link } from '@material-ui/core'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'

import NextMuiLink from '../NextMuiLink'

const TEMP_LAMENESS = "Filming The Lone Wolf Dies"; // TODO

export default class extends React.Component {

  render() {
    const pageName = this.props.children ? this.props.children : TEMP_LAMENESS;

    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link color="inherit" href="/" component={NextMuiLink}>
          Home
        </Link>
        <span>{pageName}</span>
      </Breadcrumbs>
    )
  }
}
