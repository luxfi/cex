import InfoPanel from './InfoPanel'
import easyToUseImg from '../../assets/images/whyesx/easytouse.png'
import secureImg from '../../assets/images/whyesx/secure.png'
import investmentToolImg from '../../assets/images/whyesx/investmenttool.png'

export default props => {
    var movieDetailData = {
        title: "Mad Max: Fury Road",
        price: "$12.25",
        change: .8,
        changePercent: 7,
        movieImage: {},
        tags: ["action", "adventure", "drama"],
        agesuggestion: "16+",
        runtime: "43 min",
        creators: ["George Miller", "Brendan McCarthy"],
        stars: ["Tom Hardy", "Charlize Theon", "Nicholas Hoult"],
        details: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        symbol: "MDMX2",
        status: "Active",
        ipoDate: "Dec 12, 2016",
        mpaaRating: "PG-13",
        phase: "Release",
        releaseDate: "Oct 12, 2018",
        gross: "$16,006,065",
        theaters: 3640
    }


    return (
        <div className="detail-data">
            <div className="detail-title">
                <h1>{props.movie.title}</h1>
            </div>
            <div className="price-heading">
                {props.movie.price}
            </div>
            <div className="price-change-heading">
                {props.movie.change} {props.movie.changePercent}
            </div>
            <div className="info-panel">
                <div className="image-left">
                    <img src={props.movie.movieImage} />
                </div>
                <div className="data-right">
                    <div className="row">
                        <span className="stat">{props.movie.agesuggestion}</span>
                        <span className="stat">|</span>
                        <span className="stat">{props.movie.runtime}</span>
                        <span className="stat">|</span>
                        <span className="stat">{props.movie.tags}</span>
                    </div>
                    <div className="row">
                        <a href="#" className="btn invert">Trade This Stock</a>
                        <a href="#" className="btn-alt invert">Watch Trailer</a>
                    </div>
                    <div className="row">
                        <a href="#" className="support-link">Official Website</a>
                        <span>|</span>
                        <a href="#" className="support-link">Trailer 1</a>
                        <span>|</span>
                        <a href="#" className="support-link">Trailer 2</a>
                    </div>
                    <div className="row">
                        <span className="details">
                            {props.movie.details}
                        </span>
                    </div>
                    <div className="row">
                        <span className="creator-label">Creators:</span>
                        <span className="creators">{props.movie.creators}</span>
                    </div>
                    <div className="row">
                        <span className="stars-label">Stars:</span>
                        <span className="stars">{props.movie.stars}</span>
                    </div>
                    <div className="info-grid-half">
                        <span className="grid-label">Symbol:</span>
                        <span className="grid-data">{props.movie.symbol}</span>
                        <span className="grid-label">Status:</span>
                        <span className="grid-data">{props.movie.status}</span>
                        <span className="grid-label">IPO Date:</span>
                        <span className="grid-data">{props.movie.ipoDate}</span>
                        <span className="grid-label">MPAA Rating:</span>
                        <span className="grid-data">{props.movie.mpaaRating}</span>
                    </div>
                    <div className="info-grid-half">
                        <span className="grid-label">Phase:</span>
                        <span className="grid-data">{props.movie.phase}</span>
                        <span className="grid-label">Release Date:</span>
                        <span className="grid-data">{props.movie.releaseDate}</span>
                        <span className="grid-label">Gross:</span>
                        <span className="grid-data">{props.movie.gross}</span>
                        <span className="grid-label">Theaters:</span>
                        <span className="grid-data">{props.movie.theaters}</span>
                    </div>
                </div>
            </div>

            <div className="more-like-this-panel">
                <h2>More Like This</h2>

            </div>
            <div className="trailer-panel">

            </div>
            <div className="related-panel">
                <h2>Related Posts</h2>
            </div>
            <style jsx>{`
            .detail-data { 
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: center;
                padding: 0;
                flex-wrap: wrap;
            }
            .detail-title {
                width: 100%;
            }
            .price-heading {
                width: 100%;
            }
            .price-heading {
                width: 100%;
            }
            .row {
                width: 100%;
            }
            .price-change-heading {
                width: 100%;
            }
            .info-panel {
                width: 80%;
            }
            .image-left {
                width: 30%;
            }
            .data-right {
                width: 70%;
            }
            .info-grid-half {
                width: 50%;
            }
            .grid-label {
                width: 50%;
            }
            .grid-data {
                width: 50%;
                font-weight: bold;
            }

            .trailer-panel {
                width: 80%;
            }
            .more-like-this-panel {
                width: 20%;
            }
            .related-panel {
                width: 20%;
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

            .btn-alt.invert {
                margin: 0;
                padding: 0 6px;
                height: 20px;
                line-height: 20px;
                border-radius: 2px;
                background-color: #0000FF;
                color: white;
                margin: -3px 7px 0px 0px;;
            }
            .btn-alt {
                display: inline-block;
                cursor: pointer;
                text-decoration: none;
                padding: 0.25rem 0.5rem;
                margin: -0.25rem -0.5rem;
                border-radius: 7px;
                color: #0000FF;
                background-color: transparent;
                border: none;
                font-size: inherit;
                line-height: inherit;
                transition: background 0.2s ease,color 0.2s ease,box-shadow 0.2s ease;
            }
            `}</style>
        </div>
    )
}