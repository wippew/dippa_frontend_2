/* src/App.js */
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import ReactDOM from 'react-dom'
import Marker from './components/Marker';
import './App.css';
import fetchFakeData from './api/fetchFakeData';
import testFetch from './api/RestApiCalls';
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
      zoom: 10,
    });

    const test = testFetch();
    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');


    const positions = [
      [22.30008653511428, 60.43000065672325],
      [22.32498653511428, 60.43922265672325],
      [22.360918847539494, 60.43937464996765]
    ];

    map.on('load', () => {
      map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': positions
          }
        }
      });
      map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#000000',
          'line-width': 8
        }
      });
    });


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
    });

    // clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default App;