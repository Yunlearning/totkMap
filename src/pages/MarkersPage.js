import { Suspense } from 'react';
import { Await, Link, defer, json, useLoaderData } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardList from '../components/Cards/CardList';

const MarkersPage = () => {
    const { markers } = useLoaderData();
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', px: 6, py: 2 }}>
                <Typography variant="h4" sx={{ minWidth: 100, fontWeight: 'bold', ml: 3 }}>
                    Markers
                </Typography>
                <Button className="ml-auto mr-6" variant="contained" component={Link} to="new">
                    Add Marker
                </Button>
                {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
            </Box>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={markers}>{(loadedMarkers) => <CardList markers={loadedMarkers.markers} />}</Await>
            </Suspense>
        </>
    );
};
export default MarkersPage;

async function loadMarkers() {
    const response = await fetch('http://localhost:8080/markers');
    if (!response.ok) {
        throw json({ message: 'Could not fetch markers.' }, { status: 500 });
    } else {
        const resData = await response.json();
        console.log('markers', resData);
        return resData;
        // return resData.markers
    }
}
export function loader() {
    return defer({
        markers: loadMarkers(),
    });
}
