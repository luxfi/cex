import React from "react"
import FormatAlignLeftIcon from "@material-ui/icons/FormatAlignLeft"
import FormatAlignCenterIcon from "@material-ui/icons/FormatAlignCenter"
import FormatAlignRightIcon from "@material-ui/icons/FormatAlignRight"
import FormatAlignJustifyIcon from "@material-ui/icons/FormatAlignJustify"
import FormatBoldIcon from "@material-ui/icons/FormatBold"
import FormatItalicIcon from "@material-ui/icons/FormatItalic"
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined"
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill"
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown"
import Typography from "@material-ui/core/Typography"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: theme.spacing(2, 0)
  }
}))

const ToggleButtons = ({ updatePrintInterval }) => {
  const [alignment, setAlignment] = React.useState("5 min")
  // const [formats, setFormats] = React.useState(() => ["5min"])

  // const handleFormat = (event, newFormats) => {
  //   setFormats(newFormats)
  // }

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment)
  }

  const classes = useStyles()

  return (
    <div className={classes.toggleContainer}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton
          value="1 min"
          aria-label="left aligned"
          onClick={e => updatePrintInterval(1)}
          disableFocusRipple
        >
          1 min
        </ToggleButton>
        <ToggleButton
          value="5 min"
          aria-label="centered"
          onClick={e => updatePrintInterval(5)}
          disableFocusRipple
        >
          5 min
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default class ChartIntervalControls extends React.Component {
  render() {
    const { printInterval } = this.props

    const { updatePrintInterval } = this.props

    // console.log('printInterval', printInterval)
    return (
      <div className="chart-interval-controls">
        <div className="group space-single">
          <ToggleButtons updatePrintInterval={updatePrintInterval} />
          {/* <Button
            className={`button ${printInterval === 1 && "selected"}`}
            title="1min"
            onClick={e => this.handleClick(1)}
            color="white"
          >
            1min
          </Button>
        </div>
        <div className="group space-single">
          <Button
            className={`button ${printInterval === 5 && "selected"}`}
            title="5min"
            onClick={e => this.handleClick(5)}
            color="white"
          >
            5min
          </Button> */}
        </div>
        {/* <div className="group space-single"><div className={`button ${printInterval === 15 && 'selected'}`} title="15min" onClick={e => this.handleClick(15)}>15min</div></div> */}
        <style jsx>
          {`
            .chart-interval-controls {
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              flex-wrap: nowrap;
            }
            .MuiButton-root:hover {
              text-decoration: none;
              background-color: gray;
            }
            .button {
              font-size: 11px;
              color: white;
              text-decoration: none;
              flex-grow: 1;
              text-align: center;
              padding: 5px !important;
              height: 16px !important;
              color: #4a4a4a;
              cursor: pointer;
              border: 1px solid;
              border-color: #000;
              line-height: 15px;
            }
            .chart-interval-controls .group {
              display: inline-block;
              white-space: nowrap;
              padding: 0;
              margin: 5px 0 0;
              height: 30px;
              vertical-align: top;
            }
            .space-single {
              padding: 0 4px 0 0;
            }
            .button:hover,
            .button.selected {
              background-color: rgba(53, 116, 250, 0.12) !important;
              color: #8194a4 !important;
              border-radius: 3px;
            }
            .button:hover {
              border-color: rgb(129, 148, 164);
            }
          `}
        </style>
      </div>
    )
  }
}
