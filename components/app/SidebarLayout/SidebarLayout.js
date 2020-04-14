import React from 'react'

import { makeStyles } from '@material-ui/core'

export default ({ left, top, children, minHeight }) => {
  const s = myStyles()
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

const myStyles = makeStyles((theme) => ({

    outer: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
    },
    top: {
      flex: '0 0 auto', // disable grow, disable shrink (rely on item's height)
          //backgroundColor: '#eaa' // dev
    },
    bottom: {
      flex: '1 0 auto', // enable grow, disable shrink
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    left: {
      minHeight: '100%',
      flex: '0 0 auto', // disable grow, disable shrink (rely on item's width)
          //backgroundColor: '#aea', // dev
      
      '& > *': {
        minHeight: '100%',
      }
      
    },
    main: {
      flex: '1 0 auto', // enable grow, disable shrink
          //backgroundColor: '#aae',  // dev
      '& > *': {
        width: '100%',
        minHeight: '100%',
      }
    }
}))

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