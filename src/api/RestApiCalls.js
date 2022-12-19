import axios from 'axios'

const testFetch = async () => {
    const url = "http://localhost:8080/getRoutes"
    try {
        const response = await axios.get(url)
        return 2
    } catch (error) {
        console.error(error)
        console.log(error)
    }
    return null
}


export default testFetch;