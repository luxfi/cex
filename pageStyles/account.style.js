import { green, blue } from '@material-ui/core/colors'

const miniReset = {
  margin: "0 !important",
  padding: "0 !important"
}

export default (theme) => ({

  plaidLink: {
      ... miniReset,
      color: blue[600] + " !important",
      border: "none !important",
      cursor: "pointer !important",
      backgroundColor: "transparent !important",

      "&:hover": {
        textDecoration: "underline"
      }
  }
})
