import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useField } from 'formik'; // برای اتصال به فرمیک
import 'leaflet/dist/leaflet.css';

const Map = ({ row }) => {

    const [selectedPosition, setSelectedPosition] = useState({
        lat: row?.latitude || 10,
        lng: row?.longitude || 10,
      });
      
  const [, , { setValue }] = useField('latitude');
  const [, , { setValue: setLongitude }] = useField('longitude');

  useEffect(() => {
    setValue(selectedPosition.lat.toString());  
    setLongitude(selectedPosition.lng.toString());  
  }, [selectedPosition, setValue, setLongitude]);

  const MapEvents = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedPosition({ lat, lng });
      },
    });

    return null;
  };

  return (
    <div style={{ width: '100%', height: '300px', borderRadius: '10px' }}>
      <MapContainer
        center={[selectedPosition.lat, selectedPosition.lng]}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[selectedPosition.lat, selectedPosition.lng]}>
          <Popup>
            موقعیت انتخاب شده: <br />
            Lat: {selectedPosition.lat}, Lng: {selectedPosition.lng}
          </Popup>
        </Marker>
        <MapEvents />
      </MapContainer>
    </div>
  );
};

export default Map;
