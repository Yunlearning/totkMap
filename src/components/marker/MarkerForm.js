import { Form, Link } from 'react-router-dom';

import * as React from 'react';
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
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
}));

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
const MarkerForm = () => {
    const [markType, setMarkType] = React.useState('');

    const handleChange = (event) => {
        setMarkType(event.target.value);
    };

    return (
        <Form>
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
                    >
                        <MenuItem value={1}>塔</MenuItem>
                        <MenuItem value={2}>神廟</MenuItem>
                        <MenuItem value={3}>光之根</MenuItem>
                        <MenuItem value={4}>馬廄/驛站</MenuItem>
                        <MenuItem value={5}>馬廄/驛站</MenuItem>
                        <MenuItem value={6}>井</MenuItem>
                        <MenuItem value={7}>洞穴</MenuItem>
                    </Select>
                </FormControl>
                <TextField id="markName" label="名稱" name="markName" variant="standard" fullWidth />
                <Stack spacing={2} direction="row">
                    <TextField
                        id="coord_x"
                        label="X座標"
                        name="coord_x"
                        variant="standard"
                        type="number"
                        defaultValue={0}
                        fullWidth
                    />
                    <TextField
                        id="coord_y"
                        label="Y座標"
                        name="coord_y"
                        variant="standard"
                        type="number"
                        defaultValue={0}
                        fullWidth
                    />
                    <TextField
                        id="coord_z"
                        label="Z座標"
                        name="coord_z"
                        variant="standard"
                        type="number"
                        defaultValue={0}
                        fullWidth
                    />
                </Stack>
                <FormControl>
                    <FormLabel id="level-label">地圖</FormLabel>
                    <RadioGroup defaultValue="sky" aria-labelledby="level-label" name="level">
                        <FormControlLabel value="sky" control={<Radio />} label="天空" />
                        <FormControlLabel value="surface" control={<Radio />} label="地表" />
                        <FormControlLabel value="depths" control={<Radio />} label="地底" />
                    </RadioGroup>
                </FormControl>
                <Stack spacing={2} direction="row">
                    <Button
                        component={Link}
                        to="/markers"
                        type="button"
                        color="secondary"
                        sx={{ width: '150px', textAlign: 'end' }}
                        variant="contained"
                    >
                        新增標記
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
