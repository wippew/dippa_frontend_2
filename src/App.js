/* src/App.js */
import React, { useRef, useEffect } from 'react';
import './App.css';
import MyForm from './components/MyForm';
import Map from './components/Map';
import { StoreProvider } from './components/Store';
import { observer } from "mobx-react";

//<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>




const App = () => {
  return (
    <>
      <StoreProvider>
        <MyForm />;
        <Map />;
      </StoreProvider>
    </>
  );
};


export default observer(App);