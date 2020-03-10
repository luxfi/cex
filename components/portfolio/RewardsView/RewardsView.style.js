import { green, blue } from '@material-ui/core/colors'

const miniReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({

  root: {
    margin: theme.spacing(0, 4),
  },
  referalCard: {
    alignItems: "flex-start !important",
    padding: theme.spacing(2) + "px !important",
    display: 'flex',
    flexDirection: 'row !important',
    justifyContent: "flex-start !important",
    '& img': {
      display: 'block',
      marginRight: 30
    }
  },
  referalCardTitle: {
    fontSize: "1.6rem",
  },
  referalCardContentArea: {
    display: 'flex',
    flexDirection: 'column'
  },
  rewardIconsRow: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '12px',
    marginBottom: '12px'
  },
  movieReferralIcon: {
    fontSize: "2rem",
    marginRight: '20px',
    display: 'block',
  },
  referalCardReferralLabel: {
    fontSize: "1.4rem",
  },

  referalCardPointsString: {
    ...miniReset,
    //marginBottom: "0.4rem",
    fontSize: '1.4rem',
  },
  referalCardCreditsIcon: {
    display: "inline-block",
    position: 'relative',
    top: '2px',
    color: blue[600],
    fontSize: '1.4rem',
    paddingRight: '3px',
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
   // color: theme.palette.text.secondary + " !important",
  },
  leftAlignedPaper: {
    alignItems: "flex-start !important",
    paddingLeft: theme.spacing(6)
  },

  title: {
    ...miniReset,
    //textTransform: "uppercase",
    fontSize: "1rem",
    fontWeight: 200,
    marginBottom: theme.spacing(2)
  },

  cardIcon: {
    display: "block",
    fontSize: '4rem',
    marginBottom: theme.spacing(1)
  },
  disabledIcon: {
    opacity: '0.4'
  },

  pointsString: {
    ...miniReset,
    //marginBottom: "0.4rem",
    fontSize: '1rem',
  },
  creditIcon: {
    display: "inline-block",
    position: 'relative',
    top: '2px',
    //fontSize: '1.2rem',
    color: blue[600],
    fontSize: '1rem',
    paddingRight: '3px',
    //marginBottom: theme.spacing(1)
  },
  disabledCreditIcon: {
    opacity: '0.7'
  },


  completedIcon: {
    fontSize: '1rem',
    color: green[600],
    marginBottom: "-0.2rem",
    marginRight: "0.2rem"
  },
  completedString: {
    ...miniReset,
    fontSize: '0.7rem',
  },

  totalTitle: {
    ...miniReset,
    //textTransform: "uppercase",
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
    fontSize: '4rem',
    display: "block",
    color: blue[600],
    marginRight:  theme.spacing(1),
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
    padding: "6px 15px 6px 10px",
    width: '400px'
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
})
