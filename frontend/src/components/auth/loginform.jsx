import React, { useState } from 'react';
import {
    Avatar, Container, CssBaseline, Typography,
    TextField, Button, Grid, Link, makeStyles
} from '@material-ui/core';
import { loginValidate } from '../../services/formValidation';
import { login } from '../../services/authService';

function LoginForm() {
    const classes = useStyles();

    const [user, setUser] = useState({ email: "", password: "" })
    // const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const newUser = { ...user }
        newUser[e.currentTarget.name] = e.target.value
        setUser(newUser)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const verrors = loginValidate(user);
        console.log(verrors);
        // setErrors(verrors || {});
        // if (verrors) return;
        try {
            await login(user.email, user.password);
            window.location = '/home';
        } catch (error) {
            // handle error msg to user according to backend validation
            // TO-DO
            console.log(error);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        helperText=""
                        id="email"
                        value={user.email}
                        onChange={handleInputChange}
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={user.password}
                        onChange={handleInputChange}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                  </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default LoginForm
