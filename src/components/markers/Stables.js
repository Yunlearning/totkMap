import React, { useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import stableIcon from '../../assets/marker/stable_r.png';
import MapLayers from './mapLayers';
const stablesData = [
    {
        coords: [17260, 14834],
        name: 'Mini Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [19016, 18285],
        name: 'Riverside Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [13914, 12827],
        name: 'New Serenne Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [30683, 6758],
        name: 'East Akkala Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [21195, 11576],
        name: 'Woodland Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [9594, 21684],
        name: 'Gerudo Canyon Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [9207, 13362],
        name: 'Tabantha Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [13034, 7288],
        name: 'Snowfield Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [20666, 15522],
        name: 'Wetland Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [13651, 18813],
        name: 'Outskirt Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [19587, 25354],
        name: 'Highland Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [22657, 25618],
        name: 'Lakeside Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [23285, 20781],
        name: 'Dueling Peaks Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [25843, 11569],
        name: 'Foothill Stable',
        text: '',
        level: 'surface',
    },
    {
        coords: [27449, 9929],
        name: 'South Akkala Stable',
        text: '',
        level: 'surface',
    },
];
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

const Stables = (props) => {
    const { mapLv } = props;
    const map = useMap();
    const [stables, SetStables] = useState(stablesData);
    const markerIcon = new Icon({
        iconUrl: stableIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    return (
        <MapLayers layerName="Stables" checked={false}>
            {stables.map((stable, index) => {
                if (stable.level === mapLv) {
                    const position = map.unproject(stable.coords, 8);
                    return (
                        <Marker key={index} position={position} icon={markerIcon}>
                            <Popup>{stable.name}</Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapLayers>
    );
};
export default Stables;
