import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

import { Box } from "@material-ui/core";

import { Link, useSearchParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isFetching = useSelector((state) => state.persistedReducer.isFetching);
  const error = useSelector((state) => state.persistedReducer.error);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      isError && setIsError(false);
      login(dispatch, { username, password });
    } else {
      setIsError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {searchParams.get("msg") && (
          <Grid item xs={12}>
            <Typography variant="h6" color="primary" align="center">
              {searchParams.get("msg")}
            </Typography>
          </Grid>
        )}
        <form className={classes.form} noValidate>
          <TextField
            error={isError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            error={isError}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={isFetching}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/auth/register">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          {error && (
            <Box mt={5}>
              <Typography variant="body2" color="error" align="center">
                {"Something went wrong !!!"}
              </Typography>
            </Box>
          )}
        </form>
      </div>
    </Container>
  );
}
