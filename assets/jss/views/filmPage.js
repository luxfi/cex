import { 
  container, 
  title, 
  darkThemeBG, 
  darkThemeText 
} from "../esx.js"

export default theme => ({



  container: {
    ...container,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    background: darkThemeBG,
    color: darkThemeText
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
  breadcrumbs: {
    
    color: darkThemeText + " !important"

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
    borderBottom: "1px solid " + darkThemeText
  },

  mainArea: {
    alignItems: "stretch",
    marginBottom: "32px"
  },

  flexCentered : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"  
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
    marginTop: "70px",
    display: "inline"
  },
  mainImage: {
    display: "block",
    textAlign: "center",
    backgroundColor: "#f4f3f3",
    marginLeft: "70px",
  },
  
  graphImage: {
    display: "block",
    textAlign: "center",
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
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    display: "block",
    flexGrow: 1
  },
  faPlay: {
    paddingRight: "10px"
  },

  seeMoreOuter : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottom: "1px solid #999"
  },
  seeMoreButton: {
    display: "block"
  }

})

