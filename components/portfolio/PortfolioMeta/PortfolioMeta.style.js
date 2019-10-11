import { cardTitle, title } from "../../esxStyles.js"

const grayText = 'rgb(102, 112, 121)' // 'rgba(0, 0, 0, .8)'

export default Object.assign({}, { cardTitle, title }, {
  card: {
    padding: '.5em 1em'
  },
  codeIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.26)',
    borderRadius: 100,
    color: 'white'
  },
  currencyText: {
    color: 'rgb(21, 28, 38)'
  },
  currencySymbol: {
    color: grayText
  },
  darkSpan: {
    color: 'rgb(40, 47, 58)'
  },
  description: {
    color: "#999"
  },
  earningsAmountText: {
    fontSize: '1.2em',
    marginBottom: '-.5em'
  },
  earningsChangeText: {
    color: grayText,
    fontSize: '.65em'
  },
  earningsChip: {
    backgroundColor: 'rgb(79, 86, 95)',
    color: 'rgb(242, 244, 244)',
    justifyContent: 'inherit',
    letterSpacing: '1px',
    minWidth: '100%',
    marginTop: '.5em',
    marginLeft: '-5px'
  },
  earningsContainer: {
    minHeight: '206px',
    paddingLeft: '.5em'
  },
  earningsText: {
    color: grayText,
    letterSpacing: '1px',
    fontSize: '.8em',
    fontWeight: '400',
    textTransform: 'uppercase'
  },
  fontBoost: {
    fontSize: '1.5em'
  },
  metaFlex: {
    // flexGrow: 1
  },
  metaHighlightNumber: {
    fontWeight: 400,
    marginTop: '1.5em',
    fontSize: '1.2em'
  },
  metaIcon: {
    marginBottom: '-5px',
    fontSize: '1.2em'
  },
  topCategoriesTitle: {
    textTransform: 'uppercase',
    fontSize: '.7em',
    fontWeight: 400,
    color: grayText
  },
  topCategoriesChip: {
    backgroundColor: 'rgb(239, 239, 240)',
    color: 'rgb(135, 147, 158)',
    fontWeight: 600,
    letterSpacing: '1px',
    marginRight: '10px'
  }
})
