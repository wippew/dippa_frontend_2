import { useEffect, useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react'
import { getRoutes } from './randomFunctions'
import { toJS } from 'mobx';
import Multiselect from 'multiselect-react-dropdown';
import { getDepots, getGroupsWithDepotId } from '../api/RestApiCalls';
import { isEmpty } from 'lodash'


export const MyForm = () => {
  const store = useContext(StoreContext)


  const handleSubmit = async (event) => {
    event.preventDefault();
    const button = event.target.querySelector('button[type="submit"]');
    button.disabled = true;
    const routes = await getRoutes(store);
    store.setPositions(toJS(routes));
    store.positionsDrawn = false;
    store.renderMap();
    button.disabled = false; // Re-enable the button
    store.acceptButtonVisible = true;
  }

  const onSelect = (selectedList, selectedItem) => {
    if (selectedItem.depotId == 1) {
      const id = selectedItem.id;
      store.firstDepotVehicleIds.push(id);
    } else if (selectedItem.depotId == 2) {
      const id = selectedItem.id;
      store.secondDepotVehicleIds.push(id);
    }

  }

  const onRemove = (selectedList, removedItem) => {
    if (removedItem.depotId = 1) {
      const id = removedItem.id;
      const index = store.firstDepotVehicleIds.indexOf(id);
      store.firstDepotVehicleIds.splice(index, 1);
    } else if (removedItem.depotId = 2) {
      const id = removedItem.id;
      const index = store.secondDepotVehicleIds.indexOf(id);
      store.secondDepotVehicleIds.splice(index, 1);
    }
  }



  const createMultiSelectIfDepotReady = (depot) => {
    let test = null;
    if (depot == 1 && !isEmpty(store.depot1Options)) {
      test = JSON.parse(store.depot1Options);
    } else if (depot ==2 && !isEmpty(store.depot2Options)){
      test = JSON.parse(store.depot2Options);
    }
    if (!isEmpty(test)) {
      const options = test.options;
      const depotName = "Tukikohta " + depot.toString();
      return <Multiselect
        options={options} // Options to display in the dropdown
        onSelect={onSelect} // Function will trigger on select event
        onRemove={onRemove} // Function will trigger on remove event
        showCheckbox={true}
        placeholder={depotName}
        displayValue="name" // Property name to display in the dropdown options
      />
    }
  }

  return useObserver(() => (
    <form className="sidebar" onSubmit={handleSubmit}>
      <fieldset>
        {createMultiSelectIfDepotReady(1)}
        {createMultiSelectIfDepotReady(2)}
      </fieldset>
      <button type="submit" disabled={false}>Suorita optimointi</button>
    </form>
  ))
}
