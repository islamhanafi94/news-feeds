import React from 'react';
import { Typography, CircularProgress } from '@material-ui/core';


export default function Spinner() {

    return (
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            <CircularProgress color="secondary" />
        </Typography>
    );
}
