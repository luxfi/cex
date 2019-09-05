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
        creators: ["George Miller", "Brendan McCarthy"],
        stars: ["Tom Hardy", "Charlize Theon", "Nicholas Hoult"],
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
        <div className="details">
            <div className="detail-panel">
                <DetailPanel movie={movieDetailData}/>
            </div>
            <InfoPanel imgSrc={easyToUseImg} headerTxt="Easy To Use" bodyTxt="At ESX we make getting into trading easy with simple tools and expert support via phone, email, or chat."/>
            <InfoPanel imgSrc={secureImg} headerTxt="Secure" bodyTxt="Entertainment Stock X uses industry-leading security practices and tools to keep your account safe."/>
            <InfoPanel imgSrc={investmentToolImg} headerTxt="Investment Tool" bodyTxt="ESX is a unified, global trading platform that bridges the worlds of entertainment and finance."/>
            <style jsx>{`
            .details { 
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: center;
                padding: 0;
                flex-wrap: wrap;
            }
            .detail-panel {
                width: 75%
            }
            .related-panel {
                width: 25%;
            }
            `}</style>
        </div>
    )
}