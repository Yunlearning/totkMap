import React, { useState } from 'react';
import { renderToString } from 'react-dom/server';
// mui
import RoomIcon from '@mui/icons-material/Room';
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
} from 'react-leaflet';
import { useMap, useMapEvents, useMapEvent } from 'react-leaflet/hooks';
// components
import Towers from './markers/Towers';
import Stables from './markers/Stables';
import Shrines from './markers/Shrines';
import DragonsTear from './markers/DragonsTear';
import LightRoots from './markers/LightRoot';
const center = [-58.59375, 70.3125];
const skyLayerProps = {
    url: '/map/sky/{z}/{z}_{x}_{y}.png',
    attribution: 'Tears of the Kingdom Interactive Map-Sky',
};
const surfaceLayerProps = {
    url: '/map/surface/{z}/{z}_{x}_{y}.png',
    attribution: 'Tears of the Kingdom Interactive Map-Surface',
};
const depthsLayerProps = {
    url: '/map/depths/{z}/{z}_{x}_{y}.png',
    attribution: 'Tears of the Kingdom Interactive Map-Depths',
};
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
    const [mapCoord, setMapCoord] = useState([]);
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
            // console.log('x,y', x, y);
            // console.log('x,y', Math.ceil(x), Math.ceil(y));
            setMapCoord([Math.ceil(x), Math.ceil(y)]);
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
    const codingSpot = new L.Icon({
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
                    <span className="pr-2">座標:</span>
                    {coord.toString()}
                </div>
                <div className="font-bold">
                    <span className="pr-2">圖片座標:</span>
                    {mapCoord.toString()}
                </div>
            </Popup>
        </Marker>
    );
};
const GameMap = () => {
    const [mapLv, setMapLv] = useState('surface');
    return (
        <MapContainer
            crs={L.CRS.Simple}
            attributionControl={false}
            center={center}
            zoom={2}
            maxZoom={7}
            scrollWheelZoom={true}
        >
            <MyComponent />
            <LayersControl position="topright">
                <LayersControl.BaseLayer name="sky">
                    <TileLayer
                        {...skyLayerProps}
                        noWrap={true}
                        eventHandlers={{
                            add: (e) => {
                                // console.log('Added sky Layer:', e.target);
                                setMapLv('sky');
                            },
                            // remove: (e) => {
                            //     console.log('Removed sky layer:', e.target);
                            // },
                        }}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name="surface">
                    <TileLayer
                        {...surfaceLayerProps}
                        noWrap={true}
                        eventHandlers={{
                            add: (e) => {
                                // console.log('Added surface Layer:', e.target);
                                setMapLv('surface');
                            },
                            // remove: (e) => {
                            //     console.log('Removed surface layer:', e.target);
                            // },
                        }}
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="depths">
                    <TileLayer
                        {...depthsLayerProps}
                        noWrap={true}
                        eventHandlers={{
                            add: (e) => {
                                // console.log('Added depths Layer:', e.target);
                                setMapLv('depths');
                            },
                            // remove: (e) => {
                            //     console.log('Removed depths layer:', e.target);
                            // },
                        }}
                    />
                </LayersControl.BaseLayer>
                <Towers mapLv={mapLv} />
                <Stables mapLv={mapLv} />
                <Shrines mapLv={mapLv} />
                <LightRoots mapLv={mapLv} />
                <DragonsTear mapLv={mapLv} />
            </LayersControl>
        </MapContainer>
    );
};
export default GameMap;
