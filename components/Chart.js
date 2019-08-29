import "../assets/styles/base.css"
import 'react-multi-carousel/lib/styles.css'
import ChartEntry from "./ChartEntry"

class Chart extends React.Component {

        render() {
        const chartWidth = 1024 // this will need to be set by something else ultimately but for right now whatever

        const chartHeight = 300 // probably same deal, should be dynamic
        const barHeight = 275 // maybe same deal, maybe should be dynamic

        const widthDelta = chartWidth / 16 // again, will need to set this dynamically with the count of displayed movies, but good enough for now
        const barGutter = widthDelta / 16 // same as above, dependent on number of movies displayed (full number + 1)
        const maxChange = this.props.topMovies[0].percentChange
        const chartItems = []

        this.props.topMovies.forEach((chartItem, k) => {
            chartItems.unshift(<ChartEntry
                key={k}
                barHeight={barHeight}
                width={widthDelta}
                gutter={barGutter}
                imgSrc={chartItem.verticalImg}
                percentChange={chartItem.percentChange}
                fillPercent={chartItem.percentChange/maxChange}
            />)
        })

        return (
            <div className="chart-container">
                <div className="top-gainers-chart">
                    {chartItems}
                </div>
                <style jsx>{`
                    .chart-container {
                        display: flex;
                        width: 100%;
                    }

                    .top-gainers-chart {
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                    }
                `}</style>
            </div>
        )
    }
}

export default Chart