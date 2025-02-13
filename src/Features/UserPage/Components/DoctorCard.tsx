import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import { DoctorCardProps } from '../Types/DoctorCardProps.ts';

const DoctorCard: React.FC<DoctorCardProps> = ({
    photo,
    firstName,
    middleName,
    lastName,
    experience,
    officeAddress,
}) => {
    return (
    <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
            <CardMedia
                component="img"
                height="140"
                image={photo}
                alt={photo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {`${firstName} ${middleName} ${lastName}`} 
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`Experience: ${experience}`} 
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {`Office Address: ${officeAddress}`}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
    );
}

export default DoctorCard;