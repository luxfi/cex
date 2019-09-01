
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

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
      <div className="price">$5.55</div>
      <div className="info">
        <span className="change">
          <FontAwesomeIcon icon={faArrowUp} style={{ width: '12px', paddingRight: "5px" }} />
          $1 (8.7%)
                </span>
        <a href="#" className="btn invert">Trade</a>
      </div>
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
                img {
                    display: flex;
                    object-fit: cover;
                    height: 246px;
                }
                .info {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 2px;
                }
                .price {
                    font-size: 12px;
                    color: #a2a1a1;
                    margin-top: 8px;
                }
                .change {
                    color: #0dc109;
                }
                .arrow-up {
                    height: 14px;
                    padding: 0px 4px;
                }
                .btn.invert {
                    margin: 0;
                    padding: 0 6px;
                    height: 20px;
                    line-height: 20px;
                    border-radius: 2px;
                    background-color: #ff911e;
                    // box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
                    color: white;
                    margin: -3px 7px 0px 0px;;
                }
                .btn {
                    display: inline-block;
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
                }
                .btn.trade{
                    font-size: 9px;
                }
            `}</style>
    </div>
  )
}