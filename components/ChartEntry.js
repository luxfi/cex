export default props => {
    
    const fillHeight = Math.round(props.barHeight * props.fillPercent)

    return (
        <div className="chart-entry">
            <div style={{flexGrow: 1}} />
            <div className="chart-entry-label">
                +{(props.percentChange * 100).toFixed(2)}%
            </div>
            <div className="chart-entry-bar"/>
            <div className="chart-entry-image">
                <img src={props.imgSrc} style={{width: "45px", height: "60px"}}/>
            </div>
            <style jsx>{`
                .chart-entry {
                    display: flex;
                    width: 45px;
                    max-width: 45px;
                    flex: 1;
                    flex-direction: column;
                    height: 400px;
                }
                .chart-entry-label {
                    text-align: center;
                    margin-bottom: 5px;
                    color: rgb(78, 175, 100);
                }
                .chart-entry-image {
                    margin: auto;
                }
                .chart-entry-bar {
                    background: rgb(207, 224, 239);
                    height: ${fillHeight}px;
                    margin-bottom: 5px;
                }
            `}</style>
        </div>
    )
}