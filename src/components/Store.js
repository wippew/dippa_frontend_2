import React from 'react'
import { useLocalObservable } from 'mobx-react'


export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({

    vehicleCount: null,
    setVehicleCount: (value) => {
      store.vehicleCount = value;
    },
    getVehicleCount: () => {
      return store.vehicleCount;
    }
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

