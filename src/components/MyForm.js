import { useState } from 'react';
import { StoreContext } from './Store';
import React, { useContext } from 'react';
import { observer } from "mobx-react";


const MyForm = () => {
  const store = useContext(StoreContext)
  const [name, setName] = useState("");

  const handleSubmit = (event) => {
    const testtest = store.getVehicleCount();
    store.setVehicleCount(5);
    store.vehicleCount = 3;
    const abasbbs = store.getVehicleCount();
    console.log("asdasdads");
  }
  return (
    <form className="sidebar" onSubmit={handleSubmit}>
      <fieldset>
        <label>
          <p>VehicleCount</p>
          <input name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  )
}


export default observer(MyForm);