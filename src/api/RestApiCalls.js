import axios from 'axios'

const testFetch = async (depot1VehicleCount, depot2VehicleCount) => {
    const testJson = createMockJsonObject();
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

const createMockJsonObject = () => {
    const emptyJsonList = [];
    createDepot(emptyJsonList);
    return emptyJsonList;
}

const createDepot = (emptyJson) => {    
    const newDepot = {};
    newDepot.depotName = "depot0";
    newDepot.order = "0";
    const coordinates = {};
    coordinates.lat = 60.53811759606013;
    coordinates.lon = 22.418483915615745;
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;    
    addVehicleToDepot(0, newDepot.vehicles);
    emptyJson.push(newDepot);
}

const addVehicleToDepot = (vehicleName, garageObject) => {
    const newVehicle = {};
    newVehicle.id = vehicleName;
    newVehicle.resourceId = 63406;
    newVehicle.competence = 2;
    garageObject.push(newVehicle);
}



export default testFetch;