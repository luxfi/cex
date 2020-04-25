import React from 'react'
import { isObservableArray } from 'mobx'

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
        <h1 className={classes.sectionTitle}>About</h1>
        <h2 className={classes.sectionByline}>More about the film</h2>
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
    </>
  )
}

export default AboutMore
