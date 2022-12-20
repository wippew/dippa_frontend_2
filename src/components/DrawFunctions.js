
const colors = ["#00A52A", "#808080"];


const drawLayersForVehicle = (map, positions, vehicleId) => {
      map.addSource('route'+vehicleId, {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': positions
          }
        }
      });
      map.addLayer({
        'id': 'route'+ vehicleId,
        'type': 'line',
        'source': 'route'+ vehicleId,
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': colors[vehicleId],
          'line-width': 4
        }
      });
  };





  export default drawLayersForVehicle;