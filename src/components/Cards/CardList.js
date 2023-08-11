import * as React from 'react';
import { Link, redirect, json } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//
import { getAuthToken } from '../../util/auth';
import CardInfo from './CardInfo';
const createMarker = (id, title, type, imgSrc, axis) => {
    return {
        id,
        title,
        type,
        imgSrc,
        axis,
    };
};
const createMarker_2 = (id, markName, markType, level, imgSrc, axis) => {
    return {
        id,
        title: markName,
        type: markType,
        level,
        imgSrc,
        axis: axis.map((item) => Number(item)),
    };
};
const sampleImg = 'https://www.1999.co.jp/itbig94/10946686p.jpg';
const dummyMarkers = [
    {
        id: 1,
        title: 'xxx-tower',
        type: 'tower',
        imgSrc: sampleImg,
        axis: [3600, 2560, 555],
    },
    createMarker(2, 'yyy-shrine', 'shrine', sampleImg, [233, 5874, 25]),
    createMarker(3, 'yyy-lightroot', 'lightroot', sampleImg, [233, 5874, 25]),
];
export default function CardList({ markers }) {
    console.log('get markers', markers);
    const dataList = markers.map((marker) => {
        const { id, markName, markType, level, coord_x, coord_y, coord_z } = marker;
        return createMarker_2(id, markName, markType, level, sampleImg, [coord_x, coord_y, coord_z]);
    });
    return (
        <List sx={{ width: '90%', bgcolor: 'background.paper', mx: 'auto' }}>
            {dataList.map((item) => (
                <ListItem key={item.id}>
                    <CardInfo markInfo={item} />
                </ListItem>
            ))}
        </List>
    );
}
export async function action({ params, request }) {
    const data = await request.formData();
    const markerId = data.get('markerId');
    const token = getAuthToken();
    const response = await fetch('http://localhost:8080/markers/' + markerId, {
        method: request.method,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw json(
            { message: 'Could not delete event.' },
            {
                status: 500,
            }
        );
    }
    return redirect('/markers');
}
