import React from 'react';
import '../Styles/DoctorsModalWindow.css';
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/MapPage.css";
import { MapMarker } from '../Types/MapMarker.ts';
import { Icon } from "leaflet";
const MapPage: React.FC = () => {

    const markers: MapMarker[]  = [
        { geocode: [52.2298, 21.0122], popUp: "Center of Warsaw" },
        { geocode: [52.2370, 21.0175], popUp: "Old Town Market Square" },
        { geocode: [52.2220, 21.0055], popUp: "Lazienki Park" },
        { geocode: [52.2326, 21.0153], popUp: "Palace of Culture and Science" },
        { geocode: [52.2555, 20.9983], popUp: "Warsaw Uprising Museum" }
    ];

    const customIcon = new Icon({
        iconUrl: require("../../../img/mapIcon.png"),
        iconSize: [38, 38],
    });


    return (
        <div>
            <MapContainer center={[52.2298, 21.0122]} zoom={13} className="leaflet-container">
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {markers.map(marker => (
                    <Marker position={marker.geocode} icon={customIcon}></Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default MapPage;