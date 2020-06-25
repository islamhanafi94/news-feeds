import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, Card, CardActions, CardContent } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import sourcesService from '../../services/sourcesService';

function SourceCard({ card, styleClasses: classes }) {
    const [userSubscribes, setUserSubscribes] = useState([])
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        (async () => {
            const subscribes = await sourcesService.getUserSources();
            setUserSubscribes(subscribes)
        })()
    }, [isChanged])

    const handleUnSubscribe = async (e) => {
        e.preventDefault();
        await sourcesService.removeSource(card.id);
        setIsChanged(!isChanged)
    }
    const handleSubscribe = async (e) => {
        e.preventDefault();
        await sourcesService.addSource(card.id)
        setIsChanged(!isChanged)
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {card.name}
                        {/* <Chip
                            label={card.language}
                        /> */}
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
                    {userSubscribes.includes(card.id) ?
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={handleUnSubscribe}
                        >Unsubscribe
                        </Button>
                        : <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            size="small"
                            onClick={handleSubscribe}
                            startIcon={<CheckCircleIcon />}
                        >Subscribe
                    </Button>
                    }

                </CardActions>
            </Card>
        </Grid>
    )
}

export default SourceCard

