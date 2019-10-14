import React from "react"
import { inject, observer } from "mobx-react"
import Router from "next/router"

// nodejs library that concatenates classes
import classNames from "classnames"

// @material-ui/core components
import Button from "@material-ui/core/Button"
import CardActions from "@material-ui/core/CardActions"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardContent from "@material-ui/core/CardContent"
import Grid from "@material-ui/core/Grid"

// @material-ui styles

// @material-ui/icons
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

// core components
import ContentLoader from "react-content-loader"

@inject("store")
@observer
export default class NewestPicksSection extends React.Component {
  render() {
    const { store } = this.props
    const { movies } = store.movieStore
    const { userPortfolio } = store

    console.log('movie', store.movieStore)

    // What functions do we need from the movie and user store?
    console.log('watchlist', userPortfolio.watchlist)
    const loggedIn = store.userStore.loggedIn
    return (
      <div id="trailer-slider" style={{ padding: "48px 0px" }} >
        <Typography variant="h5">
          <Box fontWeight={100} fontSize={20}>
            NOW FUNDRAISING
          </Box>
        </Typography>
        <br />
        <div className="container" style={{
          display: "flex",
          // padding: "0 55px"
        }}>
          {movies.map((d, i) => {
            const inWatchlist = userPortfolio.watchlist.indexOf(d.ticker) > -1
            return (
              <div 
                className="item"
                style={{
                  flex: "0 0 19.7%",
                  textAlign: "center",
                  marginRight: "16px",
                  transition: "transform 300ms ease 100ms"
                }}
                key={`trailer_${i}`}
              >
                  <Card
                    onClick={() => {
                      Router.push(`/film/${d.movieSlug}`)
                    }}
                  >
                    <CardContent
                      style={{
                        display: 'block',
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: `url(${d.posterImg})`,
                        maxHeight: '1200px',
                        minHeight: '487px',
                        minWidth: '287px',
                        backgroundSize: 'cover',
                      }}
                    >
                      {/* <div className="pick-text">
                        <Typography variant="body1">
                          <strong>{d.name}</strong>
                        </Typography>
                        <Typography variant="body2">
                          {d.shortDescription}
                        </Typography>
                        <br />
                        {
                          loggedIn ?
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={e => {
                                inWatchlist ?
                                  userPortfolio.removeFromWatchlist(d.ticker)
                                  : userPortfolio.addToWatchlist(d.ticker)
                              }}
                              startIcon={inWatchlist ? <RemoveIcon/> : <AddIcon/>}
                            >
                              {inWatchlist ? 'Remove from Watchlist'  : 'Add to Watchlist'}
                            </Button>
                          : null
                        }
                      </div>
                      <div className="pick-indicator">
                        <Typography variant="body2">
                          <strong>{parseInt(Math.random()*100,10)}%</strong><span> Funded</span>
                        </Typography>
                      </div> */}
                    </CardContent>
                  </Card>
              </div>
            )
          })}
        </div>
        <style jsx>{`

          // #newest-picks :global(.MuiCard-root) {
          //   margin-bottom: 32px;
          // }

          .container:hover .item {
            transform: translateX(-25%);
          }

          .item:hover ~ .item {
            transform: translateX(25%);
          }

          .item:hover {
            transform: scale(1.5) !important;
          }

          #newest-picks :global(.MuiCardContent-root) {
            padding: 0;
          }

          .pick-text {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 16px;
            background: rgba(0,0,0,.75);
            color: #FFF;
          }

          .pick-indicator {
            position: absolute;
            top: 16px;
            right: 16px;
            padding: 6px 12px;
            background-color: #FBC43E;
            color: #000;
          }

          .pick-text :global(.MuiButton-outlined) {
            border-color: #FFF;
            color: #FFF;
          }

          .pick {
            max-width: 500px;
            max-height: 1200px;
            min-height: 500px;
            background-size: cover;
          }
        `}</style>
      </div >
    )
  }
}
