import React from 'react'
import { useLocalObservable } from 'mobx-react'

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({

    vehicle: 2,
    setVehicle: (value) => {
      store.vehicle = value
    },
    getVehicle: () => {
      return store.vehicle
    }
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

