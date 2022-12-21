/* src/App.js */
import React, { useRef, useEffect, createRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
//import ReactDOM from 'react-dom'
import Marker from './components/Marker';
import './App.css';
import fetchFakeData from './api/fetchFakeData';
import testFetch from './api/RestApiCalls';
import drawLayersForVehicle from './components/DrawFunctions';
import { getSuggestedQuery } from '@testing-library/react';
import MyForm from './components/MyForm';
import getRoutesAndDrawOnMap from './components/randomFunctions';
import { StoreContext } from './components/Store';
import { StoreProvider } from './components/Store';

<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;


const App = () => {
  const mapContainerRef = useRef(null);
  const vehicleCount = 2;
  /* References */
  const vehicleRef = createRef()
  const store = React.useContext(StoreContext)

  if (store.getVehicle() == 2) {
    getRoutesAndDrawOnMap();
  }

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [22.30008653511428, 60.43000065672325],
      zoom: 10,
    });

    
    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


    map.on('load', () => {
      if (store.getVehicleCount() == 2) {
        getRoutesAndDrawOnMap();
      }
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //return <div className="map-container" ref={mapContainerRef} />;
  return (
    <div>
      <MyForm />;
      <div ref={mapContainerRef} className="map-container" />
    </div>

  );
};


export default App;