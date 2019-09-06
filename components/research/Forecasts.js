import postPlaceHolder from '../../assets/images/research/posts.png'

export default props => {
    const { movies } = props;
    return (
        <div className="container">
            <div className="title">
                Forecasts
            </div>
            <div className="forecasts-container">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dolor sed viverra ipsum nunc aliquet bibendum enim. In massa tempor nec feugiat. Nunc aliquet bibendum enim facilisis gravida. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Amet luctus venenatis lectus magna fringilla. Volutpat maecenas volutpat blandit aliquam etiam erat velit scelerisque in. Egestas egestas fringilla phasellus faucibus scelerisque eleifend. Sagittis orci a scelerisque purus semper eget duis. Nulla pharetra diam sit amet nisl suscipit. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Fusce ut placerat orci nulla. Pharetra vel turpis nunc eget lorem dolor. Tristique senectus et netus et malesuada.
                </p>

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
                .forecasts-container {
                    margin-top: 20px;
                    padding-right: 20px;
                }
            `}</style>
        </div>
    )
}