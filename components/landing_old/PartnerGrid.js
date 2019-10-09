import disneyImg from '../../assets/images/partners/disney.png'
import paramountImg from '../../assets/images/partners/paramount.png'
import warnerbrothersImg from '../../assets/images/partners/warnerbrothers.png'
import sonyImg from '../../assets/images/partners/sony.png'
import unitedartistsImg from '../../assets/images/partners/unitedartists.png'
import universalImg from '../../assets/images/partners/universal.png'
import dreamworksImg from '../../assets/images/partners/dreamworks.png'
import newlineImg from '../../assets/images/partners/newline.png'
import lionsgateImg from '../../assets/images/partners/lionsgate.png'
import touchstoneImg from '../../assets/images/partners/touchstone.png'
import hollywoodImg from '../../assets/images/partners/hollywood.png'
import miramaxImg from '../../assets/images/partners/miramax.png'
import columbiaImg from '../../assets/images/partners/columbia.png'
import focusImg from '../../assets/images/partners/focus.png'
import warnerindependentImg from '../../assets/images/partners/warnerindependent.png'
import kochlorberImg from '../../assets/images/partners/kochlorber.png'
import weinsteinImg from '../../assets/images/partners/weinstein.png'

export default props => {
  return (
    <div className="image-row">
      <img className="partner-image" src={disneyImg} alt="Walt Disney Pictures" />
      <img className="partner-image" src={paramountImg} alt="Paramount Pictures" />
      <img className="partner-image" src={warnerbrothersImg} alt="Warner Brothers" />
      <img className="partner-image" src={sonyImg} alt="Sony Pictures" />
      <img className="partner-image" src={universalImg} alt="NBC Universal" />
      <img className="partner-image" src={dreamworksImg} alt="Dreamworks Pictures" />
      <img className="partner-image" src={newlineImg} alt="New Line Cinema" />
      <img className="partner-image" src={lionsgateImg} alt="Lionsgate" />
      <img className="partner-image" src={touchstoneImg} alt="Touchstone Pictures" />
      <img className="partner-image" src={hollywoodImg} alt="Hollywood Pictures" />
      <img className="partner-image" src={columbiaImg} alt="Columbia Pictures" />
      <img className="partner-image" src={focusImg} alt="Focus Features" />
      <img className="partner-image" src={miramaxImg} alt="Miramax Films" />
      <img className="partner-image" src={warnerindependentImg} alt="Warner Independent Pictures" />
      <img className="partner-image" src={unitedartistsImg} alt="United Artists" />
      <img className="partner-image" src={kochlorberImg} alt="Koch Lorber Films" />
      <img className="partner-image" src={weinsteinImg} alt="The Weinstein Company" />
      <style jsx>{`
            .image-row {
                display: flex;
                flex: 1;
                height: auto;
                margin: 26px 0px;
                flex-wrap: wrap;
                justify-content: space-between;
            }

            .partner-image {
                padding-top: 5px;
                padding-bottom: 5px;
            }
            `}</style>
    </div>
  )
}