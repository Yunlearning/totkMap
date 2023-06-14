import React, { useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import towerIcon from '../../assets/marker/tower_r.png';
import MapLayers from './mapLayers';
const towersData = [
    {
        coords: [17102, 14571],
        name: 'Lookout Landing Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [15715, 18058],
        name: 'Hyrule Field Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [12270, 11264],
        name: "Lindor's Brow Skyview Tower",
        text: '',
        level: 'surface',
    },
    {
        coords: [11065, 5812],
        name: 'Pikida Stonegrove Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [28498, 8923],
        name: 'Ulri Mountain Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [26597, 13257],
        name: 'Upland Zorana Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [22925, 11428],
        name: 'Eldin Canyon Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [19031, 5575],
        name: 'Thyphio Ruins Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [6961, 7961],
        name: 'Rospro Pass Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [10684, 21550],
        name: 'Gerudo Canyon Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [19813, 21381],
        name: 'Popla Foothills Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [6117, 18918],
        name: 'Gerudo Highlands Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [22023, 18535],
        name: 'Sahasra Slope Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [25260, 23264],
        name: 'Rabella Wetlands Skyview Tower',
        text: '',
        level: 'surface',
    },
    {
        coords: [29543, 18946],
        name: 'Mount Lanayru Skyview Tower',
        text: '',
        level: 'surface',
    },
];

const Towers = (props) => {
    const { mapLv } = props;
    const map = useMap();
    const [towers, SetTowers] = useState(towersData);
    const markerIcon = new Icon({
        iconUrl: towerIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    return (
        <MapLayers layerName="Towers" checked={true}>
            {towers.map((tower, index) => {
                if (tower.level === mapLv) {
                    const position = map.unproject(tower.coords, 8);
                    return (
                        <Marker key={index} position={position} icon={markerIcon}>
                            <Popup>{tower.name}</Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapLayers>
    );
};
export default Towers;
