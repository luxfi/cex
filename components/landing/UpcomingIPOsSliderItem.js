export default props => {
    const width = props.width || "166px"
    return (
        <div className="container">
            <div className="ipo-date-container">
                <div className="month-day-container">
                    <div className="day">
                        27
          </div>
                    <div className="month">
                        DEC
          </div>
                </div>
                <div className="year">
                    2019
        </div>
            </div>
            <img src={props.imgSrc} alt="slider-item" style={{ width: props.width }} />
            <div className="title">{props.title}</div>
            <div className="genre-rated">{`${props.genre} / ${props.rated}`}</div>
            <div className="links">
                <a href="#" className="link">Trailer</a>
                <a href="#" className="link">|</a>
                <a href="#" className="link">Official Website</a>
            </div>
            <a href="#" className="btn invert">Add to Watchlist</a>
            <style jsx>{`
                .container {
                    display: flex;
                    flex-direction: column;
                    width: 165px;
                }
                .ipo-date-container {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-end;
                    margin-bottom: 8px;
                }
                .month-day-container {
                  padding: 4px 8px;
                  background: #e8e2e2;
                  margin-bottom: 8px;
                }
                .year {
                  margin: 12px 8px;
                  font-size: 12px;
                  color: #959090;
                }
                .month {
                  font-size: 12px;
                  color: #6a5a5a;
                }
                .day {
                  font-size: 23px;
                  color: #4f5686;
                }
                .title {
                  color: #535353;
                  margin-top: 16px;
                  margin-bottom: 2px;
                }
                .genre-rated {
                  font-size: 10px;
                  color: #959090;
                  margin-top 2px;
                }
                .link {
                  font-size: 8pt;
                  padding-right: 10px;
                  color: #6da7ee;
                }
                img {
                    display: flex;
                    object-fit: cover;
                    height: 246px;
                    pointer-events: none;
                }
                .btn {
                  cursor: pointer;
                  text-decoration: none;
                  padding: 0.25rem 0.5rem;
                  margin: -0.25rem -0.5rem;
                  border-radius: 7px;
                  color: #ff911e;
                  background-color: transparent;
                  border: none;
                  font-size: inherit;
                  line-height: inherit;
                  transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
                  max-width: 30em;
                }
                .btn.invert {
                  margin: 0;
                  margin-top: 16px;
                  padding: 0 25px;
                  height: 36px;
                  line-height: 36px;
                  border-radius: 4px;
                  background-color: #2d92dd;
                  box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
                  color: white;
                }
                  `}</style>
        </div>
    )
}