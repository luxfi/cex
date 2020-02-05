import {
    container,
    title,
    flexCenteredRow,
    flexCenteredColumn,
  } from "../../styles/esxStyles.js"

  const YELLOW = '#FBC43E';
  const GREY = '#808080';
  
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
      paddingTop: 64,
      paddingLeft: 32,
      paddingRight: 32,
      paddingBottom: 32,
    },
  
    breadcrumbRow: {
      marginBottom: "30px"
    },

    watchGrid: {
      display: 'grid',
      gridTemplate: 'auto auto auto 1fr/minmax(0,1280px) 410px',
      justifyContent: 'center',
      paddingTop: 24,
      columnGap: 24,
      gridColumnGap: 20,
      '& .video': {
        gridColumn: '1/2',
        gridRow: '1/2',
        '& .video-player': {
          minHeight: 480,
          width: '100%',
          height: '100%',
        }
      },
      '& .videoInfoBox': {
        gridColumn: '1/2',
        gridRow: '3/4',
      }
    },

    videoContainer: {
      position: 'relative',
      width: '100%',
      '& .video': {
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }
    },

    videoInfoBox: {
      display: 'grid',
      grid: 'auto auto/58px auto max-content',
      alignItems: 'center',
      gridRowGap: 10,
      gridColumn: '1/2',
      gridRow: '3/4',
      '& .video-description': {
        maxWidth: 615,
        gridRow: '2/3',
        gridColumn: '2/3',
        '& .collapsed': {
          maxHeight: '3.6rem',
          overflowY: 'hidden',
        },
        '& .expanded': {
          maxHeight: 'none',
        }
      },
    },

    videoActions: {
      '& > :not(:last-child)': {
        marginRight: 8,
      }
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
      }
    },

    shareButton: {
      background: '#fff',
      '&:hover': {
        background: YELLOW,
      }
    },

    iconButton: {
      padding: 5,
      borderRadius: 8,
      '&:hover': {
        color: YELLOW,
      }
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

    relatedVideos: {
      gridColumn: '2/3',
      gridRow: '1/span 4',
    }
  
  })
  
  
  