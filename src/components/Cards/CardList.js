import React, { useState } from 'react';
import { Link, redirect, json } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
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

const CardList = ({ markers }) => {
    const transMarkers = markers.map((marker) => {
        const { id, markName, markType, level, coord_x, coord_y, coord_z } = marker;
        return createMarker_2(id, markName, markType, level, sampleImg, [coord_x, coord_y, coord_z]);
    });
    const pageCount = Math.ceil(markers.length / 10);
    const [datas, setDatas] = useState(transMarkers.slice(0, 10)); // [0, 10)
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
        setDatas(transMarkers.slice((value - 1) * 10, value * 10));
    };

    return (
        <>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <Pagination color="primary" count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
            </Stack>
            <List sx={{ width: '90%', bgcolor: 'background.paper', mx: 'auto' }}>
                {datas.map((item) => (
                    <ListItem key={item.id}>
                        <CardInfo markInfo={item} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};
export default CardList;
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
