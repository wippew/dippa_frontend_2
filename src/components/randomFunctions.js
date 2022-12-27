import testFetch from '../api/RestApiCalls';
import mapboxgl from 'mapbox-gl';
import drawLayersForVehicle from './DrawFunctions';

const getRoutesAndDrawOnMap = async (map, vehicleCount) => {
    const numberVehicleCount = Number(vehicleCount);
    // fetch new data
    // const results = await fetchFakeData(lng, lat);
    const test = await testFetch(vehicleCount);
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


    for (let i = 0; i < numberVehicleCount; i++) {
        const vehiclePositions = [];
        for (let entry of positions) {
            if (entry.key == i.toString()) {
                vehiclePositions.push(entry.value);
            }
        }
        vehiclePositions.push(vehiclePositions[0]);
        drawLayersForVehicle(map, vehiclePositions, i);
    }


}

export default getRoutesAndDrawOnMap;