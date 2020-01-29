const useStyles = makeStyles ((theme) => (

{
  gridContainer: {
    maxWidth: theme.breakpoints.lg,
    width: '100%',
    height: '100%',
    padding: `${theme.spacing(3)}px ${theme.spacing(8)}px 150px`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(4)}px 150px`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)}px ${theme.spacing(3)}px 150px`,
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1800,
      margin: '0 auto',
    },
  },
  buttonGridContainer: {
    [theme.breakpoints.down('sm')]: {
      '& > *': {
        width: '100%',
      },
      '& button': {
        width: '100%',
      },
    },
  },
  investButton: {
    color: theme.palette.common.black,
    backgroundColor: '#FBC43E',
    padding: '12px 24px',
  },
  watchTrailerButton: {
    color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.white}`,
    padding: '11px 24px',
  },
  watchTrailerButtonText: {
    color: 'inherit !important',
  },
}
))



export default (props) => {

  const classes = useStyles()
  
  return (
    <Grid
    container
    direction='row'
    justify='flex-start'
    alignItems='flex-end'
    className={classes.gridContainer}
    >
      <Grid justify='flex-start' container item xs={12} sm={6} md={6} style={{ textAlign: 'left' }} >
        <Grid item xs>
          <Box lineHeight={1} letterSpacing={2}>
            <Typography className='esx-initial-offering' variant='h5'>
              <Box fontWeight='bold' fontSize={24}>
                ESX
            </Box>
              <Box fontWeight={100} fontSize={20}>
                INITIAL OFFERING
            </Box>
            </Typography>
            <br />
            {movieExtendedMap[movie.movieSlug].logo}
            <br />
            <br />
            <Typography variant='body2'>
              {movie.shortDescription}
            </Typography>
            <br />
          </Box>
        </Grid>
        <br />
        <Grid container item spacing={2} justify='flex-start' className={classes.buttonGridContainer}>
          <Grid item>
            <TrailerModal
              movie={movie}
              buttonClass={classes.watchTrailerButton}
            />
          </Grid>
          <Grid item>
            <Button
              className={classes.investButton}
              size='large'
              startIcon={<MonetizationOnIcon />}
            >
              <NextLink href={hrefLink}>
                <Typography variant='body2' className={classes.watchTrailerButtonText}>
                  INVEST IN {movie.name}
                </Typography>
              </NextLink>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
 
}


