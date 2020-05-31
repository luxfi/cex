import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

export default () => {
  const {store} = useContext(MobXProviderContext)
  return store.stockStore
}