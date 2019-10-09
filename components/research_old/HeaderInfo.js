import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'

export default props => {
  return (

    <div className="info-container">
      <h2 className="title dark" style={{ fontSize: "40px", margin: "20px 0px 4px 0px" }}>
        Mad Max: Fury Road
            </h2>
      <p className="price" style={{ fontSize: "16px", margin: "4px 0px 4px 0px" }}>
        $12.50
            </p>
      <p className="change" style={{ fontSize: "27px", margin: "0px" }}>
        <FontAwesomeIcon icon={faArrowUp} style={{ width: '18px', paddingRight: "8px" }} />
        $0.80 (7.0%)
            </p>
      <style jsx>{`
                .info-container {
                    display: flex;
                    flex-direction: column;
                }
                .change {
                    color: #0dc109;
                    margin-top: 2px;
                }
            `}</style>
    </div >
  )
}