import * as React from 'react';
import { Link, useSubmit, useRouteLoaderData } from 'react-router-dom';
import { transformMarkerType } from '../../util/utility';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
//
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
//
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function CardInfo({ markInfo }) {
    const { id, title, type, imgSrc, axis } = markInfo;
    const token = useRouteLoaderData('root');
    const submit = useSubmit();
    const handleEdit = () => {
        console.log('edit!');
    };
    const handleDelete = () => {
        console.log('delete!');
        const proceed = window.confirm('確定刪除?');
        if (proceed) {
            submit({ markerId: id }, { method: 'delete' });
        }
    };
    return (
        <Card sx={{ width: '100%' }}>
            <CardActionArea component={Link} to={`/markers/${id}`}>
                <CardContent
                    sx={{
                        p: 0,
                    }}
                >
                    <Grid container spacing={0.5}>
                        <Grid item xs={4}>
                            <CardMedia
                                sx={{ width: 320, height: '100%', minHeight: 180 }}
                                image={imgSrc}
                                title="green iguana"
                            />
                        </Grid>
                        <Grid item container xs={8}>
                            <Grid item xs={12}>
                                <List component="ul" sx={{ my: 0, py: 0 }} aria-label="mailbox folders">
                                    <ListItem component="li" divider>
                                        <Typography variant="h5" component="div">
                                            Type ({transformMarkerType(type)}):
                                        </Typography>
                                        <Typography variant="h6" component="div">
                                            {title}
                                        </Typography>
                                    </ListItem>
                                    <ListItem component="li">
                                        <Typography variant="h6" component="div">
                                            座標 :
                                        </Typography>
                                    </ListItem>
                                    <ListItem component="li">
                                        <Typography variant="h6" component="div">
                                            {JSON.stringify(axis)}
                                        </Typography>
                                    </ListItem>
                                </List>
                            </Grid>
                            {token && (
                                <Grid item xs={12}>
                                    <CardActions sx={{ justifyContent: 'end' }}>
                                        <Button onClick={handleEdit} size="small">
                                            Edit
                                        </Button>
                                        <Button onClick={handleDelete} size="small">
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
