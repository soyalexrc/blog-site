import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {useEffect, useRef} from 'react';

export default function Map({ longitud, latitude }) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleHJvZHJpZ3VlejIxIiwiYSI6ImNsMnpwdHNjajFmM24zZG81MW51b3o3ZW8ifQ.z-t5B5yuxbxMWMSOGLfEBg'

  const mapContainer = useRef(null);
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return;

    if (longitud && latitude) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitud, latitude],
        zoom: 5
      })
    }
  }, [ longitud, latitude ])

  return (
    <div ref={mapContainer} className='map' />
  )
}
