import { cardTitle, title } from "../../../styles/esxStyles.js"

const grayText = 'rgb(102, 112, 121)'

export default (theme) => ({
  cardTitle,
  title,
  cardContent: {
    minHeight: 190,
  },
  cardHeader: {
    minHeight: 92,
  },
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
})
