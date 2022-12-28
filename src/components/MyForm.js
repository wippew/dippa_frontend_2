import { useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { useObserver } from 'mobx-react'
import getRoutes from './randomFunctions'
import testFetch from '../api/RestApiCalls';


export const MyForm = () => {
  const store = useContext(StoreContext)
  //const [name, setName] = useState("");
  console.log("MYFORM RENDERS");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const routes = await getRoutes(5);
    console.log("at handleSubmit");
  }
  return useObserver(() => (
    <form className="sidebar" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>VehicleCount</p>
          <input name="name" />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  ))
}
