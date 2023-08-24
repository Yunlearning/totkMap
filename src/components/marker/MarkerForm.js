import { Form, Link, useActionData, json, redirect, useSubmit } from 'react-router-dom';

import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';
import { indigo } from '@mui/material/colors';
//
import { getAuthToken } from '../../util/auth';
/**
 * name
 * coord_x
 * coord_y
 * coord_z
 * img
 * level: sky/surface/depths
 * note/text:備註
 * markType:
 */
const MarkerForm = ({ method, marker }) => {
    const [markType, setMarkType] = useState(marker ? marker.markType : '');
    const submit = useSubmit();
    // console.log('MarkerForm---marker', marker);
    const handleChange = (event) => {
        // console.log('event.target.value)', event.target.value);
        setMarkType(event.target.value);
    };
    const handleFormSubmit = (e) => {
        submit(e.currentTarget, { method: method });
    };
    return (
        <Form method={method} onSubmit={handleFormSubmit}>
            <Stack spacing={4}>
                <FormControl variant="standard" fullWidth>
                    <InputLabel id="markType-label">類型</InputLabel>
                    <Select
                        labelId="markType-label"
                        id="markType"
                        value={markType}
                        name="markType"
                        label="類型"
                        onChange={handleChange}
                        defaultValue={5}
                    >
                        <MenuItem value={1}>塔</MenuItem>
                        <MenuItem value={2}>神廟</MenuItem>
                        <MenuItem value={3}>光之根</MenuItem>
                        <MenuItem value={4}>龍之淚</MenuItem>
                        <MenuItem value={5}>馬廄/驛站</MenuItem>
                        <MenuItem value={6}>井</MenuItem>
                        <MenuItem value={7}>洞穴</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="markName"
                    label="名稱"
                    name="markName"
                    variant="standard"
                    fullWidth
                    defaultValue={marker ? marker.markName : ''}
                />
                <Stack spacing={2} direction="row">
                    <TextField
                        id="coord_x"
                        label="X座標"
                        name="coord_x"
                        variant="standard"
                        type="number"
                        defaultValue={marker ? marker.coord_x : 0}
                        fullWidth
                    />
                    <TextField
                        id="coord_y"
                        label="Y座標"
                        name="coord_y"
                        variant="standard"
                        type="number"
                        defaultValue={marker ? marker.coord_y : 0}
                        fullWidth
                    />
                    <TextField
                        id="coord_z"
                        label="Z座標"
                        name="coord_z"
                        variant="standard"
                        type="number"
                        defaultValue={marker ? marker.coord_z : 0}
                        fullWidth
                    />
                </Stack>
                <FormControl>
                    <FormLabel id="level-label">地圖</FormLabel>
                    <RadioGroup defaultValue={marker ? marker.level : 'sky'} aria-labelledby="level-label" name="level">
                        <FormControlLabel value="sky" control={<Radio />} label="天空" />
                        <FormControlLabel value="surface" control={<Radio />} label="地表" />
                        <FormControlLabel value="depths" control={<Radio />} label="地底" />
                    </RadioGroup>
                </FormControl>
                <Stack spacing={2} direction="row">
                    <Button
                        type="submit"
                        color={method === 'patch' ? 'success' : 'secondary'}
                        sx={{ width: '150px', textAlign: 'end' }}
                        variant="contained"
                    >
                        {method === 'patch' ? '更新標記' : '新增標記'}
                    </Button>
                    <Button
                        component={Link}
                        to="../"
                        type="button"
                        sx={{
                            width: '150px',
                            backgroundColor: indigo[50],
                            '&:hover': {
                                backgroundColor: indigo[100],
                            },
                        }}
                        variant="contained"
                    >
                        取消
                    </Button>
                </Stack>
            </Stack>
        </Form>
    );
};

export default MarkerForm;

export async function action({ request, params }) {
    /**
     * name
     * coord_x
     * coord_y
     * coord_z
     * img
     * level: sky/surface/depths
     * note/text:備註
     * markType:
     */
    const method = request.method;
    const data = await request.formData();
    const markerData = {
        markName: data.get('markName'),
        coord_x: data.get('coord_x'),
        coord_y: data.get('coord_y'),
        coord_z: data.get('coord_z'),
        level: data.get('level'),
        markType: data.get('markType'),
    };
    console.log('send!!', markerData);
    const token = getAuthToken();
    let url = 'http://localhost:8080/markers';

    if (method === 'PATCH') {
        console.log('!!!!patch', params);
        const eventId = params.markerId;
        url = 'http://localhost:8080/markers/' + eventId;
    }
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(markerData),
    });
    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Could not save marker.' }, { status: 500 });
    }
    return redirect('/markers');
}
