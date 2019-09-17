export default props => {
  // console.log('Row title', props)
  return (
    <div className="page-row">
      <div className="left box" />
      <div className="inner-row">
        <div className="top-container">
          <div className="title">{props.rowTitle || 'TITLE'}</div >
          <div className="filters">{props.filters}</div>
        </div>
        {props.children}
      </div>
      <div className="right box" />
      <style jsx>{`
            .title {
                color: #2d92dd;
                font-size: 35px;
                // margin: ${props.hideInnerPadding ? '0px 0px 14px 77px' : '10px 0px 14px 0px'};
                
            }

            .page-row {
                display: flex;
                flex: 1;
                height: auto;
                margin: 26px 0px;
            }

            .box {
                width: 200px;
                min-height: 100%;
                flex-shrink: 0;
                background-color: rgb(243, 243, 243, ${props.whiteGutter ? '0' : '1'});
            }

            .inner-row {
                display: relative;
                width: 100%;
                padding: ${props.hideInnerPadding ? 'inherit' : '0px 75px'};
                width: 1146px;
            }

            .filters {
                // margin: ${props.hideInnerPadding ? '0px 77px 14px 0px' : '10px 0px 14px 0px'};
                margin: 0px 0px 14px 0px;
                font-size: 14px;
            }

            .top-container {
                display: flex;
                justify-content: space-between;
            }
            `}</style>
    </div>
  )
}