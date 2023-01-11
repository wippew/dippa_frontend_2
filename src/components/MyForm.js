import { useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react'
import {getRoutes} from './randomFunctions'
import testFetch from '../api/RestApiCalls';
import { toJS } from 'mobx';


export const MyForm = () => {
  const store = useContext(StoreContext)
  const [name, setName] = useState("");
  console.log("MYFORM RENDERS");
  const handleSubmit = async (event) => {
    event.preventDefault();
    store.vehicleCount = Number(name);
    const routes = await getRoutes(name);
    store.setPositions(toJS(routes));
    store.positionsDrawn = false;
    store.renderMap();
    console.log("at handleSubmit, map rendered");
  }
  return useObserver(() => (
    <form className="sidebar" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>VehicleCount</p>
          <input name="name" onChange={event => setName(event.target.value)}/>
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  ))
}
