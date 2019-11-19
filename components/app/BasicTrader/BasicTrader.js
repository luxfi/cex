import { StockChart } from "../"
import { toJS } from "mobx"
import {
    Grid,
    Typography,
    Paper,
    Button,
    Box,
    TextField,
    Divider,
    CssBaseline
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
import { makeStyles, createStyles } from "@material-ui/styles"
import { AboutSection } from "../../trade"

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

const financialMetrics = [
    {
        name: "Market Cap",
        value: "1.17T"
    },
    {
        name: "Price-Earnings Ratio ",
        value: "22.12"
    },
    {
        name: "Dividend Yield",
        value: "1.37"
    },
    {
        name: "Average Volume",
        value: "26.15M"
    },
    {
        name: "High Today",
        value: "$263.79"
    },
    {
        name: "Low Today",
        value: "$260.93"
    },
    {
        name: "Open Prixe",
        value: "$261.64"
    },
    {
        name: "Volume",
        value: "26.15M"
    },
    {
        name: "52 Week High",
        value: "$262.76"
    },
    {
        name: "52 Week Low",
        value: "$140.00"
    }
]

const FinancialsSection = () => {
    return (
        <Box mb={3} mt={3}>
            <Grid justify="flex-start" container spacing={4}>
                {financialMetrics.map((metric, i) => (
                    <Grid key={i} item xs={6} lg={3} md={3} sm={4}>
                        <Box fontWeight="fontWeightBold">
                            <Typography>{metric.name}</Typography>
                        </Box>
                        <Typography>{metric.value}</Typography>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

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
    window.orderBook = orderBook
    return (
        <>
            <Grid justify="center" container spacing={4}>
                <Grid item xs={12} lg={7}>
                    {orderBook.isReady ? (
                        <StockChart
                            stock={stock}
                            stockName={stockName}
                            connected={connected}
                        />
                    ) : (
                        <React.Fragment>
                            <Skeleton width="25%" />
                            <Skeleton height={32} width="15%" />
                            <Skeleton variant="rect" height={300} />
                        </React.Fragment>
                    )}
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} spacing={5}>
                    <Grid container direction="column">
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
                                                placeholder="0"
                                                autoComplete="shares"
                                                // onChange={evt =>
                                                //     setValue(
                                                //         evt.target.name,
                                                //         evt.target.value
                                                //     )
                                                // }
                                                variant="outlined"
                                                inputProps={{
                                                    style: {
                                                        textAlign: "right"
                                                    }
                                                }}
                                                margin="dense"
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justify="space-between"
                                    >
                                        <Grid item xs={6}>
                                            <Typography>
                                                Market Price
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box textAlign="right">
                                                <Typography>$262.05</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid
                                        item
                                        container
                                        justify="space-between"
                                    >
                                        <Grid item xs={6}>
                                            <Typography>
                                                Estimated Cost
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Box textAlign="right">
                                                <Typography>$0.00</Typography>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            className={classes.reviewButton}
                                            fullWidth
                                        >
                                            <Typography
                                                variant="body2"
                                                className={
                                                    classes.reviewButtonText
                                                }
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
                                <Button
                                    className={``}
                                    variant="outlined"
                                    fullWidth
                                >
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
                </Grid>
            </Grid>
            <Grid justify="center" container spacing={4}>
                <Grid item xs={12} lg={7}>
                    <AboutSection />
                    <Divider />
                    <FinancialsSection />
                </Grid>
                <Grid item lg={3} md={4} sm={6} xs={12} />
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
        </>
    );
}
