import React, { Component } from 'react';
import { inject, observer } from "mobx-react"
import { Box, Typography } from "@material-ui/core"
import { withStyles } from "@material-ui/core/styles"

import CircularProgress from '@material-ui/core/CircularProgress';

import DisplayComments from './DisplayComments'
import AddComment from './AddComment'
import SortComments from './SortComments'

import styles from './styles/comments.style'

const COMMENT_TYPE = 'trailerComment'

@inject("store")
@observer
class Comments extends Component {
  componentDidMount() {
    const { store: { commentStore } } = this.props
    commentStore.loadComments(COMMENT_TYPE)
  }

  render() {
    const { classes, store } = this.props
    const { 
      isLoading,
      comments,
      comments: {
        pagination: { totalResults = '' } = {}
      } = {}
    } = store.commentStore

    const userComments = comments && comments.comments
    
    return(
      <Box className={classes.commentWrapper}>
        {
         isLoading ? (
          <Box className={classes.loadingIcon}>
            <CircularProgress />
          </Box>
         ) : (
          <>
            <Box className={classes.commentHeader}>
              <Typography component="h4">{`${totalResults || 0} Comments`}</Typography>
              {comments && <SortComments />}
            </Box>
            <AddComment
              numOfRows={3}
              type={COMMENT_TYPE}
            />
            <DisplayComments comments={userComments} />
          </>
         ) 
        }
      </Box>
    );
  }
}

export default withStyles(styles)(Comments)
