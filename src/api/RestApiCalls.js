import axios from 'axios'
import base64 from 'react-native-base64'
import { isEmpty } from 'lodash'

export const testFetch = async (store) => {
    const testJson = createJsonObject(store);
    const url = 'http://localhost:8080/routes';
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
    newDepot.depotName = "depot0";
    newDepot.order = order;
    const coordinates = {};
    // 60 first
    coordinates.lat = store.firstDepotCoords[0];
    coordinates.lon = store.firstDepotCoords[1];
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;

    const asd = store.firstDepotVehicleIds;

    for (let i = 0; i < store.firstDepotVehicleIds.length; i++) {
        const resourceId = store.firstDepotVehicleIds[i];
        addVehicleToDepot(i, resourceId, newDepot.vehicles);
    }
    
    emptyJson.push(newDepot);
}

const createSecondDepot = (store, emptyJson, order) => {    
    const newDepot = {};
    newDepot.depotName = "depot1";
    newDepot.order = order;
    const coordinates = {};
    // 60 first
    coordinates.lat = store.secondDepotCoords[0];
    coordinates.lon = store.secondDepotCoords[1];
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;
    for (let i = 0; i < store.secondDepotVehicleIds.length; i++) {
        const resourceId = store.secondDepotVehicleIds[0];
        addVehicleToDepot(i, resourceId, newDepot.vehicles);
    }
    
    emptyJson.push(newDepot);
}

const addVehicleToDepot = (vehicleId, resourceId, garageObject) => {
    const newVehicle = {};
    newVehicle.id = vehicleId;
    newVehicle.resourceId = resourceId;
    newVehicle.competence = 2;
    garageObject.push(newVehicle);
}


export const getDepots = async () => {
    const url = 'http://192.168.50.100/to/REST/v1/optimization/depots';
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
    const url = 'http://192.168.50.100/to/REST/v1/optimization/' + id;
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

