import React from "react"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import Link from "../components/link"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"

const styles = theme => ({
  root: {
    justifyContent: "center",
    flexWrap: "wrap"
  },
  paper: {
      // :aa don't pad here! .. let the containing element do it.  
    backgroundColor: "transparent"
  },
  crumbs: {
    color: "grey"
  }
})


const TEMP_LAMENESS = "Filming The Lone Wolf Dies"; // TODO

class CustomSeparator extends React.Component  {

  render() {
    const {classes} = this.props

    const pageName = this.props.children ? this.props.children : TEMP_LAMENESS;

    return (
      <div className={classes.root}>
        <Paper elevation={0} className={classes.paper}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
            className={classes.crumbs}
          >
            <Link color="inherit" href="/">Home</Link>
            <Typography>{pageName}</Typography>
          </Breadcrumbs>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(CustomSeparator)

// import React from 'react';
// import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Chip from '@material-ui/core/Chip';
// import HomeIcon from '@material-ui/icons/Home';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// const StyledBreadcrumb = withStyles(theme => ({
//   root: {
//     backgroundColor: theme.palette.grey[100],
//     height: theme.spacing(3),
//     color: theme.palette.grey[800],
//     fontWeight: theme.typography.fontWeightRegular,
//     '&:hover, &:focus': {
//       backgroundColor: theme.palette.grey[300],
//     },
//     '&:active': {
//       boxShadow: theme.shadows[1],
//       backgroundColor: emphasize(theme.palette.grey[300], 0.12),
//     },
//   },
// }))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(1),
//   },
//   avatar: {
//     background: 'none',
//     marginRight: -theme.spacing(1.5),
//   },
// }));

// export default function CustomizedBreadcrumbs() {
//   const classes = useStyles();

//   return (
//     <Paper elevation={0} className={classes.root}>
//       <Breadcrumbs aria-label="breadcrumb">
//         <StyledBreadcrumb
//           component="a"
//           href="#"
//           label="Home"
//           icon={<HomeIcon fontSize="small" />}
//           onClick={handleClick}
//         />
//         <StyledBreadcrumb component="a" href="#" label="Catalog" onClick={handleClick} />
//         <StyledBreadcrumb
//           label="Accessories"
//           deleteIcon={<ExpandMoreIcon />}
//           onClick={handleClick}
//           onDelete={handleClick}
//         />
//       </Breadcrumbs>
//     </Paper>
//   );
// }
