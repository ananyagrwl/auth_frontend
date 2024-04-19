import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { jwtverify, login } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("token")) {
      navigate("/home")
    }
  }, [])

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (email == "" || !isValidEmail(email)) {
      alert("Invalid Email")
    }
    else if (password == "" || password.length < 6) {
      alert("Enter a Valid Password")
    }
    else {
      const data = await login(email, password);
      console.log("token from login",data.token);
      console.log("data", data);
      if (data.data) {
        Cookies.set('token', data.token, { expires: 7 });
        // const user = await jwtverify(Cookies.get('token'));
        // if (user) {
        //   Cookies.set('name', user.Name, { expires: 7 });
        //   Cookies.set('email', user.Email, { expires: 7 });
        //   Cookies.set('position', user.Position, { expires: 7 });
        //   Cookies.set('department', user.Department, { expires: 7 });
        //   Cookies.set('location', user.Location, { expires: 7 });
        //   Cookies.set('age', user.Age, { expires: 7 });
        //   navigate("/home");
        // }
        // else {
        //   alert("Something went wrong");
        //   navigate("/");
        // }
        navigate("/home");
      }
      else {
        alert("EmailId or Password Incorrect!");
      }
    }

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            LogIn
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
            <Grid container>
              <Link href="/" variant="body2">
                {"New to Autho ? Sign Up"}
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}