'use client'
import React, { useState } from 'react'
import dynamic from 'next/dynamic';
import LocationForm from '@/components/LocationForm';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapWithNoSSR = dynamic(() => import('@/components/Map'), {
    ssr: false,
});

function Slider() {
    const mapStyle = {
        height: '700px', // Set the height of the map
        width: '100%', // Make the map take the full width of its container
    };
    return (
        <>
            <div style={{ height: '700px' }}>
                <MapContainer center={[51.505, -0.09]} zoom={1} scrollWheelZoom={false}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        </>
    )
}

export default Slider