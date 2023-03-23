import axios from 'axios'
import base64 from 'react-native-base64'
import { isEmpty } from 'lodash'

let vehicleIdCurrent = 0;


export const testFetch = async (store) => {
    const testJson = createJsonObject(store);
    const url = '/optimointi-api';
    try {
        const response = await axios.post(url, testJson);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}

const createJsonObject = (store) => {
    const emptyJsonList = [];
    let orderNumber = 0;
    if (!isEmpty(store.firstDepotVehicleIds)) {
        createFirstDepot(store, emptyJsonList, orderNumber.toString());
        orderNumber++;
    }

    if (!isEmpty(store.secondDepotVehicleIds)) {
        createSecondDepot(store, emptyJsonList, orderNumber.toString());
    }
    
    return emptyJsonList;
}

const createFirstDepot = (store, emptyJson, order) => {    
    const newDepot = {};
    newDepot.depotName = "FirstDepot";
    newDepot.order = order;
    const coordinates = {};
    coordinates.lat = store.firstDepotCoords[0];
    coordinates.lon = store.firstDepotCoords[1];
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;


    for (let i = 0; i < store.firstDepotVehicleIds.length; i++) {
        const resourceId = store.firstDepotVehicleIds[i];
        addVehicleToDepot(vehicleIdCurrent, resourceId, newDepot.vehicles);
    }
    
    emptyJson.push(newDepot);
}

const createSecondDepot = (store, emptyJson, order) => {    
    const newDepot = {};
    newDepot.depotName = "SecondDepot";
    newDepot.order = order;
    const coordinates = {};
    coordinates.lat = store.secondDepotCoords[0];
    coordinates.lon = store.secondDepotCoords[1];
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;
    for (let i = 0; i < store.secondDepotVehicleIds.length; i++) {
        const resourceId = store.secondDepotVehicleIds[i];
        addVehicleToDepot(vehicleIdCurrent, resourceId, newDepot.vehicles);
    }
    
    emptyJson.push(newDepot);
}

const addVehicleToDepot = (vehicleOrder, resourceId, garageObject) => {
    const newVehicle = {};
    newVehicle.vehicleOrder = vehicleOrder;
    newVehicle.resourceId = resourceId;
    newVehicle.competence = 2;
    garageObject.push(newVehicle);
    vehicleIdCurrent++;
}


export const getDepots = async () => {
    const url = '/to/REST/v1/optimization/depots';
    const base64EncodedUserAndPass = base64.encode("KPA02.tyonjohtaja" + ":" + "testi1");
    try {
        const config = {
            url: url,
            method: 'GET',
            headers: { Authorization: "Basic " + base64EncodedUserAndPass },
            transformResponse: [(data) => {
              return data
            }]
          }
        const response = await axios(config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}

export const getGroupsWithDepotId = async (id) => {
    const url = '/to/REST/v1/optimization/' + id;
    const base64EncodedUserAndPass = base64.encode("KPA02.tyonjohtaja" + ":" + "testi1");
    try {
        const config = {
            url: url,
            method: 'GET',
            params: { depotId: id },
            headers: { Authorization: "Basic " + base64EncodedUserAndPass },
            transformResponse: [(data) => {
              return data
            }]
          }
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error(error);
        console.log(error);
    }
    return null
}

