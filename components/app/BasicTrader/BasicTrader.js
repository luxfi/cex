import {
    BuySellForm,
    ChartCandlestickFake,
    ChartLineSeries,
    StockChart
} from "../"
import { toJS } from "mobx"
import {
    Grid,
    Typography,
    Paper,
    Button,
    Box,
    TextField
} from "@material-ui/core"
import { makeStyles, createStyles } from "@material-ui/styles"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        margin: "auto",
        maxWidth: 500
    },
    reviewButton: {
        color: "#000",
        backgroundColor: "#FBC43E",
        padding: "12px 24px"
    },
    reviewButtonText: {
        color: "#000"
    }
}))

export default props => {
    const {
        chartData,
        yDomain,
        updatePrintInterval,
        activeChart,
        createOrder,
        buyOrders,
        sellOrders,
        orderBook,
        ticker,
        movieCategories,
        onExecute,
        maxSell,
        setActiveChart,
        setMarketOrderType,
        marketOrderType,
        funds,
        stockName,
        accountBalance
    } = props
    const stock = toJS(orderBook.stock)
    let { connected } = orderBook
    const classes = useStyles()
    const bull = <span className={classes.bullet}>•</span>
    return (
        <>
            <Grid justify="center" container spacing={8}>
                <Grid item xs={12} lg={7}>
                    <StockChart
                        stock={stock}
                        stockName={stockName}
                        connected={connected}
                    />
                </Grid>
                <Grid
                    container
                    direction="column"
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    xs={12}
                    spacing={5}
                >
                    <div className={classes.root}>
                        <Paper className={classes.paper}>
                            <Grid
                                container
                                direction="column"
                                justify="space-between"
                                spacing={3}
                            >
                                <Grid item>
                                    <Typography variant="h5">
                                        Buy SAW9
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    container
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid item xs={6}>
                                        <Typography>Shares</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            required
                                            id="shares"
                                            name="shares"
                                            fullWidth
                                            placeholder="$0.00"
                                            autoComplete="shares"
                                            // onChange={evt =>
                                            //     setValue(
                                            //         evt.target.name,
                                            //         evt.target.value
                                            //     )
                                            // }
                                            margin="normal"
                                            variant="outlined"
                                            inputProps={{
                                                style: { textAlign: "right" }
                                            }}
                                            margin="dense"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container justify="space-between">
                                    <Grid item xs={6}>
                                        <Typography>Market Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <Box textAlign="right">$262.05</Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container justify="space-between">
                                    <Grid item xs={6}>
                                        <Typography>Estimated Cost</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <Box textAlign="right">$0.00</Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Button
                                        className={classes.reviewButton}
                                        fullWidth
                                    >
                                        <Typography
                                            variant="body2"
                                            className={classes.reviewButtonText}
                                        >
                                            Review Order
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>
                                        $0.00 Buying Power Available
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                        <Box mt={3}>
                            <Button className={``} variant="outlined" fullWidth>
                                <Typography variant="body2">
                                    Buy Tickets
                                </Typography>
                            </Button>
                        </Box>
                        <Box mt={3} justifyContent="center" display="flex">
                            <Typography variant="body2">
                                Add to Watchlist
                            </Typography>
                        </Box>
                    </div>
                </Grid>
                {/* hide buy sell until there is a design for it */}
                {/* <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="green"
            buttonText="BUY"
            orderType="bid"
            ticker={ticker}
            createOrder={createOrder}
            orders={buyOrders}
            orderBook={orderBook}
            onExecute={onExecute}
            movieCategories={movieCategories}
            marketOrderType={marketOrderType}
            funds={funds}
            connected={connected}
            accountBalance={accountBalance}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <BuySellForm
            buttonColor="red"
            buttonText="SELL"
            orderType="ask"
            ticker={ticker}
            orders={sellOrders}
            orderBook={orderBook}
            createOrder={createOrder}
            onExecute={onExecute}
            movieCategories={movieCategories}
            maxSell={maxSell}
            marketOrderType={marketOrderType}
            funds={funds}
            accountBalance={accountBalance}
          />
        </Grid> */}
            </Grid>
            <style jsx>{`
                .title {
                    color: #2d92dd
                    font-size: 32px
                    margin-top: 30px
                    font-weight: lighter
                }
                .posts-container {
                    margin-top: 20px
                    fill: transparent
                }
                .divider {
                    margin-left: 20px
                    margin-right: 20px
                }
            `}</style>
        </>
    );
}
