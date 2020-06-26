import React, { useState } from 'react'
import {
    Avatar, Container, CssBaseline, Typography,
    TextField, Button, Grid, Link, makeStyles
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { registerValidate } from '../../services/formValidation';
import { register } from '../../services/userService';




function RegisterForm(props) {
    const classes = useStyles();
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", repeatPassword: "" })
    const [errors, setErrors] = useState({})

    const handleInputChange = (e) => {
        const newUser = { ...user };
        newUser[e.currentTarget.name] = e.target.value;
        setUser(newUser);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = registerValidate(user);
        setErrors(errors || {});
        console.log(errors);
        if (errors) return;

        try {
            await register(user);
            window.location = '/home';
        } catch ({ response }) {
            if (response && response.status === 400) {
                const errorMsg = { ...errors }
                errorMsg.all = "invalid email or password";
                setErrors(errorMsg);
            }
            if (response && response.status === 403) {
                const errorMsg = { ...errors }
                errorMsg.all = "user already exists, please login";
                setErrors(errorMsg);
            }
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
          </Typography>
                <form onSubmit={handleSubmit} className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={errors.firstName ? true : false}
                                autoComplete="fname"
                                name="firstName"
                                value={user.firstName}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="lastName"
                                error={errors.lastName ? true : false}
                                value={user.lastName}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.email ? true : false}
                                value={user.email}
                                onChange={handleInputChange}
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={errors.password || errors.repeatPassword ? true : false}
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="repeatPassword"
                                error={errors.password || errors.repeatPassword ? true : false}
                                value={user.repeatPassword}
                                onChange={handleInputChange}
                                variant="outlined"
                                required
                                fullWidth
                                label="Re-enter password"
                                type="password"
                                id="repeatPassword"
                            />
                        </Grid>

                    </Grid>
                    {errors.all ? <Alert severity="error">{errors.all}</Alert> : ""}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default RegisterForm
