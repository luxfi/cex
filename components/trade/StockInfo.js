export default props => {
  const madMaxMovie = props.movies.find(movie => movie.Imdbid === "tt1392190")
  return (

    <div className="stock-info">
      <img src={madMaxMovie.verticalImg} alt="poster" style={{ width: "77px", height: "112px", padding: "20px 0px" }} />
      <div className="container">
        <div className="links-2">
          <a href="#" className="link">Offical Website</a>
          <a href="#" className="link">|</a>
          <a href="#" className="link">Trailer 1</a>
          <a href="#" className="link">|</a>
          <a href="#" className="link">Trailer 2</a>
        </div>
        <div className="tables">
          <table className="noborder">
            <tbody>
              <tr><td>Symbol:</td><td className="dark">MDMX2</td></tr>
              <tr><td>Status:</td><td className="dark">Active</td></tr>
              <tr><td>IPO Date:</td><td className="dark">Dec 12, 2016</td></tr>
              <tr><td>MPAA Rating:</td><td className="dark">PG-13</td></tr>
            </tbody>
          </table>
          <table className="noborder">
            <tbody>
              <tr><td>Symbol:</td><td className="dark">MDMX2</td></tr>
              <tr><td>Status:</td><td className="dark">Active</td></tr>
              <tr><td>IPO Date:</td><td className="dark">Dec 12, 2016</td></tr>
              <tr><td>MPAA Rating:</td><td className="dark">PG-13</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
                .stock-info {
                    display: flex;
                }
                .container {
                    padding: 20px;
                    width: 576px;
                }
                p {
                    padding: 0px;
                    margin: 0px;
                    margin-top: 16px;
                }
                .link {
                    font-size: 11pt;
                    padding-right: 10px;
                    color: #6da7ee;
                }
                .btn.invert {
                    margin: 0;
                    padding: 0 48px;
                    height: 48px;
                    line-height: 48px;
                    border-radius: 4px;
                    background-color: #ff911e;
                    color: white;
                    margin: 8px 16px 16px 0px;
                }
                .btn.invert.blue {
                    background-color: rgb(60, 153, 247);
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
                .info-1 {
                    padding-bottom: 8px;
                    margin-top: 20px;
                } 
                .tables {
                    padding-top: 8px;
                    display: flex;
                    justify-content: space-between;
                }     
                td {
                    padding-right: 20px;
                    padding-bottom: 4px;
                }  
            `}</style>
    </div >
  )
}