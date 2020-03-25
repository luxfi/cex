import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import { Box, Typography } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import CircularProgress from '@material-ui/core/CircularProgress';

import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import SortComments from './SortComments'

import styles from './styles/comments.style'

@inject('store')
@observer
class Comments extends Component {
  componentDidMount() {
    const { store: { commentStore }, identifierId } = this.props
    commentStore.loadComments(identifierId)
  }

  render() {
    const { classes, store, identifierId } = this.props
    const {
      isLoading,
      comments,
      comments: {
        pagination: { totalResults = '' } = {},
      } = {},
    } = store.commentStore

    const userComments = comments && comments.comments

    return (
      <Box className={classes.commentWrapper}>
        {
         isLoading ? (
          <Box className={classes.loadingIcon}>
            <CircularProgress />
          </Box>
         ) : (
           <>
            <Box className={classes.commentHeader}>
              <Typography component='h4'>{`${totalResults || 0} Comments`}</Typography>
              {comments && <SortComments />}
            </Box>
            <AddComment
              numOfRows={3}
              identifierId={identifierId}
            />
            <DisplayComments comments={userComments} />
           </>
         )
        }
      </Box>
    )
  }
}

export default withStyles(styles)(Comments)
