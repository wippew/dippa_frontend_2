import axios from 'axios'

const testFetch = async () => {
    const url = "http://localhost:8080/getRoutes"
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}


export default testFetch;