import axios from 'axios'

const testFetch = async (vehicleCount) => {
    console.log("trying to fetch");
    const url = 'http://localhost:8080/getRoutes';
    try {
        const response = await axios.get(url, { params: { vehicleCount: vehicleCount } });
        console.log(response);
        return response.data
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}


export default testFetch;