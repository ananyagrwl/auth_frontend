import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import Cookies from 'js-cookie';

const defaultTheme = createTheme();

export default function Register({ params }) {

    const [location, setLocation] = useState("");
    const [age, setAge] = useState("");
    const [position, setPosition] = useState(""); // designation of user
    const [department, setDepartment] = useState("");
    const navigate = useNavigate();
    const loc = useLocation();
    const { name, email, password } = loc.state;

    useEffect(() => {
        if (Cookies.get("token")) {
            navigate("/home")
        }
    }, [])

    const handleSubmit = async (e) => {
        const data = await signup(name, email, password, age, location, position, department);
        if (data.data) {
            Cookies.set('token', data.token, { expires: 7 });
            navigate("/home");        
        }
        else {
            alert("Email already exists");
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
                        Few more information ?
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={location}
                            id="location"
                            label="Location"
                            name="location"
                            autoComplete="location"
                            autoFocus
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={age}
                            name="age"
                            label="Age"
                            type="age"
                            id="age"
                            autoComplete="age"
                            onChange={(e) => setAge(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="position"
                            value={position}
                            label="Position"
                            name="position"
                            autoComplete="position"
                            autoFocus
                            onChange={(e) => setPosition(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="department"
                            value={department}
                            label="Department"
                            name="department"
                            autoComplete="department"
                            autoFocus
                            onChange={(e) => setDepartment(e.target.value)}
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Register
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}