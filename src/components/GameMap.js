import React from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup,
    Circle,
    Rectangle,
    FeatureGroup,
} from 'react-leaflet';
import { Icon } from 'leaflet';
const center = [51.505, -0.09];
const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
];

const GameMap = () => {
    const position = [8.1386, 5.1026]; // [latitude, longitude]
    const zoomLevel = 15;
    const codingSpot = new Icon({
        iconUrl: '/computer-solid.svg',
        iconSize: [30, 125],
        iconAnchor: [40, 90],
        popupAnchor: [-25, -40],
    });
    return (
        // <MapContainer className="w-100" center={position} zoom={zoomLevel} scrollWheelZoom={false}>
        //     <TileLayer
        //         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     />
        //     <Marker position={position} icon={codingSpot}>
        //         <Popup>
        //             Omu-Aran the Head Post of Igbomina land, is a town in the Nigerian state of Kwara. It originated
        //             from Ife and currently the local government headquarters of Irepodun local government.
        //         </Popup>
        //     </Marker>
        // </MapContainer>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
                <LayersControl.Overlay name="Marker with popup">
                    <Marker position={center}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Layer group with circles">
                    <LayerGroup>
                        <Circle center={center} pathOptions={{ fillColor: 'blue' }} radius={200} />
                        <Circle center={center} pathOptions={{ fillColor: 'red' }} radius={100} stroke={false} />
                        <LayerGroup>
                            <Circle
                                center={[51.51, -0.08]}
                                pathOptions={{ color: 'green', fillColor: 'green' }}
                                radius={100}
                            />
                        </LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Feature group">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                        <Popup>Popup in FeatureGroup</Popup>
                        <Circle center={[51.51, -0.06]} radius={200} />
                        <Rectangle bounds={rectangle} />
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>
        </MapContainer>
    );
};
export default GameMap;
