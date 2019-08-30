import InfoPanel from './InfoPanel'
import easyToUseImg from '../assets/images/whyesx/easytouse.png'
import secureImg from '../assets/images/whyesx/secure.png'
import investmentToolImg from '../assets/images/whyesx/investmenttool.png'

export default props => {
    return (
        <div className="why-panel">
            <span className="content-panel">
                <InfoPanel imgSrc={easyToUseImg} headerTxt="Easy To Use" bodyTxt="At ESX we make getting into trading easy with simple tools and expert support via phone, email, or chat."/>
            </span>
            <span className="content-panel">
                <InfoPanel imgSrc={secureImg} headerTxt="Secure" bodyTxt="Entertainment Stock X uses industry-leading security practices and tools to keep your account safe."/>
            </span>
            <span className="content-panel">
                <InfoPanel imgSrc={investmentToolImg} headerTxt="Investment Tool" bodyTxt="ESX is a unified, global trading platform that bridges the worlds of entertainment and finance."/>
            </span>
            <style jsx>{`
            .why-panel { 
                display: flex;
                justify-content: center;
                width: 100%;
                align-items: center;
                padding: 0;
                flex-wrap: wrap;
            }
            .content-panel {
                width: 33%;
            }
            .demo {
                font-size: 11px;
                color: gray;
                padding-top: 10px;
            }
            .break {
                flex-basis: 100%;
                height: 0;
            }
            `}</style>
        </div>
    )
}