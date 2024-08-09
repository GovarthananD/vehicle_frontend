import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect('http://localhost:6000');

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: 37.7749,
  lng: -122.4194
};

function App() {
  const [position, setPosition] = useState(center);
  const [path, setPath] = useState([center]);

  useEffect(() => {
    socket.on('vehiclePosition', (newPosition) => {
      setPosition(newPosition);
      setPath((prevPath) => [...prevPath, newPosition]);
    });
  }, []);
  return (
    <div className="App">
     <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={15}
      >
        <Marker position={position} />
        <Polyline path={path} options={{ strokeColor: '#FF0000' }} />
      </GoogleMap>
    </LoadScript>
    </div>
  );
}

export default App;
