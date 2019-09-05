import TradeButton from '../generic/TradeButton.js'
import Pagination from "../generic/Pagination"
import React, { useState } from 'react';
import chart from '../../assets/images/chart.png'


const Row = (props) => {
    const { percentChange } = props;
    const formatedpercentChange = parseFloat(percentChange * 100).toFixed(2) + "%"
    return (
        <tr>
            <td className="table-cell left" scope="row">
                <div className="container">
                    <img src={props.imgSrc} alt="slider-item" style={{ width: "52px" }} />
                    <div className="right">
                        <div className="title">{props.title}</div>
                        <div className="genre-rated">{`${props.genre.split(",")[0]} / ${props.rated}`}</div>
                        <div className="links">
                            <a href="#" className="link">Trailer</a>
                            <a href="#" className="link">|</a>
                            <a href="#" className="link">Official Website</a>
                        </div>
                    </div>

                </div>
            </td>
            <td className="table-cell symbol left" >{props.symbol || "SMBL"}</td>
            <td className="table-cell price left" >${props.price || "$1.11"}</td>
            <td className={`table-cell percent-change left ${
                props.percentChange > 0 ? "green" : "red"
                }`} >
                {formatedpercentChange || "1.1%"}
            </td>
            <td className="table-cell market-cap left" >{props.marketCap || "$111"}</td>
            <td className="table-cell chart left" >{
                props.chart || <img src={chart} alt="chart" height='40px' />

            }</td>
            <td className="table-cell left" ><TradeButton /></td>
            <style jsx>{`
                .table-cell {
                    display: table-cell;
                    padding: 14px 40px 14px 16px;
                    font-size: 0.875rem;
                    text-align: left;
                    font-weight: 400;
                    line-height: 1.43;
                    border-bottom: 1px solid rgba(224, 224, 224, 1);
                    letter-spacing: 0.01071em;
                    color: rgba(0, 0, 0, 0.54);
                }
                .link {
                  font-size: 8pt;
                  padding-right: 10px;
                  color: #6da7ee;
                }
                .container {
                    display: flex;
                }
                .right {
                    padding-left: 12px;
                }
                .title {
                  color: #535353;
                  font-size: 15px;
                }
                .genre-rated {
                  font-size: 10px;
                  color: #959090;
                  margin-top 2px;
                }
                .symbol {
                    color: rgba(0, 0, 0, 0.67);
                    text-decoration: underline;
                }
                .green {
                    color: #0dc109;
                }
                .red {
                    color: rgb(205, 135, 137);
                }
            `}</style>
        </tr>
    )
}



export default ({ movies }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const handlePageChange = (page, e) => {
        setCurrentPage(page)
    }

    const limit = 6
    const pageCount = 3
    const total = movies.length

    return (
        <div className="container">
            < table className="table" >
                <thead>
                    <tr>
                        <th className="table-cell head left" scope="col">Name</th>
                        <th className="table-cell head left" scope="col">Symbol</th>
                        <th className="table-cell head left" scope="col">Price</th>
                        <th className="table-cell head left" scope="col">Change</th>
                        <th className="table-cell head left" scope="col">Market Cap</th>
                        <th className="table-cell head left" scope="col">Chart</th>
                        <th className="table-cell head left" scope="col">Trade</th>
                    </tr>
                </thead>
                <tbody>
                    {movies
                        .slice(currentPage - 1, currentPage - 1 + limit)
                        .map((movie, index) => {
                            const {
                                title,
                                symbol,
                                price,
                                percentChange,
                                marketCap,
                                chart,
                                genre,
                                rated,
                                verticalImg
                            } = movie
                            return (
                                <Row
                                    title={title}
                                    symbol={symbol}
                                    price={price}
                                    percentChange={percentChange}
                                    marketCap={marketCap}
                                    chart={chart}
                                    genre={genre}
                                    rated={rated}
                                    key={index}
                                    imgSrc={verticalImg}
                                />
                            )
                        }
                        )}
                </tbody>
            </table>
            <div className='pagination-container'>
                <div className='pagination-item'>
                    <Pagination
                        total={total}
                        limit={limit}
                        pageCount={pageCount}
                        currentPage={currentPage}
                    >
                        {({
                            pages,
                            currentPage,
                            hasNextPage,
                            hasPreviousPage,
                            previousPage,
                            nextPage,
                            totalPages,
                            getPageItemProps
                        }) => (
                                <div>
                                    <button
                                        {...getPageItemProps({
                                            pageValue: 1,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        first
                                    </button>

                                    {hasPreviousPage && (
                                        <button
                                            {...getPageItemProps({
                                                pageValue: previousPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {"<"}
                                        </button>
                                    )}

                                    {pages.map(page => {
                                        let activePage = null;
                                        if (currentPage === page) {
                                            activePage = { backgroundColor: "#fdce09" };
                                        }
                                        return (
                                            <button
                                                {...getPageItemProps({
                                                    pageValue: page,
                                                    key: page,
                                                    style: activePage,
                                                    onPageChange: handlePageChange
                                                })}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}

                                    {hasNextPage && (
                                        <button
                                            {...getPageItemProps({
                                                pageValue: nextPage,
                                                onPageChange: handlePageChange
                                            })}
                                        >
                                            {">"}
                                        </button>
                                    )}

                                    <button
                                        {...getPageItemProps({
                                            pageValue: totalPages,
                                            onPageChange: handlePageChange
                                        })}
                                    >
                                        last
                                    </button>
                                </div>
                            )}
                    </Pagination>
                </div>

            </div>
            <style jsx>{`
            .table-cell {
                display: table-cell;
                padding: 14px 40px 14px 16px;
                font-size: 0.875rem;
                text-align: left;
                font-weight: 400;
                line-height: 1.43;
                border-bottom: 1px solid rgba(224, 224, 224, 1);
                letter-spacing: 0.01071em;
            }
            .table {
                width: 1146px;
                display: table;
                border-spacing: 0;
                border-collapse: collapse;
            }
            .container {
                display: flex;
                align-items: center;
                flex-direction: column;
            }
            .right {
                text-align: right;
            }
            .left {
                text-align: left;
            }
            .head {
                color: rgba(0, 0, 0, 0.54);
                font-size: 12px;
                line-height: 1.3125rem;
                font-weight: 500;
                text-transform: uppercase;
                border-top: 1px solid rgba(224, 224, 224, 1);
            }
            .pagination-container {
                padding-top: 24px;
                display: flex;
                justify-content: flex-end;
                width: 1146px;
            }
        `}</style>
        </div >

    )
}