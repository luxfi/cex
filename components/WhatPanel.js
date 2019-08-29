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
            <a href="#" className="btn invert">Start Trading Now</a>
            <div className="break"/>
            <a href="#" className="demo">View Demo</a>
            <style jsx>{`
            .why-panel { 
                font-family: ‘BWHaasGroteskTF-55Roman-Web,sans-serif’, sans-serif;
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
            `}</style>
        </div>
    )
}