import { useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react'
import { getRoutes } from './randomFunctions'
import testFetch from '../api/RestApiCalls';
import { toJS } from 'mobx';


export const MyForm = () => {
  const store = useContext(StoreContext)
  const [depot1, setDepot1] = useState("");
  const [depot2, setDepot2] = useState("");
  console.log("MYFORM RENDERS");
  const handleSubmit = async (event) => {
    event.preventDefault();
    store.depot1VehicleCount = Number(depot1);
    store.depot2VehicleCount = Number(depot2);
    const routes = await getRoutes(depot1, depot2);
    store.setPositions(toJS(routes));
    store.positionsDrawn = false;
    store.renderMap();
    console.log("at handleSubmit, map rendered");
  }
  return useObserver(() => (
    <form className="sidebar" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>Depot 1</p>
          <input name="depot1" onChange={event => setDepot1(event.target.value)} />
        </label>
        <label>
          <p>Depot 2</p>
          <input name="depot2" onChange={event => setDepot2(event.target.value)} />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  ))
}
