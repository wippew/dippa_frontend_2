import axios from 'axios'

const testFetch = async (depot1VehicleCount, depot2VehicleCount) => {
    console.log("trying to fetch");
    const testJson = createMockJsonObject();
    const url = 'http://localhost:8080/getRoutes';
    try {
        const response = await axios.get(url,
            { params: { depot1VehicleCount: depot1VehicleCount, depot2VehicleCount: depot2VehicleCount } }
        );
        console.log(response);
        return response.data
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
    newDepot.depotName = "depot1";
    const coordinates = {};
    coordinates.x = 60.12;
    coordinates.y = 21.12;
    const vehicles = [];
    newDepot.coordinates = coordinates;
    newDepot.vehicles = vehicles;    
    addVehicleToDepot("vehicle1", newDepot.vehicles);
    addVehicleToDepot("vehicle2", newDepot.vehicles);
    emptyJson.push(newDepot);
}

const addVehicleToDepot = (vehicleName, garageObject) => {
    const newVehicle = {};
    newVehicle.id = vehicleName;
    newVehicle.competence = 2;
    garageObject.push(newVehicle);
}



export default testFetch;