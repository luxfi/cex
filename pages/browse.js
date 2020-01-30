import React from 'react'
import { inject, observer } from 'mobx-react'
import Router from 'next/router'
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Grid,
  Tabs,
  Tab,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import classNames from 'classnames'
import { googlePageView } from '../util/generic'

import { MovieSearchWidget } from '../components/app'
import { Facets } from '../components/browse'

import styles from '../styles/pages/browse.style.js'

const genreFacet = {
  name: 'genres',
  titleAll: 'All Genres',
  titleSome: 'Genre',
  values: {
    action: {
      key: 'Action',
      color: '#2676ee',
      gradient: 'linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)',
    },
    comedy: {
      key: 'Comedy',
      color: '#24c6ea',
      gradient: 'linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)',
    },
    documentary: {
      key: 'Documentary',
      color: '#47d4ba',
      gradient: 'linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)',
    },
    drama: {
      key: 'Drama',
      color: '#76dd7b',
      gradient: 'linear-gradient(90deg, #6bc959 0%, #80f09b 100%)',
    },
    romance: {
      key: 'Romance',
      color: '#f3913d',
      gradient: 'linear-gradient(90deg, #e77718 0%, #ffaa61 100%)',
    },
    scifi: {
      key: 'Sci-Fi',
      color: '#ef4343',
      gradient: 'linear-gradient(90deg, #e01717 0%, #fe7070 100%)',
    },
    thriller: {
      key: 'Thriller',
      color: '#ad4bc3',
      gradient: 'linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)',
    },
  }
} 

const studioFacet = {
  name: 'distributors',
  titleAll: 'All Distributors',
  titleSome: 'Distributor',
  values: {
    Netflix: {
      key: 'Netflix',
      ///color: '#2676ee',
      //gradient: 'linear-gradient(90deg, #015ce3 0%, #4a90f9 100%)',
    },
    Disney: {
      key: 'Disney',
      //color: '#24c6ea',
      //gradient: 'linear-gradient(90deg, #02b0d7 0%, #46dbfc 100%)',
    },
    Warner: {
      key: 'Warner',
      //color: '#47d4ba',
      //gradient: 'linear-gradient(90deg, #26c3ac 0%, #69e6c8 100%)',
    },
    Neon: {
      key: 'Neon',
      //color: '#76dd7b',
      //gradient: 'linear-gradient(90deg, #6bc959 0%, #80f09b 100%)',
    },
    Paramount: {
      key: 'Paramount',
      //color: '#f3913d',
      //gradient: 'linear-gradient(90deg, #e77718 0%, #ffaa61 100%)',
    },
    Stx: {
      key: 'Stx',
      //color: '#ef4343',
      //gradient: 'linear-gradient(90deg, #e01717 0%, #fe7070 100%)',
    },
    Lionsgate: {
      key: 'Lionsgate',
      //color: '#ad4bc3',
      //gradient: 'linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)',
    },
    Sony: {
      key: 'Sony',
      //color: '#ad4bc3',
      //gradient: 'linear-gradient(90deg,  #8c3b9e 0%, #cf5bea 100%)',
    },
  }
} 

@inject('store')
@observer
class Browse extends React.Component {

  constructor(props) {
    super(props)
    let currentTab = 0
    if ('newReleases' in props) {
      currentTab = 1
    }
    else if ('recommended' in props) {
      currentTab = 2
    }
    this.state = {
      tabIndex: currentTab,
      scrollTrigger: false
    }
  }

  componentDidMount = () => {
    this.props.store.movieStore.loadMovies() // safe call
    window.addEventListener('scroll', this.handleScroll);
    googlePageView()
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }  

  handleScroll = () => {
    this.setState({
      scrollTrigger: (window.pageYOffset > 0)
    })
  }

  setTabIndex = (i) => {
    this.setState({tabIndex: i})
  }

    // cannot use fat-arrow for render as it breaks mobx observing :)
  render() {
    const { classes, store } = this.props

    const movieStore = store.movieStore

      // https://material-ui.com/customization/components/
    const tabsClasses = {
      indicator: classes.tabIndicator,
    }
    const tabClasses = {
      root: classes.tabRoot,
      wrapper: classes.tabWrapper,
    }
  
    return (
      <Container maxWidth='xl'>
        <Toolbar className={classNames(
          classes.toolbar,
          this.state.scrollTrigger ? classes.solid : classes.transparent
        )}>
          <Tabs value={this.state.tabIndex} onChange={(ignore, i) => { this.setTabIndex(i) }} classes={tabsClasses}>
            <Tab label='Now Fundraising' disableRipple key='fundraising' classes={tabClasses}/>
            <Tab label='New Releases' disableRipple key='releases' classes={tabClasses}/>
            <Tab label='Your Recommended' disableRipple key='recommended' classes={tabClasses}/>
          </Tabs>
          <MovieSearchWidget placeholder='Search…' movies={movieStore.filteredMovies} className={classes.search}/>
          <Facets 
            movieStore={movieStore} 
            facetDescriptions={{
              genres: genreFacet, 
              distributors: studioFacet
            }} 
          />
        </Toolbar>
        <Grid container spacing={3} className={classes.main}>
        {movieStore.filteredMovies.map((m, i) => (
          <Grid xs={12} sm={6} md={3} lg={2} item key={m.imdbid + i}>
            <Card className={classes.card} onClick={() => {Router.push(`/film/${m.movieSlug}`)}}>
              <CardMedia src={m.posterImg} className={classes.cardMedia} component='img'/>
              <CardContent className={classes.cardContent}>
                <Typography variant="body2">Name: <span className={classes.stat}>{m.name}</span></Typography>
                <Typography variant="body1">Ticker: <span className={classes.stat}>{m.ticker}</span></Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        </Grid>
      </Container>
    )
  }
}

export default withStyles(styles)(Browse)
