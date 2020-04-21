import React from 'react'
import s from './SidebarLayout.module.scss'

export default ({ left, top, children, minHeight }) => {
  return (
    <div className={s.outer} style={{minHeight: (minHeight || '90vh')}}>
      <div className={s.top} >
        {top}
      </div>
      <div className={s.bottom}>
        <div className={s.left} >
          {left}          
        </div>
        <div className={s.main} >
          {children}  
        </div>
      </div>
    </div>
  )
}

/* Test with...

import React from 'react'
import SidebarLayout from '../components/app/SidebarLayout'

export default (props) => (
  <SidebarLayout 
    top={<Header height={100}/>}
    left={<Sidebar width={200}/>}
  >
    <Main />
  </SidebarLayout>
)


const Header = ({ height }) => (
  <div style={{height: height, backgroundColor: '#e11'}} />
)

const Sidebar = ({ width }) => (
  <div style={{width: width, backgroundColor: '#1e1'}} />
)

const Main = (props) => (
  <div style={{backgroundColor: '#11e'}}  />
)

*/