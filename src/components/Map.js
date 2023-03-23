/* src/App.js */
import React, { useRef, useEffect, createRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { drawLayers, drawPositionsOnMap } from './randomFunctions';
import { StoreContext } from './Store';
import { isEmpty } from 'lodash'
import { useObserver } from 'mobx-react'
import { toJS } from 'mobx';

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'


mapboxgl.workerClass = MapboxWorker
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbWV0cml4ZGV2IiwiYSI6ImNrcHdoYjZsajAxMG4yd253aWIyeHRvdG4ifQ.kB-1WgIHJ3GELwh14NilPw'



export const Map = () => {

    const clearMap = () => {
        if (store.markers.length > 0) {
            for (const currentMarker of store.markers) {
                currentMarker.remove()
            }
        }
    }
    const mapContainer = useRef(null);
    /* References */
    const store = useContext(StoreContext)
    const map = useRef();
    // initialize map when component mounts
    useEffect(() => {
        if (isEmpty(map.current)) {
            const checkt = store.renderMapTrigger;
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                // See style options here: https://docs.mapbox.com/api/maps/#styles
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [24.878853391086857, 60.20673161432754],
                zoom: 10,
            });
            // add navigation control (the +/- zoom buttons)
            map.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        } else {

            const positionsAsJsArray = toJS(store.positions);
            if (!isEmpty(positionsAsJsArray)) {
                if (!store.positionsDrawn) {
                    clearMap();
                    drawPositionsOnMap(positionsAsJsArray, map.current, store);
                    store.positionsDrawn = true;
                }
            }
        }
        // clean up on unmount
        //return () => map.current.remove();
    }, [store.renderMapTrigger]);

    const observeMapChanges = () => {
        if (store.renderMapTrigger) {
            return null
        }
    }

    return useObserver(() => (
        <div>
            {observeMapChanges()}
            <div className={'map-container'} ref={mapContainer} />
        </div>
    ))
};



//export default observer(Map);