import { Suspense } from 'react';
import { Await, Link, defer, json, useLoaderData } from 'react-router-dom';
import { useState } from 'react';
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
            </Box>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={markers}>
                    {(loadedMarkers) => {
                        return <CardList markers={loadedMarkers.markers} />;
                    }}
                </Await>
            </Suspense>
        </>
    );
};
export default MarkersPage;
async function loadMarkers(request) {
    // console.log('loadMarkers', new URL(request.url).searchParams.get('markType'));
    const searchParams = new URL(request.url).searchParams;
    const searchValue = searchParams.get('searchValue');
    const markType = searchParams.get('markType');
    // const url2 = `http://localhost:8080/markers/?markType=${1}&markName=${'Thyphlo'}`;
    // const url3 = `http://localhost:8080/markers/?&markName=${'Thyphlo'}`;
    const url = `http://localhost:8080/markers/${markType ? '?markType=' + markType : ''}`;
    const response = await fetch(url);
    // const testFilter = await fetch('http://localhost:8080/markers/filterData?markType=1');
    // const testData = await testFilter.json();
    // console.log('result:---', testData);
    if (!response.ok) {
        throw json({ message: 'Could not fetch markers.' }, { status: 500 });
    } else {
        const resData = await response.json();
        // console.log('markers', resData);
        return resData;
        // return resData.markers
    }
}
export function loader({ request }) {
    return defer({
        markers: loadMarkers(request),
    });
}
