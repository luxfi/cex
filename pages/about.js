import React from "react"
import { inject, observer } from "mobx-react"
import { withStyles } from "@material-ui/core/styles"
import { Container, Typography, Grid, Box } from "@material-ui/core"
import { NestedMenu } from "../components/app"
import { Element } from "react-scroll"

const styles = theme => ({})

const Menu = () => {
  return (
    <NestedMenu
      selectedKeys={["first"]}
      menus={[
        { key: "first", label: "First" },
        { key: "second", label: "Second" },
        { key: "third", label: "Third" },
        { key: "fourth", label: "Fourth" }
      ]}
    />
  )
}

@inject("store")
@observer
class About extends React.Component {
  render() {
    const { classes } = this.props
    return (
        <Container component="main" maxWidth="md">
          <Box mt={8} mb={16}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Box
                  style={{
                    position: "fixed",
                    width: "260px"
                    // left: "32px",
                    // top: "0px"
                  }}
                >
                  <Menu />
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Element name="first" className="element">
                  <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                    est ullamcorper eget nulla facilisi etiam dignissim diam.
                    Pulvinar elementum integer enim neque volutpat ac tincidunt.
                    Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                    sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate
                    odio. Morbi tincidunt ornare massa eget egestas purus
                    viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                    Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod
                    elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin
                    aliquam ultrices sagittis orci a.
                  </Typography>
                </Element>
                <Element name="second" className="element">
                  <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                    est ullamcorper eget nulla facilisi etiam dignissim diam.
                    Pulvinar elementum integer enim neque volutpat ac tincidunt.
                    Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                    sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate
                    odio. Morbi tincidunt ornare massa eget egestas purus
                    viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                    Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod
                    elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin
                    aliquam ultrices sagittis orci a.
                  </Typography>
                </Element>
                <Element name="third" className="element">
                  <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                    est ullamcorper eget nulla facilisi etiam dignissim diam.
                    Pulvinar elementum integer enim neque volutpat ac tincidunt.
                    Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                    sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate
                    odio. Morbi tincidunt ornare massa eget egestas purus
                    viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                    Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod
                    elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin
                    aliquam ultrices sagittis orci a.
                  </Typography>
                </Element>
                <Element name="fourth" className="element">
                  <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla
                    est ullamcorper eget nulla facilisi etiam dignissim diam.
                    Pulvinar elementum integer enim neque volutpat ac tincidunt.
                    Ornare suspendisse sed nisi lacus sed viverra tellus. Purus
                    sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate
                    odio. Morbi tincidunt ornare massa eget egestas purus
                    viverra accumsan in. In hendrerit gravida rutrum quisque non
                    tellus orci ac. Pellentesque nec nam aliquam sem et tortor.
                    Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod
                    elementum nisi quis eleifend. Commodo viverra maecenas
                    accumsan lacus vel facilisis. Nulla posuere sollicitudin
                    aliquam ultrices sagittis orci a.
                  </Typography>
                </Element>
              </Grid>
            </Grid>
          </Box>
        </Container>
    )
  }
}

export default withStyles(styles)(About)
