import React from 'react'
import MaterialDivider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import common from '@material-ui/core/colors/common'
import { fade } from '@material-ui/core/styles/colorManipulator'
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: fade(common.white, 0.7),
    opacity: 7,
  },
}))

const Divider = () => {
  const classes = useStyles()
  return <MaterialDivider className={classes.root} />
}

export default Divider
