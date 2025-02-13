import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
    onClick,
}) => {
    return (
    <Card sx={{ maxWidth: 345 }} onClick={onClick}>
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