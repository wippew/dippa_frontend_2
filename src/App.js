/* src/App.js */
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom'
import Marker from './components/Marker';
import './App.css';
import fetchFakeData from './api/fetchFakeData';
<pre>{process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}</pre>

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const App = () => {
  const mapContainerRef = useRef(null);

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [23.252894, 60.875438],
      zoom: 12.5,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
    /* src/App.js */
    /* src/App.js */

    map.on('load', async () => {
      // get center coordinates
      const { lng, lat } = map.getCenter();
      // fetch new data
      const results = await fetchFakeData(lng, lat);

      // iterate through the feature collection and append marker to the map for each feature
      for (let i = 0; i < results.features.length; i++) {
        const currentRes = results.features[i];
        const id = i;
        const vehicle = currentRes.vehicle;
        const coordinates = currentRes.geometry.coordinates;
        const order = currentRes.order;
        const el = document.createElement('div');
        el.className = 'marker';
        el.innerHTML = '<span><b>' + (i + 1) + '</b></span>'
        if (vehicle == "0") {
          el.color = "#FF00FF";
          new mapboxgl.Marker(el)
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, className:"testboss"}).setText(order))
            .addTo(map)
            .togglePopup();
        } else if(vehicle == "1") {
          new mapboxgl.Marker({
            color: "#0000FF"
          })
            .setLngLat(coordinates)
            .setPopup(new mapboxgl.Popup({closeOnClick: false, closeButton: false, className:"testboss"}).setText(order))
            .addTo(map)
            .togglePopup();
        }
        
      }
    });


    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;