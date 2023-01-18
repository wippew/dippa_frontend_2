import testFetch from '../api/RestApiCalls';
import mapboxgl from 'mapbox-gl';
import drawLayersForVehicle from './DrawFunctions';



export const getRoutes = async (depot1VehicleCount, depot2VehicleCount) => {
    const depot1VehicleCountAsNumber = Number(depot1VehicleCount);
    const depot2VehicleCountAsNumber = Number(depot2VehicleCount);
    // fetch new data
    // const results = await fetchFakeData(lng, lat);
    const test = await testFetch(depot1VehicleCountAsNumber, depot2VehicleCountAsNumber);
    const positions = [];
    // iterate through the feature collection and append marker to the map for each feature
    for (let i = 0; i < test.features.length; i++) {
        const currentRes = test.features[i];
        const id = i;
        const vehicle = currentRes.vehicle;
        const coordinates = currentRes.coordinates;
        const order = currentRes.order;
        const type = currentRes.type;

        positions.push({
            id: id,
            vehicle: vehicle,
            coordinates: coordinates,
            order: order,
            type: type
        });
    }

    return positions;
}

export const drawPositionsOnMap = (positionsMap, map, store) => {
    // iterate through the feature collection and append marker to the map for each feature
    for (let i = 0; i < positionsMap.length; i++) {
        const currentRes = positionsMap[i];
        const id = i;
        const vehicle = currentRes.vehicle;
        const coordinates = currentRes.coordinates;
        const swappedCoordinates = [];
        swappedCoordinates.push(coordinates[1]);
        swappedCoordinates.push(coordinates[0]);
        const order = currentRes.order;
        const type = currentRes.type;
        const el = document.createElement('div');
        if (vehicle == "0") {
            console.log("AAAAAAAAA");
            el.className = 'marker0';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        } else if (vehicle == "1") {
            el.className = 'marker1';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        } else if (vehicle == "2") {
            el.className = 'marker2';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        } else if (vehicle == "3") {
            el.className = 'marker3';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        } else if (vehicle == "4") {
            el.className = 'marker4';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        } else if (vehicle == "5") {
            el.className = 'marker5';
            el.innerHTML = '<span><b>' + order + '</b></span>'
            const marker = new mapboxgl.Marker(el)
                .setLngLat(swappedCoordinates)
                .setPopup(new mapboxgl.Popup({ closeButton: false, className: "testboss", }).setText(type))
                .addTo(map);
            store.markers.push(marker);
        }
    }
}

export const getRoutesAndDrawOnMap = async (map, vehicleCount) => {
    const numberVehicleCount = Number(vehicleCount);
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

    
    // for (let i = 0; i < numberVehicleCount; i++) {
    //     const vehiclePositions = [];
    //     for (let entry of positions) {
    //         if (entry.key == i.toString()) {
    //             vehiclePositions.push(entry.value);
    //         }
    //     }
    //     vehiclePositions.push(vehiclePositions[0]);
    //     drawLayersForVehicle(map, vehiclePositions, i);
    // }


}

export const drawLayers = (positionsMap, map, vehicleCount) => {
    
    for (let i = 0; i < vehicleCount; i++) {
        const newPositions = [];
        for (let j = 0; j < positionsMap.length; j++) {
            if (positionsMap[j].vehicle == '0') {
                newPositions.push(positionsMap[j].coordinates);
            }
        }
        drawLayersForVehicle(map, newPositions, i);
    } 
}
export default {

}