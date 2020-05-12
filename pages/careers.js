import React from 'react'
import { inject, observer } from 'mobx-react'

const styles = {}

export default inject('store')(observer(
  ({ store })  => (
    <div>
      <ul>
        <li>hello</li>
        {store.careerStore.jobs.forEach(job => {
          return <li>{job}</li>
        })}
      </ul>
    </div>
  )
))


