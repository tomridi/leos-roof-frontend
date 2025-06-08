// src/components/MapComponent.jsx

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS

// IMPORTANT: Leaflet's default icon paths are often broken when used with bundlers.
// This is a common workaround to fix them.
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Custom marker icon (optional)
const customMarkerIcon = new L.Icon({
    iconUrl: '/markers/custom-marker.svg', // Path to your custom marker image in `public/`
    iconSize: [38, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Define props for better type safety if using TypeScript
// interface MapComponentProps {
//   latitude: number;
//   longitude: number;
//   zoom?: number;
// }

// export default function MapComponent({ latitude, longitude, zoom = 13 }: MapComponentProps) {
export default function MapComponent({ latitude, longitude, zoom = 10 }) {
  const position = [latitude, longitude];

  return (
    <div className="h-[350px] relative z-1"> {/* Wrapper div to give map dimensions */}
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false} // Disable scroll wheel zoom for better UX on static pages
        style={{ height: '100%', width: '100%' }} // MapContainer fills the wrapper div
      >
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // <-- Double check this line carefully
        />

        {/* You can add more markers, polylines, polygons, etc. here */}
        {/*
        <Marker position={[latitude + 0.002, longitude + 0.002]} icon={customMarkerIcon}>
          <Popup>
            <b>Hello world!</b>I am a custom marker.
          </Popup>
        </Marker>
        */}
      </MapContainer>
    </div>
  );
}