import React from "react"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ToggleButtons = ({ updatePrintInterval }) => {
  const [interval, setInterval] = React.useState("5 min")

  const handleInterval = (event, newInterval) => {
    setInterval(newInterval)
  }

  const classes = useStyles()

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={interval}
        exclusive
        onChange={handleInterval}
      >
        <ToggleButton
          value="1 min"
          onClick={e => updatePrintInterval(1)}
          disableFocusRipple
        >
          1 min
        </ToggleButton>
        <ToggleButton
          value="5 min"
          onClick={e => updatePrintInterval(5)}
          disableFocusRipple
        >
          5 min
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleButtons
