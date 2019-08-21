
export default props => {
    const width = props.width || "164px"
    return (
        <div>
            <img src={props.imgSrc} alt="slide-item" style={{ width: props.width }} />
            <style jsx>{`
                img {
                    height: 92px;
                    object-fit: cover;
                }
            `}</style>
        </div>
    )
}