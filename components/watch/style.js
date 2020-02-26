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
    display: 'grid',
    gridTemplate: 'auto auto auto 1fr/minmax(0,1280px) 410px',
    justifyContent: 'center',
    paddingTop: 12,
    columnGap: 24,
    gridColumnGap: 20,
    '& .video': {
      gridColumn: '1/2',
      gridRow: '1/2',
      '& .video-player': {
        minHeight: 480,
        width: '100%',
        height: '100%',
      },
    },
    '& .videoInfoBox': {
      gridColumn: '1/2',
      gridRow: '3/4',
    },
  },

  videoContainer: {
    position: 'relative',
    width: '100%',
    '& .video': {
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  },

  videoInfoBox: {
    display: 'grid',
    grid: 'auto auto/60px auto max-content',
    alignItems: 'center',
    gridRowGap: 10,
    gridColumn: '1/2',
    gridRow: '3/4',
    '& .video-description': {
      maxWidth: 615,
      gridRow: '2/3',
      gridColumn: '2/3',
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

  videoActions: {
    '& > :not(:last-child)': {
      marginRight: 8,
    },
  },

  rating: {
    display: 'inline-grid',
    grid: 'auto auto/max-content max-content',
    gridColumnGap: 16,
    columnGap: 16,
    gridRowGap: 4,
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
    gridColumn: '1/span 2',
    gridRow: '2/3',
  },

  shareButton: {
    background: '#fff',
    '&:hover': {
      background: YELLOW,
    },
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
    gridRow: '1/2',
    gridColumn: '1/2',
  },

  videoInfo: {
    gridRow: '1/2',
    gridColumn: '2/3',
  },

  videoPubDate: {
    fontSize: 12,
    color: GREY,
  },

  channelName: {
    fontSize: 14,
  },

  subShare: {
    '& > :not(:last-child)': {
      marginRight: 10,
    },
  },

  subScribeButton: {
    gridRow: '1/2',
    gridColumn: '3/4',
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

  linkBackLink: {
    textDecoration: 'none',
  },

  relatedVideos: {
    gridColumn: '2/3',
    gridRow: '1/span 4',
    '& > a': {
      lineHeight: 1,
      textDecoration: 'none',
      color: GREY,
    },
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

  singleVideo: {
    display: 'grid',
    grid: 'auto/210px auto',
    gridColumnGap: 10,
    margin: '10px 0 0 0',
  },

  imageWrapper: {
    position: 'relative',
    gridRow: '1/2',
    gridColumn: '1/2',
    '& img': {
      maxWidth: '100%',
    },
  },

  sidebarVideoInfo: {
    gridRow: '1/2',
    gridColumn: '2/3',
  },

  playTime: {
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    fontSize: 13,
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
