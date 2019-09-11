import thumb from '../../assets/images/research/thumb.png'

export default props => {
  const { movies } = props;
  return (
    <div className="container">
      <div className="title">
        Forecasts
            </div>
      <p className="sub-title">
        OCT 15, 2018
            </p>
      <div className="forecasts-container">
        <p>
          <img src={thumb} className="thumb" />

          Lorem ipsum dolor sit amet consectetur adipiscing elit dis, rutrum purus torquent leo odio euismod inceptos, ut tincidunt turpis congue netus et donec. Pretium eleifend mauris nisl condimentum placerat, commodo montes diam potenti, bibendum nisi tellus quis. Enim integer nascetur dapibus risus class ullamcorper fames tortor, donec tincidunt rhoncus cursus erat ac tempus, quis senectus diam dictum luctus a lobortis.
                </p>
        <p>
          Eu facilisi magnis sem fusce sociis varius tellus rutrum curabitur imperdiet, vehicula lectus aliquam ultricies nibh mi nisi luctus ridiculus scelerisque eget, consequat in pretium egestas iaculis faucibus vivamus commodo mauris. Conubia curae dictumst nec dui sollicitudin molestie lacinia enim purus, risus praesent vivamus mattis sociosqu habitasse augue sagittis. Suscipit non tylus nuemenous da bestus vulputate fusce ornare nec sagittis.
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
                    padding-right: 20px;
                }
                .sub-title {
                    margin: 20px 0px 0px;
                }
                .thumb {
                    width: 100px;
                    margin-left: -28px;
                    float: left;
                    padding-right: 16px;
                }
            `}</style>
    </div>
  )
}