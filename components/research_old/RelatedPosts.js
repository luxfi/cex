import postPlaceHolder from '../../assets/images/research/posts.png'

export default props => {
  const { movies } = props;
  return (
    <div className="container">
      <div className="title">
        Related Posts
            </div>
      <div className="posts-container">

        <img src={postPlaceHolder} style={{ width: "210px" }} />
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
                .posts-container {
                    margin-top: 20px;
                }
            `}</style>
    </div>
  )
}