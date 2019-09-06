import chartPlaceHolder from '../../assets/images/research/chart.png'

export default props => {
    const { movies } = props;
    return (
        <div className="container">
            <div className="title">
                Trade This Stock
            </div>
            <div className="posts-container">

                <img src={chartPlaceHolder} style={{ width: "906px" }} />
            </div>

            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                }
                .title {
                    color: #2d92dd;
                    font-size: 32px;
                    margin-top: 30px;
                    font-weight: lighter;

        
                }
                .posts-container {
                    margin-top: 20px;
                }
            `}</style>
        </div>
    )
}