/* src/App.js */
import React, { useRef, useEffect, createRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import getRoutesAndDrawOnMap from './randomFunctions';
import { StoreContext } from './Store';
import { observer } from "mobx-react";

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbWV0cml4ZGV2IiwiYSI6ImNrcHdoYjZsajAxMG4yd253aWIyeHRvdG4ifQ.kB-1WgIHJ3GELwh14NilPw'

const Map = () => {
    const mapContainerRef = useRef(null);
    const map = useRef();
    /* References */
    const store = useContext(StoreContext)

    const currentVehicleCount = store.getVehicleCount();
    if (currentVehicleCount == 3) {
        getRoutesAndDrawOnMap(map.current, currentVehicleCount);
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

        const asdasdas = mapContainerRef;
        const asdasdas2 = map;
        const dkasdjfj = mapContainerRef.current;
        const askjddlad = "adasdasd";

        // add navigation control (the +/- zoom buttons)
        map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

        // clean up on unmount
        return () => map.remove();
    }, []);


    return (
        <div ref={mapContainerRef} className="map-container" />
    );
};


export default observer(Map);