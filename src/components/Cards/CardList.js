import * as React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//
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
export default function CardList() {
    return (
        <List sx={{ width: '90%', bgcolor: 'background.paper', mx: 'auto' }}>
            {dummyMarkers.map((item) => (
                <ListItem key={item.id}>
                    <CardInfo markInfo={item} />
                </ListItem>
            ))}
        </List>
    );
}
