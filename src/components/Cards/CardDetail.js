import { Link, redirect, json, useSubmit } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

import { Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
//
const sampleImg = 'https://www.1999.co.jp/itbig94/10946686p.jpg';

const CardDetail = ({ marker }) => {
    console.log('marker---', marker);
    const submit = useSubmit();
    const handleDelete = () => {
        console.log('CardDetail delete!');
        const proceed = window.confirm('確定刪除?');
        if (proceed) {
            submit({ markerId: marker.id }, { method: 'delete' });
        }
    };
    return (
        <Card
            className="shadow-lg"
            sx={{ borderColor: '#fff', border: '3px solid' }}
            // sx={{ maxWidth: 345 }}
        >
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    // <IconButton aria-label="settings">
                    //     <MoreVertIcon />
                    // </IconButton>
                    <Stack spacing={1} direction="row">
                        <Button component={Link} to="edit" color="success" variant="contained">
                            Edit
                        </Button>
                        <Button color="error" variant="contained" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Stack>
                }
                title={marker.markName}
                titleTypographyProps={{ variant: 'h4' }}
                // subheader="September 14, 2016"
            />
            <CardMedia component="img" height="480" image={sampleImg} alt="Paella dish" />
            <CardContent>
                <Stack spacing={3}>
                    <Paper sx={{ p: 1 }} elevation={24}>
                        <Typography className="text-amber-400" sx={{ fontWeight: 'bold' }} variant="subtitle1">
                            地圖
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            {marker.level}
                        </Typography>
                    </Paper>
                    {/* <Divider className="bg-amber-400" /> */}
                    <Paper sx={{ p: 1 }} elevation={24}>
                        <Typography className="text-amber-400" sx={{ fontWeight: 'bold' }} variant="subtitle1">
                            座標
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            '{marker.coord_x}', '{marker.coord_y}', '{marker.coord_z}'
                        </Typography>
                    </Paper>
                    {/* <Divider className="bg-amber-400" /> */}
                    <Paper sx={{ p: 1 }} elevation={24}>
                        <Typography className="text-amber-400" sx={{ fontWeight: 'bold' }} variant="subtitle1">
                            備註
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </Paper>
                </Stack>
            </CardContent>
        </Card>
    );
};
export default CardDetail;
