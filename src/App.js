/* src/App.js */
import React, { useRef, useEffect } from 'react';
import './App.css';
import {MyForm} from './components/MyForm';
import { Map } from './components/Map';
import { StoreProvider } from './components/Store';
import { observer } from "mobx-react";
import { useObserver } from 'mobx-react'

//<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>

export const App = () => {
  return useObserver(() => (
    <>
      <StoreProvider>
        <MyForm />;
        <div className="mapClass">
          <Map />;
        </div>        
      </StoreProvider>
    </>
  ))
};


