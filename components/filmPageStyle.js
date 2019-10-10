import {
  container,
  title,
  flexCenteredRow,
  flexCenteredColumn,
} from "../../../components/esxStyles.js/index.js"

export default theme => ({

  flexCenteredRow: {
    ...flexCenteredRow
  },

  flexCenteredColumn: {
    ...flexCenteredColumn
  },

  container: {
    ...container,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    background: theme.palette.background.default,
    color: theme.palette.text.primary
  },

  outermost: {
    padding: "0 32px 32px 32px"
  },

  leftAndRight: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  topAndBottom: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },

  breadcrumbRow: {
    marginBottom: "30px"
  },
  
  pageTabsOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-start",
    padding: "0 30px"
  },
  pageTab: {
    display: "block",
    cursor: "pointer",
    "&:first-child": {
      marginRight: "12px"
    },
    textTransform: "uppercase",
    lineHeight: "1.1"
  },
  selectedTab: {
    // better than textDecoration: underline, 
    // which renders too close to the text 
    borderBottom: "1px solid " + theme.palette.text.primary
  },

  mainArea: {
    alignItems: "stretch",
    marginBottom: "32px"
  },


  copyArea: {
    paddingTop: "30px"
  },

  titleAndDescription: {

  },

  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    minHeight: "32px",
    textDecoration: "none",
    fontSize: "3rem",
    fontFamily: "sans-serif",
    textTransform: "uppercase",
    marginTop: "0px",
    color: "inherit"
  },
  description: {
    fontSize: "1.313rem",
    maxWidth: "70%",
    //margin: "10px auto 0"
  },


  sectionTitle: {
    fontSize: "3rem",
    margin: 0,
    textTransform: "uppercase"
  },
  sectionByline: {
    fontSize: "1.5rem",
    margin: 0,
    textTransform: "uppercase",
    marginBottom: "24px"
  },

  mainImage: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#f4f3f3",
    marginLeft: "70px",
  },

  graphImage: {
    display: "block",
    margin: "0 auto",
    backgroundColor: "#f4f3f3",
  },



  articleSection: {
    marginTop: "70px"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  grow: {
    flexGrow: 1,
    display: "none",
    // [theme.breakpoints.up("sm")]: {
    //   display: "block"
    // },
    display: "block"
  },
  flex: {
    display: "flex",
    alignItems: "flex-end"
  },


  movieButtonsOuter: {
    width: "70%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    //flexGrow: 1
  },

  movieButton: {
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "inline-block",
    flexGrow: 1,
    //    marginLeft: 0,
    "&:first-child": {
      marginRight: "12px"
    },

  },
  faPlay: {
    paddingRight: "10px"
  },

  seeMoreOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: "1px solid #555"
  },
  seeMoreButton: {
    ...flexCenteredColumn,
    paddingBottom: "2px"
  },
  seeMoreCopy: {
    display: "block",
    fontSize: "8pt",
    cursor: 'pointer'
  },

  aboutMoreTitleArea: {
    padding: "30px 0"
  },
  aboutMoreCopyArea: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
  },
  aboutMoreStats: {
    flexGrow: 1,
    flexBasis: 0,
    paddingRight: "24px",
  },
  aboutMoreText: {
    flexGrow: 1,
    flexBasis: 0
  },
  aboutMoreStatsTable: {
    tableLayout: "fixed",
    width: "80%",
    borderSpacing: "0 1em"
  },

  investCompanyName: {
    margin: "0 auto", 
    marginTop: "32px"   
  },
  investCompanyDescription: {
    margin: "0 auto"    
  },
  investPrice: {
    margin: "0 auto",   
    marginTop: "12px", 
    marginTop: "8px" 
  },
  deltaRow: {
    margin: "0 auto",    
    marginBottom: "12px" 
  },
  statsButton: {
    margin: "0 auto"    
  },

  dollarSign: {
    fontSize: "2rem"
  },
  dollarValue: {
    fontSize: "2.4rem"
  },
  centsValue: {
    fontSize: "2rem"
  },


  investMoreOuter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "32px"

  },
  investMoreTable: {
    borderTop: "1px #444 solid",
    width: "300px",
    "&:first-child": {
      marginRight: "60px"
    },
    "& td": {
      borderBottom: "1px #444 solid",
      fontSize: "1.3rem",
      color: "#999",
      textAlign: "right",
      "&:first-child": {
        textAlign: "left",
      }
    }


  }

})


