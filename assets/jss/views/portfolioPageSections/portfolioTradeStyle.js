import { cardTitle, title } from "../../esx.js"
import imagesStyle from "../../imagesStyles.js"

const grayText = 'rgb(102, 112, 121)' // 'rgba(0, 0, 0, .8)'

export default Object.assign({}, { cardTitle, title, imagesStyle }, {
  card: {
    padding: '.5em 1em'
  }
})
