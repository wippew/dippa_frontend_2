/* src/App.js */
import React, { useRef, useEffect, createRef, useContext } from 'react';
import mapboxgl from 'mapbox-gl';
import { drawLayers, drawPositionsOnMap } from './randomFunctions';
import { StoreContext } from './Store';
import { observer } from "mobx-react";
import { isEmpty } from 'lodash'
import { useObserver } from 'mobx-react'
import { toJS } from 'mobx';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VvbWV0cml4ZGV2IiwiYSI6ImNrcHdoYjZsajAxMG4yd253aWIyeHRvdG4ifQ.kB-1WgIHJ3GELwh14NilPw'

export const Map = () => {
    const mapContainer = useRef(null);
    /* References */
    const store = useContext(StoreContext)
    const map = useRef();
    console.log("MAP RENDERS");
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
                console.log("HERE AT DRAW");
                const asdads = store.positionsDrawn;
                if (!store.positionsDrawn) {
                    console.log("NOT DRAWN");
                    drawPositionsOnMap(positionsAsJsArray, map.current);
                    store.positionsDrawn = true;
                    console.log(store.layersDrawn);
                    // if (store.layersDrawn == false && store.vehicleCount != null) {
                    //     console.log("SHOULD DRAW LAYERS");
                    //     drawLayers(positionsAsJsArray, map.current, Number(store.vehicleCount));
                    //     store.layersDrawn = true;
                    //     //store.renderMap();
                    // }
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