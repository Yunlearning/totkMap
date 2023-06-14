import React, { useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import tearIcon from '../../assets/marker/tear_r.png';
import MapLayers from './mapLayers';
const tearsData = [
    {
        coords: [13761, 12093],
        name: 'Where Am I?',
        text: 'Tear of the Dragon #1',
        level: 'surface',
    },
    {
        coords: [23484, 12785],
        name: "Mineru's Counsel",
        text: 'Tear of the Dragon #3',
        level: 'surface',
    },
    {
        coords: [31393, 15922],
        name: "The Sages' Vow",
        text: 'Tear of the Dragon #9',
        level: 'surface',
    },
];

const DragonsTear = (props) => {
    const { mapLv } = props;
    const map = useMap();
    const [tears, SetTears] = useState(tearsData);
    const markerIcon = new Icon({
        iconUrl: tearIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    return (
        <MapLayers layerName="Tears" checked={false}>
            {tears.map((tear, index) => {
                if (tear.level === mapLv) {
                    const position = map.unproject(tear.coords, 8);
                    return (
                        <Marker key={index} position={position} icon={markerIcon}>
                            <Popup>{tear.name}</Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapLayers>
    );
};
export default DragonsTear;
