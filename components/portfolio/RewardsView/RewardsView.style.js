import { green, blue } from '@material-ui/core/colors'

const spacingReset = {
  margin: 0,
  padding: 0
}

export default (theme) => ({

  invisible: {
    visibility: 'hidden'
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
  
  leftAlignedPaper: {
    alignItems: "flex-start !important",
    paddingLeft: theme.spacing(6)
  },
 
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  movieRewardsCard: {
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
  movieCardTitle: {
    fontSize: "1.5rem",
    borderBottom: '1px solid #333',
  },
  movieCardContentArea: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
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
  movieCardReferralLabel: {
    fontSize: "1.4rem",
  },

  referalCardPointsString: {
    ...spacingReset,
    fontSize: '1.1rem',
    paddingLeft: '8px',
  },
  referalCardCreditsIcon: {
    display: "inline-block",
    position: 'relative',
    top: '5px',
    color: blue[600],
    fontSize: '1.2rem',
    paddingRight: '3px',
  },


  title: {
    ...spacingReset,
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
    ...spacingReset,
    fontSize: '1rem',
  },
  creditIcon: {
    display: "inline-block",
    position: 'relative',
    top: '2px',
    color: blue[600],
    fontSize: '1rem',
    paddingRight: '3px',
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
    ...spacingReset,
    fontSize: '0.7rem',
  },

  totalTitle: {
    ...spacingReset,
    //textTransform: "uppercase",
    fontSize: "1.2rem",
    fontWeight: 300,
    marginBottom: theme.spacing(1),
    textAlign: "baseline"
  },

  totalOuter: {
    ...spacingReset,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },

  totalString: {
    ...spacingReset,
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
    ...spacingReset,
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
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      '& .MuiInputBase-input': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }
    }
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
