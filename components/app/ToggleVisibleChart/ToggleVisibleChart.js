import React from "react"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ToggleVisibleButtons = ({ updateSelected }) => {
  const [selected, setSelected] = React.useState("5 min")

  const handleSelection = (event, updatedSelection) => {
    setSelected(updatedSelection)
  }

  const classes = useStyles()

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup value={selected} exclusive onChange={handleSelection}>
        <ToggleButton
          value="1 min"
          onClick={e => updateSelected(1)}
          disableFocusRipple
        >
          1 min
        </ToggleButton>
        <ToggleButton
          value="5 min"
          onClick={e => updateSelected(5)}
          disableFocusRipple
        >
          5 min
        </ToggleButton>
        <ToggleButton
          value="5 min"
          onClick={e => updateSelected(5)}
          disableFocusRipple
        >
          5 min
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleVisibleButtons
