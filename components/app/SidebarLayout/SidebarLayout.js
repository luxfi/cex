import React from 'react'

import { makeStyles } from '@material-ui/core'

export default ({ left, top, main }) => {
  const s = myStyles()
  return (
    <div className={s.outer} >
      <div className={s.top} >
        {top}
      </div>
      <div className={s.bottom}>
        <div className={s.left} >
          {left}          
        </div>
        <div className={s.main} >
          {main}  
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
      minHeight: '90vh' 
    },
    top: {
      flex: '0 0 auto', // disable grow, disable shrink (rely on item's height)
      //backgroundColor: '#eaa'
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
      //backgroundColor: '#aea',
      
      '& > *': {
        minHeight: '100%',
      }
      
    },
    main: {
      flex: '1 0 auto', // enable grow, disable shrink
      //backgroundColor: '#aae',
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
    main={<Main />}
  />
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