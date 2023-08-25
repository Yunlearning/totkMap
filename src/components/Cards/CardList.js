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
//
function filterData(params) {
    const { markName, level, markType } = params;
    // console.log(markName, level, markType);
    const storedData = [
        {
            markName: 'Dueling Peaks Stable',
            coord_x: '1761',
            coord_y: '-1925',
            coord_z: '26',
            level: 'surface',
            markType: '5',
            id: 'f285b3e4-188d-4cb3-a7c0-584e03cf9f6f',
        },
        {
            markName: 'Mini Stable',
            coord_x: '-249',
            coord_y: '52',
            coord_z: '20',
            level: 'surface',
            markType: '5',
            id: 'bf0726d2-b620-484b-a258-67ab42c0f553',
        },
        {
            markName: 'Jiosin Shrine',
            coord_x: '-241',
            coord_y: '-371',
            coord_z: '41',
            level: 'surface',
            markType: '2',
            id: '51efc058-991e-4956-99eb-5af708d2f227',
        },
        {
            markName: 'Nisoij Lightroot',
            coord_x: '-240',
            coord_y: '-372',
            coord_z: '-499',
            level: 'depths',
            markType: '3',
            id: 'f96c371b-2bf7-4695-b019-11d5255cf96c',
        },
        {
            markName: '709',
            coord_x: '709',
            coord_y: '-1383',
            coord_z: '1599',
            level: 'sky',
            markType: '2',
            id: 'b49fc88e-6db9-454c-a7a4-8f55cf3bb287',
        },
        {
            markName: 'Nachoyah Shrine',
            coord_x: '390',
            coord_y: '-1661',
            coord_z: '2313',
            level: 'sky',
            markType: '2',
            id: 'db0ce761-536f-44ec-be32-6e02fd2085b6',
        },
        {
            markName: 'In-isa Shrine',
            coord_x: '26',
            coord_y: '-1504',
            coord_z: '1423',
            level: 'sky',
            markType: '2',
            id: 'f3c41557-9914-4fdf-8447-6764ac474102',
        },
        {
            markName: 'Ukouh Shrine',
            coord_x: '275',
            coord_y: '-913',
            coord_z: '1474',
            level: 'sky',
            markType: '2',
            id: 'e18ed825-178f-4f59-84a0-c7d9355c3116',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '3326',
            coord_y: '-3566',
            coord_z: '6',
            level: 'surface',
            markType: '4',
            id: 'c7a0807d-f6c3-4fe1-8bdd-4c658050fb69',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-649',
            coord_y: '-2683',
            coord_z: '69',
            level: 'surface',
            markType: '4',
            id: 'acb5d857-d13a-486d-826b-d1119da7d7e1',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '695',
            coord_y: '-1309',
            coord_z: '54',
            level: 'surface',
            markType: '4',
            id: '97f8fed0-0efe-4fb4-806b-515c0e349e3c',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-3178',
            coord_y: '-1700',
            coord_z: '420',
            level: 'surface',
            markType: '4',
            id: '28cd9b87-9732-42f7-b0b7-89d46a632693',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '4468',
            coord_y: '-305',
            coord_z: '76',
            level: 'surface',
            markType: '4',
            id: 'ed5fb135-5196-4e23-a95c-5cbfe67f86fd',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-3096',
            coord_y: '-77',
            coord_z: '212',
            level: 'surface',
            markType: '4',
            id: '6159af3b-80fd-4851-8a1b-2f51f300d8d1',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '1828',
            coord_y: '735',
            coord_z: '90',
            level: 'surface',
            markType: '4',
            id: '1a18f829-a252-446c-9a8b-ba5994fabf2e',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-1413',
            coord_y: '966',
            coord_z: '125',
            level: 'surface',
            markType: '4',
            id: 'e4ae47e2-3e32-4e8c-a330-d23c869f7aba',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-2551',
            coord_y: '1889',
            coord_z: '320',
            level: 'surface',
            markType: '4',
            id: '2fff151c-a89a-498d-807a-0d27a8de2d80',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '4535',
            coord_y: '2144',
            coord_z: '2',
            level: 'surface',
            markType: '4',
            id: '7993d560-a122-4923-b69b-afa34e7e45cb',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '892',
            coord_y: '2952',
            coord_z: '363',
            level: 'surface',
            markType: '4',
            id: '0629db81-5365-4dfd-8b3a-eadea45d66f9',
        },
        {
            markName: 'Thyphlo Ruins Skyview Tower',
            coord_x: '344',
            coord_y: '3142',
            coord_z: '174',
            level: 'surface',
            markType: '1',
            id: '9d38c059-968c-4cb8-993c-d25665e949b9',
        },
        {
            markName: 'Pikida Stonegrove Skyview Tower',
            coord_x: '-2311',
            coord_y: '3062',
            coord_z: '437',
            level: 'surface',
            markType: '1',
            id: 'd07df20b-6e0a-4659-90a1-bf54ebdfc38c',
        },
        {
            markName: 'Rospro Pass Skyview Tower',
            coord_x: '-3680',
            coord_y: '2346',
            coord_z: '277',
            level: 'surface',
            markType: '1',
            id: '2c09d4bd-4f05-4abb-b105-127211d389d0',
        },
        {
            markName: 'Upland Zorana Skyview Tower',
            coord_x: '2866',
            coord_y: '581',
            coord_z: '373',
            level: 'surface',
            markType: '1',
            id: 'a5f55c86-e172-4545-9c17-44ba8cb2dc2a',
        },
        {
            markName: 'Eldin Canyon Skyview Tower',
            coord_x: '1642',
            coord_y: '1191',
            coord_z: '219',
            level: 'surface',
            markType: '1',
            id: '95a9bcaf-a80a-4c53-a34c-ef7eb6544d0c',
        },
        {
            markName: "Lindor's Brow Skyview Tower",
            coord_x: '-1910',
            coord_y: '1245',
            coord_z: '291',
            level: 'surface',
            markType: '1',
            id: '88a2feab-48bb-4668-9322-58597031b5cd',
        },
        {
            markName: 'Hyrule Field Skyview Tower',
            coord_x: '-761',
            coord_y: '-1019',
            coord_z: '58',
            level: 'surface',
            markType: '1',
            id: '037dbeb2-8ef2-477b-9236-fc82b3b3e90c',
        },
        {
            markName: 'Sahasra Slope Skyview Tower',
            coord_x: '1341',
            coord_y: '-1178',
            coord_z: '160',
            level: 'surface',
            markType: '1',
            id: '4992ea20-4a64-4265-842d-fab53b7db22a',
        },
        {
            markName: 'Mount Lanayru Skyview Tower',
            coord_x: '3848',
            coord_y: '-1315',
            coord_z: '533',
            level: 'surface',
            markType: '1',
            id: 'fed09056-2391-4b94-9702-f9462b61052c',
        },
        {
            markName: 'Rabella Wetlands Skyview Tower',
            coord_x: '2420',
            coord_y: '-2755',
            coord_z: '216',
            level: 'surface',
            markType: '1',
            id: '55fcafbe-bbb7-484b-a3e6-061efd54aa20',
        },
        {
            markName: 'Popla Foothills Skyview Tower',
            coord_x: '605',
            coord_y: '-2127',
            coord_z: '92',
            level: 'surface',
            markType: '1',
            id: '05bfe380-8c8f-4728-96af-76f511471bbd',
        },
        {
            markName: 'Gerudo Highlands Skyview Tower +',
            coord_x: '-3959',
            coord_y: '-1313',
            coord_z: '0422',
            level: 'surface',
            markType: '1',
            id: 'a33e5e50-8784-414c-8638-88d9f55cb9a3',
        },
        {
            markName: 'Ulri Mountain Skyview Tower +',
            coord_x: '3493',
            coord_y: '2019',
            coord_z: '188',
            level: 'surface',
            markType: '1',
            id: '5c09e210-a7c3-4481-9d6d-731fd5d548a4',
        },
        {
            markName: 'Lookout Landing Skyview Tower',
            coord_x: '-299',
            coord_y: '143',
            coord_z: '19',
            level: 'surface',
            markType: '1',
            id: '9455accf-101e-49ce-b4aa-2e3789f0c712',
        },
        {
            markName: "Dragon's Tear",
            coord_x: '-1864',
            coord_y: '3622',
            coord_z: '238',
            level: 'surface',
            markType: '4',
            id: '7f6603a6-f2c0-478c-8180-32207302cd2f',
        },
        {
            markName: 'Gerudo Canyon Skyview Tower',
            coord_x: '-2439',
            coord_y: '-2183',
            coord_z: '301',
            level: 'surface',
            markType: '1',
            id: '0c379fd7-679f-45ff-9b66-a28b16d1c543',
        },
        {
            markName: '河畔驛站',
            coord_x: '3587',
            coord_y: '-9675',
            coord_z: '25',
            level: 'surface',
            markType: '5',
            id: '86602cf1-68cc-474a-8506-968c56d3a584',
        },
    ];
    // if (!storedData.markers || storedData.markers.length === 0) {
    //     throw new NotFoundError('Could not find any markers.');
    // }

    const filteredMarker = storedData.markers.filter((marker) => {
        if (markName && marker.markName !== markName) {
            return false;
        }
        if (level && marker.level !== level) {
            return false;
        }
        if (markType && marker.markType !== markType) {
            return false;
        }
        return true;
    });
    // if (!filteredMarker) {
    //     throw new NotFoundError('Could not find marker for query. ');
    // }
    return filteredMarker;
}

//
const CardList = ({ markers }) => {
    const transMarkers = transData(markers);
    const [datas, setDatas] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [markersType, setMarkersType] = useState('');
    const submit = useSubmit();
    const handlePageChange = (event, value) => {
        setPage(value);
        setDatas([...transMarkers.slice((value - 1) * 10, value * 10)]);
    };
    const handleInputChange = (e) => {
        setPage(1);
        const searchValue = e.target.value;
        const searchResult = transMarkers.filter((marker) => {
            const title = marker.title.toLowerCase();
            return title.includes(searchValue);
        });
        console.log('searchResult', searchResult);
        const pageData = searchResult.slice(0, 10);
        setDatas([...pageData]);
        setPageCount(Math.ceil(searchResult.length / 10));
        // submit({ markName: searchValue }, { method: 'get' });
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
        // const pageCount = Math.ceil(markers.length / 10);
        setPageCount(Math.ceil(markers.length / 10));
        setPage(1);
        // console.log('reload', datas);
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
                        <StyledInputBase
                            onChange={handleInputChange}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
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
