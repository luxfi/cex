export default ({ title = "Missing Title", symbol = "XXX", price = 11.11, change = 1, percentChange = .1111 }) => {
    const direction = change >= 0 ? "positive" : "negative";
    return (
        <li className="navi-data-strip__entry">
            <div className="navi-data-strip__entry-label">{title}</div>
            <div className={`navi-data-strip__entry-value navi-data-strip__entry-value--${direction}`}>{change}</div>
            <div className={`navi-data-strip__entry-value navi-data-strip__entry-value--${direction}`}>{percentChange}</div>
            <style jsx>{``}</style>
        </li>



    )
}
