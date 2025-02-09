import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/DoctorsModalWindow.css';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../Styles/MapPage.css";
import { MapMarker } from '../Types/MapMarker.ts';
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import OfficeModalWindow from './OfficeMadalWindow.tsx';
import { useState, useEffect } from 'react';
import { getOffices } from '../Api/OfficeMethod.ts';
import { Office } from '../Types/Office.ts';
import { Box } from "@mui/material";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import config from '../../../Configurations/Config.ts';

const MapPage: React.FC = () => {
    const [isOfficeWindowOpened, setIsOfficeWindowOpened] = useState<boolean>(false);
    const navigate = useNavigate();
    const [offices, setOffices] = useState<Office[]>([]);
    const [selectedOffice, setSelectedOffice] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOffices = async () => {
            try{
                const officesList = await getOffices();
                setOffices(officesList);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
            
        };

        fetchOffices();
    }, []);

    const markers: MapMarker[] = offices
    .filter(office => office.latitude !== undefined && office.longitude !== undefined)
    .map(office => ({
        geocode: [office.latitude as number, office.longitude as number], 
        popUp: office.address,
    }));

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

    const handlePopupClick = (address: string) => {
        setSelectedOffice(address);
        setIsOfficeWindowOpened(true);
    }

    const handleCloseModalWindow = () => {
        setIsOfficeWindowOpened(false);
        setSelectedOffice(null); 
    }

    const closeMap = () => {
        navigate(config.PatientPageUrl);
    }

    const handleSelectOffice = (officeAddress: string) => {
        navigate(config.PatientPageUrl, {state: {selectedOffice: officeAddress, openModal: true} });
    }

    return (
        <div>
            <button className="close-button" onClick={closeMap}>&times;</button>

            {isLoading ? (
                <Box 
                    display="flex" 
                    justifyContent="center" 
                    alignItems="center" 
                    height="100vh"
                >
                    <Stack spacing={2} direction="row" alignItems="center">
                        <CircularProgress size="3rem" />
                    </Stack>
                </Box>
            ) : (
                <MapContainer center={[52.2298, 21.0122]} zoom={13} className="leaflet-container">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />

                    <MarkerClusterGroup chunkedLoading iconCreateFunction={createCustomClusterIcon}>
                        {markers.map((marker, index) => (
                            <Marker
                                key={index}
                                position={marker.geocode}
                                icon={customIcon}
                                eventHandlers={{
                                    click: () => handlePopupClick(marker.popUp),
                                }}
                            >
                                <Popup>
                                    <h2>{marker.popUp}</h2>
                                </Popup>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>
                </MapContainer>
            )}

            {isOfficeWindowOpened && (
                <OfficeModalWindow
                    handleCloseModalWindow={handleCloseModalWindow}
                    officeAddress={selectedOffice ?? "No address available"}
                    handleSelectOffice={handleSelectOffice}
                />
            )}
        </div>
        // <div>
        //     <button className="close-button" onClick={closeMap}>&times;</button>
        //     <MapContainer center={[52.2298, 21.0122]} zoom={13} className="leaflet-container">
        //         <TileLayer 
        //             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //             url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        //         />

        //         <MarkerClusterGroup
        //             chunkedLoading
        //             iconCreateFunction={createCustomClusterIcon}
        //         >
        //             {markers.map((marker,index) => (
        //                 <Marker 
        //                     key={index}
        //                     position={marker.geocode} 
        //                     icon={customIcon}
        //                     eventHandlers={{
        //                         click: () => handlePopupClick(marker.popUp) 
        //                     }}
        //                 >
        //                     <Popup>
        //                         <h2>{marker.popUp}</h2>
        //                     </Popup>
        //                 </Marker>
        //             ))}
        //         </MarkerClusterGroup>
        //     </MapContainer>
        //     {isOfficeWindowOpened && 
        //         <OfficeModalWindow
        //             handleCloseModalWindow={handleCloseModalWindow}
        //             officeAddress={selectedOffice ?? "No address available"}
        //             handleSelectOffice={handleSelectOffice}
        //         />
        //     }
        // </div>
    );
}

export default MapPage;