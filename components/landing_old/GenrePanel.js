export default props => {
  return (
    <div className="genre-panel">
      <h2 className="genre-title">
        {props.genreTitle}
      </h2>
      <div className="break" />
      <h1 className="genre-movie-title">
        {props.genreMovieTitle}
      </h1>
      <div className="break" />
      <img className="genre-image" src={props.genreImage} />
      <div className="break" />
      <div className="links">
        <a href="#" className="link">Trailer</a>
        <a href="#" className="link">|</a>
        <a href="#" className="link">Official Website</a>
      </div>
      <img className="graph-image" src={props.graphImage} />
      <style jsx>{`
            .genre-panel {
                flex: 1;
                height: auto;
                margin: 26px 0px;
                align: left;
            }
            .content-panel {
                width: 100%;
                align-content: center;
                text-align: center;
                padding: 5px;
            }

            .link {
                font-size: 8pt;
                padding-right: 10px;
            }

            .break {
                flex-basis: 100%;
                height: 0;
            }
            .genre-title {
                text-decoration: underline;
                font-size: 12pt;
            }
            .genre-movie-title {
                color: grey;
                font-size: 16pt;
            }
            .genre-image {
                width: 100%;
                height: 150px;
            }
            .graph-image {
                width: 100%;
                height: 125px;
            }
            `}</style>
    </div>
  )
}