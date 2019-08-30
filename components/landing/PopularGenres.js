import GenrePanel from './GenrePanel'
import scifiImg from '../../assets/images/genres/scifi.png'
import scifiGraphImg from '../../assets/images/genres/scifigraph.png'
import actionImg from '../../assets/images/genres/action.png'
import actionGraphImg from '../../assets/images/genres/actiongraph.png'
import dramaImg from '../../assets/images/genres/drama.png'
import dramaGraphImg from '../../assets/images/genres/dramagraph.png'

export default props => {
    return (
        <div>
            <div className="popular-genres-panel">
                <span className="genre-panel">
                    <GenrePanel genreTitle="Sci-Fi" genreMovieTitle="The Matrix" genreImage={scifiImg} graphImage={scifiGraphImg}/>
                </span>
                <span className="genre-panel">
                    <GenrePanel genreTitle="Action" genreMovieTitle="Ocean's Eleven" genreImage={actionImg} graphImage={actionGraphImg}/>
                </span>
                <span className="genre-panel">
                    <GenrePanel genreTitle="Drama" genreMovieTitle="San Andreas" genreImage={dramaImg} graphImage={dramaGraphImg}/>
                </span>
            </div>
            <style jsx>{`
            .popular-genres-panel {
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: center;
                padding: 0;
                flex-wrap: wrap;
            }
            .genre-panel {
                width: 31%;
                padding-left: 15px;
            }
            .break {
                flex-basis: 100%;
                height: 0;
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
            .btn.invert {
                margin: 0;
                padding: 0 48px;
                height: 48px;
                line-height: 48px;
                border-radius: 7px;
                background-color: #ff911e;
                box-shadow: 0 4px 14px 0 rgba(255, 145, 30, 0.39);
                color: white;
            }
            .demo {
                font-size: 11px;
                color: gray;
                padding-top: 10px;
            }
            `}</style>
        </div>
    )
}