import React, { useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import lightRootIcon from '../../assets/marker/lightroot_r.png';
import MapLayers from './mapLayers';
const lightRootsData = [
    {
        coords: [17367, 13623],
        name: 'Kyononis Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [19009, 13604],
        name: 'Yamiyo Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [17283, 16130],
        name: 'Jiosin Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [15651, 16284],
        name: 'Susuyai Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [15360, 13734],
        name: 'Ishodag Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [17779, 18351],
        name: 'Teniten Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [19023, 18011],
        name: 'Tajikats Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [13738, 12732],
        name: 'Sinakawak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [13728, 19069],
        name: 'Tsutsu-um Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [10427, 11492],
        name: 'Runakit Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [20603, 21816],
        name: 'Jiukoum Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [14497, 7188],
        name: 'Mayausiy Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [20089, 6634],
        name: 'Sikukuu Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [23406, 10065],
        name: 'Timawak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [25711, 11246],
        name: 'Kisi-Nona Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [27911, 10677],
        name: 'Domizuin Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [29508, 8096],
        name: 'Sinatanika Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [31033, 6380],
        name: 'Jochi-iu Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [27911, 13742],
        name: 'Mogawak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [7031, 9573],
        name: 'Gatakis Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [8782, 10156],
        name: 'Oromuwak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [7936, 7848],
        name: 'Sahirow Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [9475, 13104],
        name: 'Makurukisa Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [7509, 15592],
        name: 'Tsurakawaka Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [4588, 17022],
        name: 'Otutsum Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [4076, 19525],
        name: 'Mayamats Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [5494, 21419],
        name: 'Kudanisar Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [3953, 24255],
        name: 'Miryotanog Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [6800, 25869],
        name: 'Karahatag Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [13075, 7062],
        name: 'Orochium Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [14679, 8727],
        name: 'Kiuyoyou Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [16810, 6800],
        name: 'Kikakin Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [12235, 16094],
        name: 'Sonapan Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [10044, 21716],
        name: 'Turakamik Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [8129, 22539],
        name: 'Mayatat Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [6341, 23900],
        name: 'Soryotanog Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [5537, 26488],
        name: 'Irasak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [10666, 25016],
        name: 'Siwakama Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [12614, 25392],
        name: 'Gerudo Desert 3',
        text: '',
        level: 'depths',
    },
    {
        coords: [13393, 23782],
        name: 'Kitawak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [12619, 22258],
        name: 'Jee Noh Lightroot',
        text: 'unconfirmed',
        level: 'depths',
    },
    {
        coords: [11889, 20566],
        name: 'Rakakudaj Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [7764, 19132],
        name: 'Rotsumamu Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [8445, 23972],
        name: 'Gerudo Desert 5',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [20028, 25070],
        name: 'Utsushok Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [22531, 25739],
        name: 'Joju-u-u Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [26469, 24794],
        name: 'Shifumimi Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [27275, 24638],
        name: 'Bamitok Lightroot',
        text: 'Entrance: 3225, -3020, 60</br>Unconfirmed',
        level: 'depths',
    },
    {
        coords: [28413, 21561],
        name: 'Zamikako Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [29189, 21170],
        name: 'Maya-Hisika Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [31251, 16868],
        name: 'Yomizuk Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [29639, 15639],
        name: 'Apogeke Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [29364, 13284],
        name: 'Ihen-a Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [31489, 12549],
        name: 'Gatanisis Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [31964, 3866],
        name: 'Igasyuku Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [31524, 8665],
        name: 'Gemimik Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [26592, 4098],
        name: 'Kimayat Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [28298, 4930],
        name: 'Kamatukis Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [25205, 5159],
        name: 'Sibajitak Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [23296, 7456],
        name: 'Marakuguc Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [23877, 6734],
        name: 'Momosik Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [25157, 7230],
        name: 'Sitsum Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [27181, 9509],
        name: 'Maya-Tidegina Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [29444, 11359],
        name: 'Jochi-Ihiga Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [30503, 11048],
        name: 'Rasitakivaka Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [24822, 14569],
        name: 'Maoi Keska Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [23250, 14983],
        name: 'Jonsau Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [20751, 15769],
        name: 'Tukarok Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [21530, 17331],
        name: 'Moronku Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [23317, 18161],
        name: 'Makasura Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [22679, 20834],
        name: 'Eshos Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [21653, 22626],
        name: 'Utojishi Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [18623, 22920],
        name: 'En-oma Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [13678, 19847],
        name: 'Ryogoko Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [15884, 17589],
        name: 'Ma-Yatinou Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [20801, 20699],
        name: 'Jochishiu Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [31910, 26118],
        name: 'Marari-Ina Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [31782, 5135],
        name: 'Rasikawa Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [18654, 11759],
        name: 'Sepapa Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [20287, 12527],
        name: 'Ren-Ize Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [21605, 14019],
        name: 'Jod-Zeniu Lightroot',
        text: 'Unconfirmed',
        level: 'depths',
    },
    {
        coords: [17452, 19686],
        name: 'Kamizuna Lightroot',
        text: '',
        level: 'depths',
    },
    {
        coords: [13806, 3972],
        name: 'Lightroot',
        text: 'Mallet Smash',
        level: 'depths',
    },
    {
        coords: [19396, 8436],
        name: 'Musanokir Lightroot',
        text: 'Swing to Hit',
        level: 'depths',
    },
];
const reverseString = (str) => {
    str = str.split(' ');
    const trans = str[0].toLowerCase().split('').reverse().join('');
    return `${trans.charAt(0).toUpperCase()}${trans.slice(1)} ${str[1]}`;
};
const LightRoots = (props) => {
    const { mapLv } = props;
    const map = useMap();
    const [lightRoots, SetLightRoots] = useState(lightRootsData);
    const markerIcon = new Icon({
        iconUrl: lightRootIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    return (
        <MapLayers layerName="LightRoots" checked={false}>
            {lightRoots.map((lightRoot, index) => {
                if (lightRoot.level === mapLv) {
                    const position = map.unproject(lightRoot.coords, 8);
                    const nameTrans = reverseString(lightRoot.name);
                    return (
                        <Marker key={index} position={position} icon={markerIcon}>
                            <Popup>{nameTrans}</Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapLayers>
    );
};
export default LightRoots;
