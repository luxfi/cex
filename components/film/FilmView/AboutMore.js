import React from 'react'
import { isObservableArray } from 'mobx'

import commonStr from '../../../service/common'

const TableRow = ({ field, label, movie }) => {
  // note that Array.isArray() will return false
  const content = isObservableArray(movie[field])
    ? movie[field].join(', ')
    : movie[field]

  return (
    <tr style={{ marginBottom: '12px' }}>
      <td valign='top'>{label}</td>
      <td valign='top'>{content}</td>
    </tr>
  )
}

const AboutMore = ({ classes, movie }) => {
  return (
    <>
      <div className={classes.aboutMoreTitleArea}>
        <h2 className={classes.sectionTitle}>About</h2>
        <h3 className={classes.sectionByline}>More about the {commonStr('product')}</h3>
      </div>
      <div className={classes.aboutMoreCopyArea}>
        <div className={classes.aboutMoreStats}>
          <table className={classes.aboutMoreStatsTable}>
            <tbody>
              <TableRow field='director' label='Director' movie={movie}/>
              <TableRow field='actors' label='Starring' movie={movie}/>
              <TableRow field='writer' label='Writers' movie={movie}/>
              <TableRow field='genre' label='Genres' movie={movie}/>
              <TableRow field='rated' label='Rating' movie={movie}/>
            </tbody>
          </table>
        </div>
        <div className={classes.aboutMoreText}>{movie.longDescription}</div>
      </div>
      <div className={classes.aboutMoreText}>{movie.longDescription}</div>
    </>
  )
}

export default AboutMore
