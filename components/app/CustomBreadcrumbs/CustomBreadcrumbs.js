import React from "react"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Link from "../../CustomLink"
import NavigateNextIcon from "@material-ui/icons/NavigateNext"


const TEMP_LAMENESS = "Filming The Lone Wolf Dies"; // TODO

class Index extends React.Component  {

  render() {
    const pageName = this.props.children ? this.props.children : TEMP_LAMENESS;

    return (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          style= {{
            MuiBreadcrumbsRoot: {
              
            }
          }}
        >
          <Link color="inherit" href="/">Home</Link>
          <span>{pageName}</span>
        </Breadcrumbs>
    )
  }
}
  
export default Index
