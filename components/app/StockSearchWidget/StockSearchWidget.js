import React, { useState } from "react"
//import { useRouter } from 'next/router'

import classNames from 'classnames'

import { IconButton, makeStyles } from '@material-ui/core'
import { 
  Search as SearchIcon, 
  Close as CloseIcon
} from '@material-ui/icons'

import { useStockStore } from "../../../stores/hooks"

import styles from './stockSearchWidget.style.js'
const useStyles = makeStyles(styles)

export default ({ minChars, className, onSearchClosed }) => {

  const [searchString, setSearchString] = useState('')
  const [searchWidgetOpen, setSearchWidgetOpen] = useState(false)
  const stockStore = useStockStore()

  const s  = useStyles()

  const handleChange = (event) => {
    const str =  event.target.value
    setSearchString(str)
    if (!str || !str.length) {
      stockStore.clearResultSet()
    }
    else if (str && str.length >= minChars) {
      stockStore.fuzzyMatch(str)
    } 
  }

  return (
    <div 
      className={classNames(
        className,
        s.searchOuter, 
        (searchWidgetOpen) ? s.searchWidgetOpened : s.searchWidgetClosed
      )} 
    >
      <input
        type="text"
        placeholder="Search..."
        className={s.input}
        onChange={handleChange}
        value={searchString}
        autoFocus
      />
      <IconButton 
        onClick={() => {
          const closing = searchWidgetOpen
          setSearchWidgetOpen(!searchWidgetOpen)
          setSearchString('')
          stockStore.clearResultSet()
          if (closing && onSearchClosed) {
            onSearchClosed()
          }
        }} 
        className={s.iconButton}
      >
        {searchWidgetOpen ? <CloseIcon /> : <SearchIcon /> }
      </IconButton>
    </div>
  )
}