import "../assets/styles/base.css"
import 'react-multi-carousel/lib/styles.css'
import ChartEntry from "./ChartEntry"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis'

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
    },
};

class Chart extends React.Component {

        render() {
        var chartWidth = 1440 // this will need to be set by something else ultimately but for right now whatever

        var chartHeight = 300 // probably same deal, should be dynamic

        const widthDelta = chartWidth / 16 // again, will need to set this dynamically with the count of displayed movies, but good enough for now
        const barGutter = widthDelta / 16 // same as above, dependent on number of movies displayed (full number + 1)
        // console.log("The first title: ", props.movieStore.movies && props.movieStore.movies[0].title)

        const entries = []

        var index = 0
        this.props.movieStore.movies.forEach(entry => {
            const { title, price, change, percentChange, symbol } = entry
            entries.push({x: (barGutter + (widthDelta * index)), y: price})
            index++
        })
        
        return (
            <div>
                <div className="top-gainers-chart">
                <XYPlot
                    xType="ordinal"
                    width={chartWidth}
                    height={chartHeight}
                    yDomain={[0,chartHeight]}>
                    <HorizontalGridLines />
                    <VerticalBarSeries
                        data={entries.slice(0,14)}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
                </div>

                <style jsx>{`
                `}</style>
            </div>
        )
    }
}

export default Chart