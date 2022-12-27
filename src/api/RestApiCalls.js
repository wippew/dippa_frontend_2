import axios from 'axios'

const testFetch = async () => {
    const url = "http://localhost:8080/getRoutes2"
    try {
        console.log("NOTHING YET FOUND");
        const response = await axios.get(url);
        console.log("NOW FOUND");
        return response.data
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}


export default testFetch;