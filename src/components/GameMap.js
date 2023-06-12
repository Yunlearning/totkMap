import React, { useState } from 'react';
// import { ReactDOMServer } from 'react-dom';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
// mui
import RoomIcon from '@mui/icons-material/Room';
// import testMap from './map/';
// import { CRS, L } from 'leaflet';
import L from 'leaflet';
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
    ImageOverlay,
} from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
import { Icon } from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
// import logo from '/logo192.png';
const center = [-58.59375, 70.3125];
const tileLayerProps = {
    url: '/map/ground/{z}/{z}_{x}_{y}.png',
    attribution: 'Your attribution here',
};
const gameMap = '../map/ground/{z}/{z}_{x}_{y}.png';
// const gameMap = 'surface/{z}/{x}_{y}.jpg';
const mapInfo = {
    maxZoom: 8,
    minZoom: 0,
    size: [36000, 30000],
};
const MyComponent = (props) => {
    const map = useMap();
    const { lat: center_lat, lng: center_lng } = map.getCenter();
    const southWest = Object.values(map.unproject([0, mapInfo.size[1]], 8));
    const northEast = Object.values(map.unproject([mapInfo.size[0], 0], 8));
    const [bounds, setBounds] = useState([southWest, northEast]);
    const [position, setPosition] = useState({
        lat: center_lat,
        lng: center_lng,
    });
    const [coord, setCoord] = useState([]);
    map.setMaxBounds(bounds);
    const mapEvents = useMapEvents({
        click: (e) => {
            // console.log('!!', e.latlng);
            const getCoord = map.project(e.latlng, 8);
            const { x, y } = getCoord;
            const position_x = Math.ceil((Math.ceil(x) - mapInfo.size[0] / 2) / 3);
            const position_y = Math.ceil((Math.ceil(y) - mapInfo.size[1] / 2) / 3);
            // console.log(position_x, position_y);
            // setCoord((prev) => ({
            //     ...prev,
            //     x: Math.ceil((Math.ceil(x) - mapInfo.size[0] / 2) / 3),
            //     y: Math.ceil((Math.ceil(y) - mapInfo.size[1] / 2) / 3),
            // }));
            setCoord([position_x, position_y]);
            setPosition((prev) => ({
                ...prev,
                ...e.latlng,
            }));
            map.locate();
        },
        // locationfound: (location) => {
        //     console.log('location found:', location);
        // },
    });
    const codingSpot = new Icon({
        iconUrl: '/leafletImgs/marker-icon-2x.png',
        iconSize: [25, 41],
        // iconAnchor: [40, 90],
        popupAnchor: [0, -10],
    });
    const html = renderToString(<RoomIcon />);
    const customMarkerIcon = new L.divIcon({
        iconSize: [36, 36],
        className: 'dummy text-red-500',
        html: html,
    });
    return (
        <Marker position={position} icon={codingSpot}>
            <Popup>
                <div className="font-bold">
                    {/* <RoomIcon color="success" /> */}
                    {/* A pretty CSS3 popup. <br /> Easily customizable. */}
                    <sapn className="pr-2">座標:</sapn>
                    {coord.toString()}
                </div>
            </Popup>
        </Marker>
    );
};
const CustomMarker = () => {
    const html = renderToString(<RoomIcon />);
    const customMarkerIcon = new L.divIcon({
        html: html,
    });
    return (
        <Marker position={[51.505, -0.09]} icon={customMarkerIcon}>
            {/* <RoomIcon /> */}
            {/* <Icon>
                <LocationOn color="primary" fontSize="large" />
            </Icon> */}
        </Marker>
    );
};
const GameMap = () => {
    return (
        <MapContainer
            crs={L.CRS.Simple}
            attributionControl={false}
            center={center}
            zoom={2}
            maxZoom={6}
            scrollWheelZoom={true}
        >
            <MyComponent />
            <TileLayer {...tileLayerProps} noWrap={true} />
        </MapContainer>
    );
};
export default GameMap;
