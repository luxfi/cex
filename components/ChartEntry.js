class ChartEntry extends React.Component {

    render() {
        const fillPercent = this.props.maxChange / this.props.percentChange
        const fillHeight = Math.round(this.props.height * fillPercent)
        return (
            <div className="chart-entry" style={{width: (this.props.width + "px"), height: (this.props.height + "px")}}>
                <div className="chart-entry-bar">
                    <div className="chart-entry-bar-fill" style={{height: (fillHeight + "px")}}>
                    </div>
                </div>
                <div className="chart-entry-label">
                    {this.props.percentChange}
                </div>
                <div className="chart-entry-x-axis">
                    <img src={this.props.imgSrc} style={{width: "40px", height: "60px"}}/>
                </div>
                <div className="chart-entry-gutter" style={{width: (this.props.gutter + "px")}}/>
                <style jsx>{`
                    .chart-entry {
                        display: flex;
                        margin: auto;
                        font-family: ‘BWHaasGroteskTF-55Roman-Web,sans-serif’, sans-serif;
                    }
                    .chart-entry-bar {
                        background: white;
                    }
                    .chart-entry-bar-fill {
                        background: blue;
                    }
                `}</style>
            </div>
        )
    }
}

export default ChartEntry