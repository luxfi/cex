import { cardTitle, title } from "../esxStyles.js"
import imagesStyle from "./imagesStyles.js"

const grayText = 'rgb(102, 112, 121)'

export default Object.assign({}, { cardTitle, title, imagesStyle }, {
  categoryChip: {
    backgroundColor: 'rgb(239, 239, 240)',
    color: 'rgb(135, 147, 158)',
    fontWeight: 600,
    letterSpacing: '1px',
    marginTop: '12px'
  },
  ctaChip: {
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: 'rgb(99, 99, 99)',
    backgroundColor: 'rgb(221, 221, 221)'
  },
  ctaDiv: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1em 1em'
  },
  currencySymbol: {
    color: grayText
  },
  investmentCard: {
    // padding: '.5em 1em'
  }
})
