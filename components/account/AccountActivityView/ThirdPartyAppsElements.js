import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'

import fakeData from './fixture/fakeActiveSessions'

const data = fakeData()

export default (props) => {
  const { classes } = props

  const AppsTableHeader = (ignore) => (
    <TableHead>
      <TableRow className={classes.sessionsHeaderRow}>
        <TableCell>Application</TableCell>
        <TableCell>Permissions</TableCell>
        <TableCell>Recent activity</TableCell>
      </TableRow>
    </TableHead>
  )

  const AppsTableRow = ({
    appName,
    renderedIcon,
    permissions,
    time,
  }) => {
    const icon = (!renderedIcon) ? null : renderedIcon + '&nbsp;'
    return (<TableRow>
      <TableCell>{icon}{appName}</TableCell>
      <TableCell>{permissions}</TableCell>
      <TableCell>{time}</TableCell>
    </TableRow>)
  }

  return (
    <>
      <Table className={classes.sessionsSessionsTable} padding='none'>
        <AppsTableHeader />
        <TableBody>
        {data.thirdPartyApps.map((item, i) => (
          <AppsTableRow appName={item.application} permissions={item.permissions} time={item.date} key={`apps-table-key-${i}`}/>
        ))}
        </TableBody>
      </Table>
    </>
  )
}
