import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ center, markerPosition }) => {
    return (
        <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={markerPosition}>
                <Popup>Your Location</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
