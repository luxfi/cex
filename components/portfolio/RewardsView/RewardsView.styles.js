import { green, blue } from '@material-ui/core/colors'

const miniReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({

  root: {
    margin: theme.spacing(0, 4),
  },
  paper: {
    padding: theme.spacing(2),
    height: "216px",
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between"
  },
  disabledPaper: {
    color: theme.palette.text.secondary + " !important",
  },
  leftAlignedPaper: {
    alignItems: "flex-start !important",
    paddingLeft: theme.spacing(4)
  },

  title: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1rem",
    fontWeight: 200,
    marginBottom: theme.spacing(2)
  },

  cardIcon: {
    display: "block",
    fontSize: '4.2rem',
    color: blue[500],
    marginBottom: theme.spacing(1)
  },
  disabledIcon: {
    color: theme.palette.grey[300] + " !important",
  },

  pointsString: {
    ...miniReset,
    marginBottom: "0.4rem",
  },
  completedIcon: {
    fontSize: '1rem',
    color: green[600],
    marginBottom: "-0.2rem",
    marginRight: "0.1rem"
  },
  completedString: {
    ...miniReset,
    fontSize: '0.7rem',
  },

  totalTitle: {
    ...miniReset,
    textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: 300,
    marginBottom: theme.spacing(1),
    textAlign: "baseline"
  },

  totalOuter: {
    ...miniReset,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  totalString: {
    ...miniReset,
    display: "block",
    fontSize: '3.5rem',
  },
  totalIcon: {
    fontSize: '5.5rem',
    display: "block",
    color: blue[600],
    paddingRight: "0.2rem",
  },

  monthTotalString: {
    ...miniReset,
    fontWeight: 300,
    marginBottom: theme.spacing(1)
  },


  urlCopyOuter: {
    height: "2.2rem",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch"
  },
  urlField: {
    border: "1px " + theme.palette.text.secondary + " solid",
    borderRadius: "3px",
    marginRight: theme.spacing(1),
    padding: "6px 24px 6px 10px",
  },

  socialOuter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    height: "2rem",

    "& div.SocialMediaShareButton": {
      display: "block",
      width: "1.5rem !important",
      height: "1.5rem !important",
      cursor: "pointer",
      marginRight: "0.7rem",

      "&:hover": {
        width: "1.6rem !important",
        height: "1.6rem !important",
        filter: "drop-shadow(1px 1px 0.6rem #bbb)",
        marginRight: "0.6rem",
      },

      "& svg": {
        width: "100%",
        height: "100%"
      }
    }
  },

  shareLabel: {
    display: "block",
    cursor: "pointer",
    fontSize: "1.4rem",
    marginRight: "0.7rem",
  },
  facebookIcon: {
    color: "#3b5998",
    marginLeft: "-4px",
  },
  twitterIcon: {
    color: "#00acee",
  },
  linkedinIcon: {
    color: "#0e76a8",
  },
  emailIcon: {
    color: blue[600],
  }

})
