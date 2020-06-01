
import { useContext } from 'react'
import { MobXProviderContext } from 'mobx-react'

export const useStockStore = () => {
  const {store} = useContext(MobXProviderContext)
  return store.stockStore
}

export const useUserStore = () => {
  const {store} = useContext(MobXProviderContext)
  return store.userStore
}

export const useUserPortfolio = () => {
  const {store} = useContext(MobXProviderContext)
  return store.userPortfolio
}



// etc as needed