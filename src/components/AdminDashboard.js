import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Alert,
  Snackbar,
  Avatar,
  Divider,
  Paper,
  Stack
} from '@mui/material';
import {
  Logout,
  Add,
  Delete,
  Person,
  MedicalServices,
  Dashboard,
  LocalHospital,
  Edit,
  Visibility
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [statistics, setStatistics] = useState({ totalDoctors: 0, totalPatients: 0, totalAppointments: 0 });
  const [openAddForm, setOpenAddForm] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
    role: 'doctor',
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    specialization: '',
    medical_license_number: '',
    consultation_fee: '150'
  });
  const { logout, user } = useAuth();

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchStatistics();
  }, []);

  // Placeholder fetch functions
  const fetchDoctors = async () => { };
  const fetchPatients = async () => { };
  const fetchStatistics = async () => { };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Placeholder add & delete functions
  const addUser = async (e) => { e.preventDefault(); };
  const deleteDoctor = async (doctorId, userId, name) => { };
  const deletePatient = async (patientId, userId, name) => { };

  return (
    <Container maxWidth="xl" sx={{ pt: 4 }}>
      {/* HEADER */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#1a237e' }}>
          Admin Dashboard
        </Typography>
        <Box>
          <Typography fontWeight={600} sx={{ mr: 3 }}>
            Welcome, {user?.name}
          </Typography>
          <Button
            color="inherit"
            sx={{
              bgcolor: 'rgba(33,150,243,0.08)',
              borderRadius: 2,
              px: 2,
              ml: 1
            }}
            onClick={logout}
            startIcon={<Logout />}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* STATISTICS */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)', color: 'white', borderRadius: 3, boxShadow: '0 4px 20px rgba(30, 93, 188, 0.21)' }}>
            <CardContent>
              <Typography fontWeight={600} variant="body1" sx={{ opacity: 0.85 }}>
                {statistics.totalDoctors}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: .5 }}>
                Total Doctors
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ background: 'linear-gradient(135deg, #e91e63 0%, #f06292 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={600} variant="body1" sx={{ opacity: 0.85 }}>
                {statistics.totalPatients}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: .5 }}>
                Total Patients
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card elevation={0} sx={{ background: 'linear-gradient(135deg, #00bcd4 0%, #4dd0e1 100%)', color: 'white', borderRadius: 3 }}>
            <CardContent>
              <Typography fontWeight={600} variant="body1" sx={{ opacity: 0.85 }}>
                {statistics.totalAppointments}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 600, mt: .5 }}>
                Total Appointments
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* DOCTORS */}
      <Card elevation={0} sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 3 }}>
        <CardHeader
          title="Doctors"
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setNewUser({ ...newUser, role: 'doctor' });
                setOpenAddForm(true);
              }}
              sx={{ background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)' }}
            >
              Add Doctor
            </Button>
          }
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {doctors.map(doctor => (
              <Grid item xs={12} md={6} lg={4} key={doctor.id}>
                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 1.5px 10px #1976d21b' }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#2196f3' }}>
                        {doctor.user?.name?.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>Dr. {doctor.user?.name}</Typography>
                    </Box>
                    <Chip label={doctor.specialization || 'General Physician'} color="primary" size="small" />
                    <Typography variant="body2">License: {doctor.medical_license_number || 'N/A'}</Typography>
                    <Typography variant="body2">Fee: ${doctor.consultation_fee || '150.00'}</Typography>
                    <Typography variant="body2">Email: {doctor.user?.email || 'N/A'}</Typography>
                    <Typography variant="body2">Phone: {doctor.user?.phone || 'N/A'}</Typography>
                    <Typography variant="body2">Username: {doctor.user?.username}</Typography>
                    <Typography variant="body2">Joined: {new Date(doctor.user?.created_at).toLocaleDateString()}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => deleteDoctor(doctor.id, doctor.user?.id, doctor.user?.name)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </Paper>
              </Grid>
            ))}
            {doctors.length === 0 && (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                  No doctors found
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* PATIENTS */}
      <Card elevation={0} sx={{ mb: 3, border: '1px solid #e0e0e0', borderRadius: 3 }}>
        <CardHeader
          title="Patients"
          action={
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                setNewUser({ ...newUser, role: 'patient' });
                setOpenAddForm(true);
              }}
              sx={{ background: 'linear-gradient(135deg, #e91e63 0%, #f06292 100%)' }}
            >
              Add Patient
            </Button>
          }
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            {patients.map(patient => (
              <Grid item xs={12} md={6} lg={4} key={patient.id}>
                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 1.5px 10px #ff40811b' }}>
                  <Stack spacing={1}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar sx={{ bgcolor: '#e91e63' }}>
                        {patient.user?.name?.charAt(0)}
                      </Avatar>
                      <Typography variant="h6" fontWeight={700}>{patient.user?.name}</Typography>
                    </Box>
                    <Typography variant="body2">{patient.age || 'N/A'} years • {patient.gender || 'N/A'}</Typography>
                    <Typography variant="body2">Blood Group: {patient.blood_group || 'N/A'}</Typography>
                    <Typography variant="body2">Doctor: {patient.doctor?.user?.name || 'Not assigned'}</Typography>
                    <Typography variant="body2">Email: {patient.user?.email || 'N/A'}</Typography>
                    <Typography variant="body2">Phone: {patient.user?.phone || 'N/A'}</Typography>
                    <Typography variant="body2">Username: {patient.user?.username}</Typography>
                    <Typography variant="body2">Registered: {new Date(patient.user?.created_at).toLocaleDateString()}</Typography>
                    <IconButton
                      color="error"
                      onClick={() => deletePatient(patient.id, patient.user?.id, patient.user?.name)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </Stack>
                </Paper>
              </Grid>
            ))}
            {patients.length === 0 && (
              <Grid item xs={12}>
                <Typography align="center" color="text.secondary" sx={{ py: 3 }}>
                  No patients found
                </Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={openAddForm} onClose={() => setOpenAddForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New {newUser.role === 'doctor' ? 'Doctor' : 'Patient'}</DialogTitle>
        <DialogContent>
          <Box component="form"  onSubmit={addUser}>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={newUser.role}
                label="Role"
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              >
                <MenuItem value="doctor">Doctor</MenuItem>
                <MenuItem value="patient">Patient</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Full Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Username"
              value={newUser.username}
              onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              type="password"
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              fullWidth
            />
            <TextField
              margin="normal"
              label="Phone"
              value={newUser.phone}
              onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              fullWidth
            />
            {newUser.role === 'doctor' && (
              <>
                <TextField
                  margin="normal"
                  label="Specialization"
                  value={newUser.specialization}
                  onChange={(e) => setNewUser({ ...newUser, specialization: e.target.value })}
                  placeholder="e.g., Cardiology"
                  required
                  fullWidth
                />
                <TextField
                  margin="normal"
                  label="Medical License Number"
                  value={newUser.medical_license_number}
                  onChange={(e) => setNewUser({ ...newUser, medical_license_number: e.target.value })}
                  required
                  fullWidth
                />
                <TextField
                  margin="normal"
                  label="Consultation Fee"
                  value={newUser.consultation_fee}
                  onChange={(e) => setNewUser({ ...newUser, consultation_fee: e.target.value })}
                  inputProps={{ min: 0, step: 0.01 }}
                  fullWidth
                />
              </>
            )}
            {newUser.role === 'patient' && (
              <>
                <TextField
                  margin="normal"
                  label="Age"
                  type="number"
                  value={newUser.age}
                  onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
                  inputProps={{ min: 0, max: 150 }}
                  fullWidth
                />
                <FormControl margin="normal" fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={newUser.gender}
                    label="Gender"
                    onChange={(e) => setNewUser({ ...newUser, gender: e.target.value })}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddForm(false)}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            onClick={addUser}
            disabled
          >
            Add {newUser.role === 'doctor' ? 'Doctor' : 'Patient'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} variant="filled">
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
export default AdminDashboard;
