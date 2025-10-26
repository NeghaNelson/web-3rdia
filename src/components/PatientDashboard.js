import React, { useState } from 'react';
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
  Dashboard,
  Receipt,
  Assessment,
  Menu as MenuIcon,
  ChevronLeft,
  Logout,
  Cake,
  Bloodtype,
  Male,
  Female,
  Transgender
} from '@mui/icons-material';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import child components
import DashboardHome from './patient/DashboardHome';
import ExpensesPage from './patient/ExpensesPage';
import ReportsPage from './patient/ReportsPage';
import Logo from './Logo';

const drawerWidth = 280;

function PatientDashboard() {
  const [open, setOpen] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/patient' },
    { text: 'Expenses', icon: <Receipt />, path: '/patient/expenses' },
    { text: 'Reports', icon: <Assessment />, path: '/patient/reports' }
  ];

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male': return <Male sx={{ color: '#1976d2' }} />;
      case 'female': return <Female sx={{ color: '#e91e63' }} />;
      default: return <Transgender sx={{ color: '#9c27b0' }} />;
    }
  };

  const displayPatientId = () => {
    if (!user?.id && !user?._id) return 'N/A';
    const idString = String(user?.id || user?._id);
    return idString.length > 8 ? `${idString.substring(0, 8)}...` : idString;
  };

  // Calculate age from dateOfBirth
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return 'Not specified';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
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
            Welcome, {user?.name}
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
        {/* Patient Profile */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
          <Avatar sx={{ width: 56, height: 56, mb: 2, bgcolor: '#2196f3', fontWeight: 700 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#888', mb: 1 }}>
            Patient ID: {displayPatientId()}
          </Typography>
          <Divider sx={{ width: '100%', mb: 2 }} />
          <List>
            <ListItem disablePadding>
              <ListItemText
                primary="Age"
                secondary={calculateAge(user?.dateOfBirth)}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>{getGenderIcon(user?.gender)}</ListItemIcon>
              <ListItemText
                primary="Gender"
                secondary={user?.gender || 'Not specified'}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItem>
            <ListItem disablePadding>
              <ListItemIcon>
                <Bloodtype sx={{ color: '#f44336', fontSize: 20 }} />
              </ListItemIcon>
              <ListItemText
                primary="Blood Group"
                secondary={user?.bloodGroup || 'Not specified'}
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
          <Route path="/patient" element={<DashboardHome patientInfo={user} />} />
          <Route path="/patient/expenses" element={<ExpensesPage patientInfo={user} />} />
          <Route path="/patient/reports" element={<ReportsPage patientInfo={user} />} />
        </Routes>
      </Box>
    </Box>
  );
}
export default PatientDashboard;
