import React from 'react'
import { useLocalObservable } from 'mobx-react'
import { isEmpty } from 'lodash'
import getRoutes from './randomFunctions'

export const StoreContext = React.createContext()

export const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    
    acceptButtonVisible: true,
    firstDepotCoords: [],
    secondDepotCoords: [],
    firstDepotVehicleIds: [],
    secondDepotVehicleIds: [],
    depot1Options: null,
    setDepot1Options: (value) => {
      store.depot1Options = value;
    },
    depot2Options: null,
    setDepot2Options: (value) => {
      store.depot2Options = value;
    },
    fetchedRoutesJson: null,
    markers: [],
    layersDrawn: false,
    positionsDrawn: false,
    positions: [],
    setPositions: (value) => {
      store.positions = value;
    },
    getPositions: () => {
      return store.positions;
    },
    renderMapTrigger: false,
    renderMap: () => {
      store.renderMapTrigger = !store.renderMapTrigger
    },
    clearMap: () => {
      if (store.markers.length > 0) {
          for (const currentMarker of store.markers) {
              currentMarker.remove()
          }
      }
  }
  }))

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  )
}

