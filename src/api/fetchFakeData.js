import data from './mockData.json'


const fetchFakeData = (lng, lat) => {
    const newFeaturesList = [];
    for (let i = 0; i < data.features.length; i++) {
      const id = i;
      newFeaturesList[i] = data.features[i];
    }
  
    return Promise.resolve({
      type: 'FeatureCollection',
      features: newFeaturesList,
    });
  };
    
  /**
   * Generates a random point within 0.025 radius of map center coordinates.
   * @param {CoordinatePair} centerCoordinates - the {@link CoordinatePair} for the map center
   * @return {CoordinatePair} randomly generated coordinate pair
   */
  const getRandomCoordinate = (lon, lat) => {
    const r = 0.025 * Math.sqrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const latitude = lat + r * Math.cos(theta);
    const longitude = lon + r * Math.sin(theta);
    return { longitude, latitude };
  };
  
  export default fetchFakeData;