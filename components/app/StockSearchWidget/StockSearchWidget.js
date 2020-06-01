import React, { useState, useEffect, useRef } from "react"
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

export default ({ minChars, className, onSearchClosed, isOpen }) => {

  const stockStore = useStockStore()
  const [searchString, setSearchString] = useState(stockStore.searchString)
  const [searchWidgetOpen, setSearchWidgetOpen] = useState(isOpen)
  const inputEl = useRef(null)
  const s  = useStyles()

    // https://stackoverflow.com/questions/54865764/react-usestate-does-not-reload-state-from-props
  useEffect(() => {
    setTimeout(() => {
      setSearchString(stockStore.searchString)
      setSearchWidgetOpen(isOpen)
    }, 100)
  }, [stockStore.searchString, isOpen])

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
        ref={inputEl}
        placeholder="Search..."
        className={s.input}
        onChange={handleChange}
        value={searchString}
        autoFocus
        size={35}
      />
      <IconButton 
        onClick={() => {
          const closing = searchWidgetOpen
          setSearchWidgetOpen(!searchWidgetOpen)
          if (!closing) {
            setTimeout(() => {
              inputEl.current.focus()
            },
            500)
          }
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