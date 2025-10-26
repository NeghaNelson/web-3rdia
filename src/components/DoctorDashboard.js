// src/components/DoctorDashboard.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Paper,
  Button
} from '@mui/material';
import {
  People,
  CalendarToday,
  Assignment,
  Assessment,
  Menu as MenuIcon,
  ChevronLeft,
  Logout,
  MedicalServices
} from '@mui/icons-material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import MyPatients from './doctor/MyPatients';
import MyAppointments from './doctor/MyAppointments';
import TestReports from './doctor/TestReports';
import PrescriptionsPage from './doctor/PrescriptionsPage';
import Logo from './Logo';

const drawerWidth = 280;

function DoctorDashboard() {
  const [open, setOpen] = useState(true);
  const [doctorInfo, setDoctorInfo] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch doctor info from your backend (replace with actual call)
    fetchDoctorData();
  }, [user]);

  const fetchDoctorData = async () => {
    // Implement your backend call here
    // setDoctorInfo(response.data); on success
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'My Patients', icon: <People />, path: '/doctor' },
    { text: 'My Appointments', icon: <CalendarToday />, path: '/doctor/appointments' },
    { text: 'Prescriptions', icon: <Assignment />, path: '/doctor/prescriptions' },
    { text: 'Test Reports', icon: <Assessment />, path: '/doctor/test-reports' }
  ];

  const displayDoctorId = () => {
    if (!doctorInfo?.medical_license_number) return 'Not Set';
    return doctorInfo.medical_license_number;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)',
          boxShadow: '0 4px 20px rgba(30, 93, 188, 0.3)'
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeft /> : <MenuIcon />}
          </IconButton>
          <Logo />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2, fontWeight: 700 }}>
            MediVault Medical Records
          </Typography>
          <Typography fontWeight={600} sx={{ mr: 3 }}>
            Welcome, Dr. {user?.name}
          </Typography>
          <Button
            color="inherit"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.15)',
              '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.25)' },
              borderRadius: 2,
              px: 2
            }}
            onClick={logout}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            boxShadow: '0 4px 24px rgba(30, 93, 188, 0.08)'
          }
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: '#2196f3', fontWeight: 700 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Dr. {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
            Medical License: {displayDoctorId()}
          </Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Specialization"
                secondary={doctorInfo?.specialization || 'Not specified'}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText
                primary="Consultation Fee"
                secondary={`$${doctorInfo?.consultation_fee || 'N/A'}`}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
          </List>
        </Box>
        <Divider />
        {/* Navigation Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  '&.Mui-selected': {
                    background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)',
                    boxShadow: '0 4px 12px rgba(33, 150, 243, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(33, 150, 243, 0.1)'
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          transition: (theme) =>
            theme.transitions.create(['margin', 'width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen
            }),
          bgcolor: '#f8f9fc',
          minHeight: '100vh'
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/doctor" element={<MyPatients doctorInfo={doctorInfo} />} />
          <Route path="/doctor/appointments" element={<MyAppointments doctorInfo={doctorInfo} />} />
          <Route path="/doctor/prescriptions" element={<PrescriptionsPage doctorInfo={doctorInfo} />} />
          <Route path="/doctor/test-reports" element={<TestReports doctorInfo={doctorInfo} />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default DoctorDashboard;
