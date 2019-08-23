class ChartEntry extends React.Component {


    render() {
        const fillHeight = Math.round(this.props.barHeight * this.props.fillPercent)
        return (    
            <div className="chart-entry">
                <div className="chart-entry-label">
                    {this.props.percentChange}
                </div>
                <div className="chart-entry-bar"/>
                <div className="chart-entry-image">
                    <img src={this.props.imgSrc} style={{width: "40px", height: "60px"}}/>
                </div>
                <style jsx>{`
                    .chart-entry {
                        display: flex;
                        margin: auto;
                        flex: 1;
                        flex-direction: column;
                        font-family: ‘BWHaasGroteskTF-55Roman-Web,sans-serif’, sans-serif;
                        justify-content: flex-end;
                        align-items: stretch;
                    }
                    .chart-entry-label {
                        margin: auto;
                        flex-grow: 1;
                    }
                    .chart-entry-image {
                        margin: auto;
                    }
                    .chart-entry-bar {
                        background: blue;
                        height: ${fillHeight}px;
                    }
                `}</style>
            </div>
        )
    }
}

export default ChartEntry