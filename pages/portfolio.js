import React from "react"
import PropTypes from "prop-types"
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import AppBar from "@material-ui/core/AppBar"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"

import { inject, observer } from "mobx-react"

// core components

// import styles from "assets/jss/material-kit-react/views/landingPage.js"
import styles from "../assets/jss/views/landingPage.js"

// Sections for this page
import InvestorTopPicksSection from "../views/LandingPage/Sections/InvestorTopPicksSection"
import PortfolioCta from "../views/ProfilePage/PortfolioCta"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


@inject("store")
@observer
class Portfolio extends React.Component {

  TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }
  
  a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  render() {
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };
    
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    // const { movieStore } = this.props.store
    const { classes } = this.props
    return (
      <>
        <div style={{ height: "140px" }}></div>
        <div className={`${classes.main} ${classes.mainRaised}`}>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Portfolio" {...a11yProps(0)} />
              <Tab label="Trade" {...a11yProps(1)} />
              <Tab label="Benefits" {...a11yProps(2)} />
              <Tab label="Newsfeed" {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Portfolio
          </TabPanel>
          <TabPanel value={value} index={1}>
            Trade
          </TabPanel>
          <TabPanel value={value} index={2}>
            Benefits
          </TabPanel>
          <TabPanel value={value} index={3}>
            Newsfeed
          </TabPanel>
          <div className={classes.container}>
            <InvestorTopPicksSection />
            <PortfolioCta/>
          </div>
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Portfolio)
