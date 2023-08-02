import { Link } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardList from '../components/Cards/CardList';

const MarkersPage = () => {
    return (
        <>
            {/* <h1 className="ml-20">Markers</h1> */}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', px: 6, py: 2 }}>
                <Typography variant="h4" sx={{ minWidth: 100, fontWeight: 'bold', ml: 3 }}>
                    Markers
                </Typography>
                <Button className="ml-auto mr-6" variant="contained" component={Link} to="new">
                    Add Marker
                </Button>
                {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
            </Box>
            <CardList />
        </>
    );
};
export default MarkersPage;
