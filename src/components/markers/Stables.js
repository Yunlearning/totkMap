import React, { useState, useEffect } from 'react';
import { transData } from '../../util/utility';
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
const Stables = (props) => {
    const { mapLv } = props;
    const map = useMap();
    // const [stables, SetStables] = useState(stablesData);
    const [stables, SetStables] = useState([]);
    const markerIcon = new Icon({
        iconUrl: stableIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    useEffect(() => {
        fetch('http://localhost:8080/markers?markType=5')
            .then((res) => {
                if (!res.ok) {
                    throw Error('Could not fetch markers.');
                } else {
                    return res.json();
                }
            })
            .then((datas) => {
                const output = datas.markers.map((marker) => {
                    return transData(marker.markName, marker.level, marker.coord_x, marker.coord_y, '');
                });
                SetStables(output);
            });
    }, []);
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
