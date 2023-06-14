import React from 'react';
import L from 'leaflet';
import { LayersControl, LayerGroup } from 'react-leaflet';
const MapLayers = (props) => {
    return (
        <LayersControl.Overlay checked={props.checked} name={props.layerName}>
            <LayerGroup>{props.children}</LayerGroup>
        </LayersControl.Overlay>
    );
};

export default MapLayers;
