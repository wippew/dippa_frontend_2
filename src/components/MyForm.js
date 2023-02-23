import { useEffect, useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react'
import { getRoutes } from './randomFunctions'
import { toJS } from 'mobx';
import Multiselect from 'multiselect-react-dropdown';
import { getDepots, getGroupsWithDepotId } from '../api/RestApiCalls';
import { isEmpty } from 'lodash'


export const MyForm = (optionsDepot) => {
  const store = useContext(StoreContext)
  const [depot1, setDepot1] = useState("");
  const [depot2, setDepot2] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    store.depot1VehicleCount = Number(depot1);
    store.depot2VehicleCount = Number(depot2);
    const routes = await getRoutes(depot1, depot2, store);
    store.setPositions(toJS(routes));
    store.positionsDrawn = false;
    store.renderMap();
  }

  const onSelect = (selectedList, selectedItem) => {
  }

  const onRemove = (selectedList, removedItem) => {
  } 



const createMultiSelectIfFetchReady = () => {
    const test = optionsDepot.optionsDepot.options;
    return <Multiselect
          options={test} // Options to display in the dropdown
          onSelect={onSelect} // Function will trigger on select event
          onRemove={onRemove} // Function will trigger on remove event
          showCheckbox={true}
          placeholder="Tukikohta 1"
          displayValue="name" // Property name to display in the dropdown options
        />
}

return useObserver(() => (
  <form className="sidebar" onSubmit={handleSubmit}>
    <fieldset>
      {createMultiSelectIfFetchReady()}      
    </fieldset>
    <button type="submit">Suorita optimointi</button>
  </form>
))
}
