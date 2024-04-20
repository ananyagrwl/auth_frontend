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
import { verifyotp } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

export default function Signup() {

    const [mode, setMode] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOTP] = useState("");
    const [resOtp, setResOtp] = useState(""); // resOtp: resultant otp coming from backend
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get("token")) {
            navigate("/home");
        }
    })

    const handleSubmit = async () => {
        if (otp == resOtp) {
            navigate("/register", { state: { name, email, password } });
        }
        else {
            alert("otp not match");
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleVerify = async () => {
        if (email == "" || !isValidEmail(email)) {
            alert("Invalid Email")
        }
        else if (password == "" || password.length < 6) {
            alert("Enter a Valid Password")
        }
        else {
            const data = await verifyotp(email);
            if (data.data.randomNumber) {
                alert("Email sent!, Click OK to continue...");
                setMode(1);
                setResOtp(data.data.randomNumber);
            }
            else {
                alert("Email already in use");
            }
        }
    }

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
                        Sign Up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={name}
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value)}
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

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleVerify}
                        >
                            Verify Email
                        </Button>

                        {mode === 0 ? (
                            <Grid container>
                                <Link href="/login" variant="body2">
                                    {"Already have an account ? LogIn"}
                                </Link>
                            </Grid>
                        ) : (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="otp"
                                    value={otp}
                                    label="Enter OTP"
                                    name="otp"
                                    autoComplete="otp"
                                    autoFocus
                                    onChange={(e) => setOTP(e.target.value)}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    Submit OTP
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}