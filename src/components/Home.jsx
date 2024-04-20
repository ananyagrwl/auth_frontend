import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtverify } from '../api/auth';

export default function Home() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState("");

  const handlejwt = async ()=>{
    const data = await jwtverify(Cookies.get("token"));
    setUserData(data);
  }

  useEffect(() => {
    if (!Cookies.get("token")) {
      navigate("/")
    }
    else {
      handlejwt();
    }
  },[])

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
            {userData.Name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Email: {userData.Email}
          </Typography>
          <Typography variant="body1">
            Location: {userData.Location}
          </Typography>
          <Typography variant="body1">
            Position: {userData.Position}
          </Typography>
          <Typography variant="body1">
            Department: {userData.Department}
          </Typography>
          <Typography variant="body1">
            Age: {userData.Age}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}