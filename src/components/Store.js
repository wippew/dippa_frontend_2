import React from 'react'
import { useLocalObservable } from 'mobx-react'
import { isEmpty } from 'lodash'
import getRoutes from './randomFunctions'

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({

    vehicleCount: null,
    setVehicleCount: (value) => {
      store.vehicleCount = value;
    },
    getVehicleCount: () => {
      return store.vehicleCount;
    },
    renderMapTrigger: false,
    renderMap: () => {
      store.renderMapTrigger = !store.renderMapTrigger
    },
    maintenanceTasks: [],
    getMaintenanceTasks: () => {
      return store.maintenanceTasks;
    },
    fetchMaintenenceTasks: async (vehicleCount) => {
      try {
        if (vehicleCount != null) {
          store.maintenanceTasks = await getRoutes();
          if (!isEmpty(store.maintenanceTasks)) {
            store.renderMap();
          }

        }
      } catch (error) {
        console.error(error)
      }
    }
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

