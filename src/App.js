/* src/App.js */
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom'
import Marker from './components/Marker';
import './App.css';
import fetchFakeData from './api/fetchFakeData';
import testFetch from './api/RestApiCalls';
import drawLayersForVehicle from './components/DrawFunctions';
import { getSuggestedQuery } from '@testing-library/react';
<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);
  const vehicleCount = 2;
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


    // const positions = [
    //   [22.30008653511428, 60.43000065672325],
    //   [22.32498653511428, 60.43922265672325],
    //   [22.360918847539494, 60.43937464996765]
    // ];

    // map.on('load', () => {
    //   drawLayers(map, positions)
    // });


    map.on('load', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      // const results = await fetchFakeData(lng, lat);
      const test = await testFetch();
      const positions = [];
      // iterate through the feature collection and append marker to the map for each feature
      for (let i = 0; i < test.length; i++) {
        const currentRes = test[i];
        const id = i;
        const vehicle = currentRes.vehicle;
        const coordinates = currentRes.coordinates;
        positions.push({
          key: vehicle,
          value: coordinates
        });

        const order = currentRes.order;
        const type = currentRes.type;
        const el = document.createElement('div');
        if (vehicle == "0") {
          el.className = 'marker';
          el.innerHTML = '<span><b>' + order + '</b></span>'
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
            .addTo(map)
        } else if (vehicle == "1") {
          el.className = 'marker2';
          el.innerHTML = '<span><b>' + order + '</b></span>'
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
            .addTo(map)
        }

      }


      for (let i = 0; i < vehicleCount; i++) {
        const vehiclePositions = [];
        for (let entry of positions) {
          if (entry.key == i.toString()) {
            vehiclePositions.push(entry.value);
          }
          const asd = "ASD";
        }
        vehiclePositions.push(vehiclePositions[0]);
        drawLayersForVehicle(map, vehiclePositions, i);
      }
      
      
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;