import bbbImg from '../assets/images/secured/bbb.png'
import comodoImg from '../assets/images/secured/comodo.png'
import mcafeeImg from '../assets/images/secured/mcafee.png'
import paypalImg from '../assets/images/secured/paypal.png'
import scanalertImg from '../assets/images/secured/scanalert.png'
import trusteImg from '../assets/images/secured/truste.png'
import verisignImg from '../assets/images/secured/verisign.png'

export default props => {
    return (
        <div className="image-row">
            <div className="left box" />
            <div className="image-container">                
                <img className="partner-image" src={mcafeeImg} alt="McAfee"/>  
                <img className="partner-image" src={paypalImg} alt="PayPal"/>
                <img className="partner-image" src={bbbImg} alt="Better Business Bureau"/>
                <img className="partner-image" src={trusteImg} alt="TrustE"/>
                <img className="partner-image" src={scanalertImg} alt="Scan Alert"/>
                <img className="partner-image" src={comodoImg} alt="Comodo"/>
                <img className="partner-image" src={verisignImg} alt="VeriSign"/>
            </div>
            <div className="right box" />
            <style jsx>{`
            .page-row {
                display: flex;
                flex: 1;
                height: auto;
                margin: 26px 0px;
            }

            .box {
                width: 200px;
                min-height: 100%;
                flex-shrink: 0;
                // background-color: rgb(243, 243, 0, .5);
                background-color: rgb(243, 243, 243);
            }

            .inner-row {
                display: flex;
                flex-wrap: wrap;
            }

            img {
                padding-left: 15px;
                padding-right: 15px;
            }
            `}</style>
        </div>
    )
}