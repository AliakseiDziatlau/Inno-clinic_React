import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/DoctorsModalWindow.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/MapPage.css";
import { MapMarker } from '../Types/MapMarker.ts';
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { MarkerCluster } from "leaflet.markercluster";
import OfficeModalWindow from './OfficeMadalWindow.tsx';
import { useState, useEffect } from 'react';
import { getOffices } from '../Api/OfficeMethod.ts';
import { Office } from '../Types/Office.ts';

const MapPage: React.FC = () => {
    const [isOfficeWindowOpened, setIsOfficeWindowOpened] = useState<boolean>(false);
    const navigate = useNavigate();
    const [offices, setOffices] = useState<Office[]>([]);

    useEffect(() => {
        const fetchOffices = async () => {
            const officesList = await getOffices();
            setOffices(officesList);
            console.log(officesList);
        };

        fetchOffices();
    }, []);

    const markers: MapMarker[] = offices
    .filter(office => office.latitude !== undefined && office.longitude !== undefined)
    .map(office => ({
        geocode: [office.latitude as number, office.longitude as number], 
        popUp: office.address,
    }));


    // const markers: MapMarker[]  = [
    //     { geocode: [52.2249504, 20.9910874], popUp: "new marker" },
    //     { geocode: [52.2370, 21.0175], popUp: "Old Town Market Square" },
    //     { geocode: [52.2220, 21.0055], popUp: "Lazienki Park" },
    //     { geocode: [52.2326, 21.0153], popUp: "Palace of Culture and Science" },
    //     { geocode: [52.2555, 20.9983], popUp: "Warsaw Uprising Museum" }
    // ];

    const customIcon = new Icon({
        iconUrl: require("../../../img/mapIcon.png"),
        iconSize: [38, 38],
    });

    const createCustomClusterIcon = (cluster: any) => {
        return divIcon({
            html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
            className: "custom-cluster-icon",
            iconSize: point(33, 33, true),
        });
    };

    const handlePopupClick = () => {
        setIsOfficeWindowOpened(true);
    }

    const handleCloseModalWindow = () => {
        setIsOfficeWindowOpened(false);
    }

    const closeMap = () => {
        navigate('/profile');
    }


    return (
        <div>
            <button className="close-button" onClick={closeMap}>&times;</button>
            <MapContainer center={[52.2298, 21.0122]} zoom={13} className="leaflet-container">
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={createCustomClusterIcon}
                >
                    {markers.map((marker,index) => (
                        <Marker 
                            key={index}
                            position={marker.geocode} 
                            icon={customIcon}
                            eventHandlers={{
                                click: () => handlePopupClick() 
                            }}
                        >
                            <Popup>
                                <h2>{marker.popUp}</h2>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            {isOfficeWindowOpened && 
                <OfficeModalWindow
                    handleCloseModalWindow={handleCloseModalWindow}
                />
            }
        </div>
    );
}

export default MapPage;