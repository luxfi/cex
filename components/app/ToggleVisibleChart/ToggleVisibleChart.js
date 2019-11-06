import React from "react"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import ShowChartIcon from "@material-ui/icons/ShowChart"
import GraphicEqIcon from '@material-ui/icons/GraphicEq'
import { makeStyles, withStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ToggleVisibleButtons = ({ setActiveChart }) => {
  const [selected, setSelected] = React.useState("line-chart")

  const handleSelection = (event, updatedSelection) => {
    setSelected(updatedSelection)
  }

  const classes = useStyles()

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup value={selected} exclusive onChange={handleSelection}>
        <ToggleButton
          value="line-chart"
          onClick={e => setActiveChart("line-chart")}
          disableFocusRipple
        >
          <ShowChartIcon />
        </ToggleButton>
        <ToggleButton
          value="candlestick"
          onClick={e => setActiveChart("candlestick")}
          disableFocusRipple
        >
          <GraphicEqIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default ToggleVisibleButtons
