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
  const SessionsTableHeader = (ignore) => (
    <TableHead>
      <TableRow className={classes.sessionsHeaderRow}>
        <TableCell>Signed In</TableCell>
        <TableCell>Browser</TableCell>
        <TableCell>IP Address</TableCell>
        <TableCell>Near</TableCell>
      </TableRow>
    </TableHead>
  )

  const SessionsTableRow = ({
    date,
    browser,
    ip,
    location,
  }) => (
    <TableRow>
      <TableCell>{date}</TableCell>
      <TableCell>{browser}</TableCell>
      <TableCell>{ip}</TableCell>
      <TableCell>{location}</TableCell>
    </TableRow>
  )

  return (
    <>
      <Table className={classes.sessionsSessionsTable} padding='none'>
        <SessionsTableHeader />
        <TableBody>
          {data.webSessions.map((item, i) => (
            <SessionsTableRow date={item.date} browser={item.browser} ip={item.ip} location={item.location} key={`sessions-table-key-${i}`} />
          ))}
        </TableBody>
      </Table>
    </>
  )
}
