import React from 'react'
import IconArrowDown from '../Icons/IconArrowDown'
import s from './ShowDetailsButton.module.css'

export default ({ onClick }) => (
  <button onClick={onClick} className={s.showDetailsButton}>
    <span>
      <IconArrowDown />
    </span>
  </button>
)