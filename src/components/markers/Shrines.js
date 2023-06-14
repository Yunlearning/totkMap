import React, { useState } from 'react';
import { Icon } from 'leaflet';
import L from 'leaflet';
import { Marker, Popup, LayersControl, LayerGroup } from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import shrineIcon from '../../assets/marker/shrine_r.png';
import MapLayers from './mapLayers';
const shrinesData = [
    {
        coords: [17367, 13623],
        name: 'Kyononis Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [19009, 13604],
        name: 'Yamiyo Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [17283, 16130],
        name: 'Jiosin Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [15651, 16284],
        name: 'Susuyai Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [15360, 13734],
        name: 'Ishodag Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [17779, 18351],
        name: 'Teniten Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [19023, 18011],
        name: 'Tajikats Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [13738, 12732],
        name: 'Sinakawak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [13728, 19069],
        name: 'Tsutsu-um Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [10427, 11492],
        name: 'Runakit Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [20603, 21816],
        name: 'Jiukoum Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [14497, 7188],
        name: 'Mayausiy Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [20089, 6634],
        name: 'Sikukuu Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [23406, 10065],
        name: 'Timawak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [25711, 11246],
        name: 'Kisi-Nona Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [27911, 10677],
        name: 'Domizuin Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [29508, 8096],
        name: 'Sinatanika Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [31033, 6380],
        name: 'Jochi-iu Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [27911, 13742],
        name: 'Mogawak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [7031, 9573],
        name: 'Gatakis Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [8782, 10156],
        name: 'Oromuwak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [7936, 7848],
        name: 'Sahirow Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [9475, 13104],
        name: 'Makurukisa Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [7509, 15592],
        name: 'Tsurakawaka Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [4588, 17022],
        name: 'Otutsum Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [4076, 19525],
        name: 'Mayamats Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [5494, 21419],
        name: 'Kudanisar Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [3953, 24255],
        name: 'Miryotanog Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [6800, 25869],
        name: 'Karahatag Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [13075, 7062],
        name: 'Orochium Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [14679, 8727],
        name: 'Kiuyoyou Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [16810, 6800],
        name: 'Kikakin Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [12235, 16094],
        name: 'Sonapan Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [10044, 21716],
        name: 'Turakamik Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [8129, 22539],
        name: 'Mayatat Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [6341, 23900],
        name: 'Soryotanog Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [5537, 26488],
        name: 'Irasak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [10666, 25016],
        name: 'Siwakama Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [12614, 25392],
        name: 'Gerudo Desert 3',
        text: '',
        level: 'surface',
    },
    {
        coords: [13393, 23782],
        name: 'Kitawak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [12619, 22258],
        name: 'Jee Noh Shrine',
        text: 'unconfirmed',
        level: 'surface',
    },
    {
        coords: [11889, 20566],
        name: 'Rakakudaj Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [7764, 19132],
        name: 'Rotsumamu Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [8445, 23972],
        name: 'Gerudo Desert 5',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [20028, 25070],
        name: 'Utsushok Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [22531, 25739],
        name: 'Joju-u-u Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [26469, 24794],
        name: 'Shifumimi Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [27275, 24638],
        name: 'Bamitok Shrine',
        text: 'Entrance: 3225, -3020, 60</br>Unconfirmed',
        level: 'surface',
    },
    {
        coords: [28413, 21561],
        name: 'Zamikako Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [29189, 21170],
        name: 'Maya-Hisika Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [31251, 16868],
        name: 'Yomizuk Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [29639, 15639],
        name: 'Apogeke Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [29364, 13284],
        name: 'Ihen-a Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [31489, 12549],
        name: 'Gatanisis Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [31964, 3866],
        name: 'Igasyuku Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [31524, 8665],
        name: 'Gemimik Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [26592, 4098],
        name: 'Kimayat Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [28298, 4930],
        name: 'Kamatukis Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [25205, 5159],
        name: 'Sibajitak Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [23296, 7456],
        name: 'Marakuguc Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [23877, 6734],
        name: 'Momosik Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [25157, 7230],
        name: 'Sitsum Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [27181, 9509],
        name: 'Maya-Tidegina Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [29444, 11359],
        name: 'Jochi-Ihiga Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [30503, 11048],
        name: 'Rasitakivaka Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [24822, 14569],
        name: 'Maoi Keska Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [23250, 14983],
        name: 'Jonsau Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [20751, 15769],
        name: 'Tukarok Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [21530, 17331],
        name: 'Moronku Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [23317, 18161],
        name: 'Makasura Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [22679, 20834],
        name: 'Eshos Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [21653, 22626],
        name: 'Utojishi Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [18623, 22920],
        name: 'En-oma Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [13678, 19847],
        name: 'Ryogoko Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [15884, 17589],
        name: 'Ma-Yatinou Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [20801, 20699],
        name: 'Jochishiu Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [31910, 26118],
        name: 'Marari-Ina Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [31782, 5135],
        name: 'Rasikawa Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [18654, 11759],
        name: 'Sepapa Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [20287, 12527],
        name: 'Ren-Ize Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [21605, 14019],
        name: 'Jod-Zeniu Shrine',
        text: 'Unconfirmed',
        level: 'surface',
    },
    {
        coords: [17452, 19686],
        name: 'Kamizuna Shrine',
        text: '',
        level: 'surface',
    },
    {
        coords: [13806, 3972],
        name: 'Shrine',
        text: 'Mallet Smash',
        level: 'surface',
    },
    {
        coords: [19396, 8436],
        name: 'Musanokir Shrine',
        text: 'Swing to Hit',
        level: 'surface',
    },

    {
        coords: [6412, 6964],
        name: 'Ijo-o Shrine',
        text: 'More than Defense',
        level: 'sky',
    },
    {
        coords: [12850, 21356],
        name: 'Rakashog Shrine',
        text: 'A Reflective Device',
        level: 'sky',
    },
    {
        coords: [18062, 19511],
        name: 'In-Isa Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [18834, 17723],
        name: 'Ukouho Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [19145, 19976],
        name: 'Nacho-Yaha Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [14240, 19476],
        name: 'Jinodokao Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [23259, 18617],
        name: 'Joshiu Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [26754, 13419],
        name: 'Jirutagumachi Shrine',
        text: 'A Flying Device',
        level: 'sky',
    },
    {
        coords: [28997, 10558],
        name: 'Natak Shrine',
        text: "Rauru's Blessing",
        level: 'sky',
    },
    {
        coords: [23631, 11420],
        name: 'Kadaunari Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [26572, 23552],
        name: 'Kumamai-No Shrine',
        text: 'Unconfirmed',
        level: 'sky',
    },
    {
        coords: [28439, 13005],
        name: 'Igoshon Shrine',
        text: 'Orbs of Water',
        level: 'sky',
    },
    {
        coords: [15090, 4396],
        name: 'Tenbez Shrine',
        text: '',
        level: 'sky',
    },
    {
        coords: [8097, 4695],
        name: 'Kahatanaum Shrine',
        text: '',
        level: 'sky',
    },
    {
        coords: [9147, 5861],
        name: 'Mayaumekis Shrine',
        text: '',
        level: 'sky',
    },
    {
        coords: [10792, 12532],
        name: 'Taunhiy Shrine',
        text: '',
        level: 'sky',
    },
    {
        coords: [20127, 19146],
        name: 'Gutanbac Shrine',
        text: '',
        level: 'sky',
    },
    {
        coords: [12614, 24888],
        name: 'Siyamotsus Shrine',
        text: '',
        level: 'sky',
    },
];

const Shrines = (props) => {
    const { mapLv } = props;
    const map = useMap();
    const [shrines, SetShrines] = useState(shrinesData);
    const markerIcon = new Icon({
        iconUrl: shrineIcon,
        iconSize: [25, 25],
        // iconAnchor: [40, 90],
        // popupAnchor: [0, -10],
    });
    return (
        <MapLayers layerName="Shrines" checked={false}>
            {shrines.map((shrine, index) => {
                if (shrine.level === mapLv) {
                    const position = map.unproject(shrine.coords, 8);
                    return (
                        <Marker key={index} position={position} icon={markerIcon}>
                            <Popup>
                                <p>{shrine.name}</p>
                                <p>Map Level: {shrine.level}</p>
                            </Popup>
                        </Marker>
                    );
                }
                return null;
            })}
        </MapLayers>
    );
};
export default Shrines;
