export default props => {
    return (
        <div className="slider">
            <div className="container">
                <div className="item">1</div>
                <div className="item">2</div>
                <div className="item">3</div>
                <div className="item">4</div>
                <div className="item">5</div>
            </div>
            <style jsx>{`
                .slider {
                    position: absolute;
                }
            `}</style>
        </div>
    )
}