export default props => {
    const { movies } = props;
    return (
        <div className="container">
            <div className="title">
                More Like This
            </div>
            <div className="movies-container">
                {movies
                    .filter(movie => movie.verticalImg)
                    .slice(0, 12)
                    .map(movie => (
                        <img src={movie.verticalImg} style={{ width: "72px", height: "101px", padding: "2px 4px" }} />
                    ))}
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
                .movies-container {
                    margin-top: 20px;
                }
            `}</style>
        </div>
    )
}