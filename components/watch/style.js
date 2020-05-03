import {
  container,
  flexCenteredColumn,
  flexCenteredRow,
} from '../../styles/esxStyles'

const YELLOW = '#FBC43E'
const GREY = '#808080'
const maxLines = {
  overflow: 'hidden',
  display: '-webkit-box',
  boxOrient: 'vertical',
  textOverflow: 'ellipsis',
  whiteSpace: 'normal',
  lineClamp: 2,
}

export default (theme) => ({
  flexCenteredRow: {
    ...flexCenteredRow,
  },

  flexCenteredColumn: {
    ...flexCenteredColumn,
  },

  aTag: {
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      color: YELLOW,
    },
  },

  container: {
    ...container,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
  },

  outermost: {
    paddingTop: 64,
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 32,
  },

  breadcrumbRow: {
    marginBottom: '30px',
  },

  watchGrid: {
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 2),
    },
    paddingTop: 12,
    '& .video': {
      width: '100%',
      '& .video-player': {
        minHeight: 480,
        width: '100%',
        height: 'auto',
        [theme.breakpoints.down(960)]: {
          minHeight: 400,
        },
        [theme.breakpoints.down(768)]: {
          minHeight: 350,
        },
        [theme.breakpoints.down(480)]: {
          minHeight: 300,
        },
        [theme.breakpoints.down(375)]: {
          minHeight: 250,
        },
      },
    },
  },

  videoContainer: {
    position: 'relative',
    width: '100%',
    flex: 1,
    '& .video': {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },

  deskTopShowNextSection: {
    [theme.breakpoints.down(960)]: {
      display: 'none',
    },
  },

  mobileShowNextSection: {
    display: 'none',

    [theme.breakpoints.down(960)]: {
      display: 'block',
    },
  },

  videoList: {
    maxHeight: '100%',
    overflowY: 'scroll',
    overflowX: 'hidden',
  
    '& > a': {
      lineHeight: 1,
      textDecoration: 'none',
      color: GREY,
    },
    [theme.breakpoints.down(960)]: {
      maxHeight: 500,
    },
  },

  imageWrapper: {
    position: 'relative',
    padding: 0,
  },

  movieInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down(480)]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },

  movieInfo: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  videoInfoBox: {
    alignItems: 'center',
    '& .video-description': {
      marginTop: 25,
      maxWidth: 615,
      fontSize: 13,
      lineHeight: '16px',
      '& .collapsed': {
        maxHeight: 32,
        overflowY: 'hidden',
      },
      '& .expanded': {
        maxHeight: 'none',
      },
    },
  },

  videoStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: GREY,
    margin: '0 0 15px 0',
  },

  likeButton: {
    background: 'none',
    color: '#fff',
    '&:hover': {
      background: 'none',
      color: YELLOW,
    },
  },

  likeUnderline: {
    position: 'relative',
    display: 'block',
  },
  iconButton: {
    padding: 5,
    borderRadius: 8,
    '&:hover': {
      color: YELLOW,
    },
  },

  videoInfoImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    marginRight: 14,
  },

  videoPubDate: {
    fontSize: 12,
    color: GREY,
  },

  channelName: {
    fontSize: 14,
  },

  subShare: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
    [theme.breakpoints.up(480)]: {
      justifyContent: 'flex-end',
      marginTop: 0,
    }
  },

  subScribeButton: {
    background: YELLOW,
    padding: '7px 15px',
  },

  subScribeButtonText: {
    color: '#000',
    fontSize: 12,
  },

  topNav: {
    margin: '20px 0 0 0',
  },

  linkBackButton: {
    background: YELLOW,
  },

  linkBackButtonText: {
    fontSize: 12,
    color: '#000',
  },

  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    }
  },
  
  buttonContainer: {
    marginRight: 5,
  },

  linkBackLink: {
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  recommendedTitle: {
    margin: '16px 0',
  },

  upNextTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0 0 10px 0',
    '& .title': {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
  },

  upNextToggle: {
    display: 'flex',
    alignItems: 'center',
  },

  movieImage: {
    maxWidth: '100%',
  },

  playTime: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    margin: 5,
    padding: '0px 5px',
    background: '#000',
    opacity: '0.85',
    color: '#fff',
    '& span': {
      fontSize: 12,
      fontWeight: 'normal',
    },
  },

  sidebarMovieTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: '18px',
    maxHeight: 36,
    margin: '0 0 5px 0',
  },

  maxTwoLines: {
    ...maxLines,
    lineClamp: 2,
  },

  singleLine: {
    ...maxLines,
    lineClamp: 1,
  },

  sidebarVideoMeta: {
    '& > p': {
      fontSize: 14,
      lineHeight: '20px',
    },
    '& > p.views-and-time': {
      fontSize: 12,
    },
  },
})
