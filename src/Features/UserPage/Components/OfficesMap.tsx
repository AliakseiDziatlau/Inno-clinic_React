import React from 'react';
import { OfficesMapProps } from '../Types/OpenMap.ts';
import '../Styles/DoctorsModalWindow.css';
import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

const OfficesMap: React.FC<OfficesMapProps> = ({
    handleCloseMapBtn
}) => {
    return (
        <div>
            <button 
                className="close-button"
                onClick={handleCloseMapBtn}
            >
                &times;
            </button>
            <MapContainer center={[48.8556, 2.3522]} zoom={13} className="leaflet-container">
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
            </MapContainer>
        </div>
    );
}

export default OfficesMap;