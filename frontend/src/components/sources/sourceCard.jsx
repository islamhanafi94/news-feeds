import React, { useState } from 'react';
import { Grid, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import sourcesService from '../../services/sourcesService';

function SourceCard({ card, styleClasses: classes, status }) {
    const [isSubscribed, setIsSubscribed] = useState(status);


    const handleUnSubscribe = async () => {
        await sourcesService.removeSource(card.id);
        setIsSubscribed(false)
    }

    const handleSubscribe = async () => {
        await sourcesService.addSource(card.id);
        setIsSubscribed(true)
    }
    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                    </Typography>
                    <Typography>
                        {card.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        href={card.url}
                        target="_blank"
                        rel="noreferrer"
                        size="small"
                    >
                        Visit Website
                </Button>
                    <Button
                        variant="contained"
                        color={isSubscribed ? "secondary" : "primary"}
                        className={classes.button}
                        startIcon={isSubscribed ? <DeleteIcon /> : <CheckCircleIcon />}
                        size="small"
                        onClick={isSubscribed ? handleUnSubscribe : handleSubscribe}
                    >{isSubscribed ? "Unsubscribe" : "Subscribe"}
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default SourceCard

