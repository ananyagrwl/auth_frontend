import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Home() {

  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/")
    }
  })

  const handleLogout = ()=>{
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ maxWidth: 500, margin: 2 }}>
        <CardContent>
          <Button onClick={handleLogout} variant="contained">Logout</Button>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Welcome to Autho
          </Typography>
          <Typography variant="h5" sx={{ mt: 2 }}>
            {Cookies.get('name')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Email: {Cookies.get('email')}
          </Typography>
          <Typography variant="body1">
            Location: {Cookies.get('location')}
          </Typography>
          <Typography variant="body1">
            Position: {Cookies.get('position')}
          </Typography>
          <Typography variant="body1">
            Department: {Cookies.get('department')}
          </Typography>
          <Typography variant="body1">
            Age: {Cookies.get('age')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}