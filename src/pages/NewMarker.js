import MarkerForm from '../components/marker/MarkerForm';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const NewMarker = () => {
    return (
        <>
            <Grid sx={{ p: 2 }} spacing={2} container justifyContent="center">
                <Grid item sx={{ p: 2 }} xs={8}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                        新增標記
                    </Typography>
                </Grid>
                <Grid className="p-4 bg-gray-950 rounded-lg" xs={8}>
                    <MarkerForm />
                </Grid>
            </Grid>
        </>
    );
};

export default NewMarker;
