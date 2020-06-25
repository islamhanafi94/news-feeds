import React from 'react'
import { useHistory } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, makeStyles, MenuItem
} from '@material-ui/core';

function NavBar(props) {
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = (e) => {
        history.push('/logout')
    }

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    News-Feeds
                </Typography>
                <MenuItem onClick={() => history.push('/home')}>Home</MenuItem>
                <MenuItem onClick={() => history.push('/sources')}>Sources</MenuItem>
                <Button onClick={handleLogout} color="inherit">Logout</Button>
            </Toolbar>
        </AppBar>

    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 0,
    },
}));

export default NavBar
