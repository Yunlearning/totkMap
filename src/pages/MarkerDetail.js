import { Suspense, useState } from 'react';
import { defer, json, Await, useRouteLoaderData, redirect } from 'react-router-dom';
import { getAuthToken } from '../util/auth';
//
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardDetail from '../components/Cards/CardDetail';
//

const MarkerDetail = () => {
    const { marker } = useRouteLoaderData('marker-detail');

    return (
        <Grid sx={{ p: 2 }} spacing={2} container justifyContent="center">
            <Grid item sx={{ p: 2 }} xs={8}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    標記資訊
                </Typography>
            </Grid>
            <Grid item className="p-4" xs={8}>
                <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                    <Await resolve={marker}>{(loadMarker) => <CardDetail marker={loadMarker} />}</Await>
                </Suspense>
            </Grid>
        </Grid>
    );
};

export default MarkerDetail;
async function loadMarker(id) {
    const response = await fetch(`http://localhost:8080/markers/${id}`);
    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected Marker.' }, { status: 500 });
    } else {
        const resData = await response.json();
        // console.log('markers', resData);
        return resData.marker;
    }
}

export async function loader({ params, request }) {
    const id = params.markerId;
    return defer({
        marker: await loadMarker(id),
    });
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
