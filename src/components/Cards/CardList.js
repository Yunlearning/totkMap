import React, { useState, useEffect } from 'react';
import { Link, redirect, json, useSubmit } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
//
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
//
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//
import { getAuthToken } from '../../util/auth';
import CardInfo from './CardInfo';
const transData = (markers) => {
    const createMarker = (id, markName, markType, level, imgSrc, axis) => {
        return {
            id,
            title: markName,
            type: markType,
            level,
            imgSrc,
            axis: axis.map((item) => Number(item)),
        };
    };
    return markers.map((marker) => {
        const { id, markName, markType, level, coord_x, coord_y, coord_z } = marker;
        return createMarker(id, markName, markType, level, sampleImg, [coord_x, coord_y, coord_z]);
    });
};
const sampleImg = 'https://www.1999.co.jp/itbig94/10946686p.jpg';
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 1),
    '&:hover': {
        // backgroundColor: alpha(theme.palette.common.black, 0.25),
        backgroundColor: '#555',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const CardList = ({ markers }) => {
    const transMarkers = transData(markers);
    const pageCount = Math.ceil(markers.length / 10);
    const [datas, setDatas] = useState([]);
    const [page, setPage] = useState(1);
    const [markersType, setMarkersType] = useState('');
    const submit = useSubmit();
    const handlePageChange = (event, value) => {
        setPage(value);
        setDatas([...transMarkers.slice((value - 1) * 10, value * 10)]);
    };
    const handleChange = (e) => {
        setPage(1);
        setMarkersType(e.target.value);
        submit({ markType: e.target.value }, { method: 'get' });
    };
    useEffect(() => {
        const pageData = transMarkers.slice(0, 10);
        setDatas(() => {
            return [...pageData];
        });
        setPage(1);
        console.log('reload', datas);
    }, [markers]);
    return (
        <>
            <Box
                className="p-2 rounded-lg border border-gray-500 bg-stone-900"
                sx={{
                    width: '90%',
                    mx: 'auto',
                    // bgcolor: 'secondary.light',
                    // bgcolor: 'rgba(31, 38, 46, 0.5)',
                    mb: 2,
                    border: 'solid',
                }}
            >
                <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    {/*  */}

                    <FormControl
                        className="rounded"
                        sx={{ m: 1, minWidth: 120, bgcolor: 'background.paper' }}
                        size="small"
                    >
                        <InputLabel id="demo-select-small-label">類型</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={markersType}
                            label="類型"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>無</em>
                            </MenuItem>
                            <MenuItem value={1}>塔</MenuItem>
                            <MenuItem value={2}>神廟</MenuItem>
                            <MenuItem value={3}>光之根</MenuItem>
                            <MenuItem value={4}>龍之淚</MenuItem>
                            <MenuItem value={5}>馬廄/驛站</MenuItem>
                            <MenuItem value={6}>井</MenuItem>
                            <MenuItem value={7}>洞穴</MenuItem>
                        </Select>
                    </FormControl>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                </Stack>
            </Box>

            <List
                // className="rounded-lg bg-slate-300"
                sx={{
                    width: '90%',
                    mx: 'auto',
                    // bgcolor: 'background.paper',
                }}
            >
                {datas.map((item) => (
                    <ListItem sx={{ px: 0 }} key={item.id}>
                        <CardInfo markInfo={item} />
                    </ListItem>
                ))}
            </List>
            <Stack spacing={2} sx={{ alignItems: 'center', mt: 2 }}>
                <Pagination color="primary" count={pageCount} page={page} onChange={handlePageChange} shape="rounded" />
            </Stack>
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
