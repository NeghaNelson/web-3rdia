// src/components/doctor/MyPatients.js

import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
  CircularProgress
} from '@mui/material';

import {
  MedicalServices,
  Person,
  Cake,
  Bloodtype,
  Male,
  Female,
  Transgender
} from '@mui/icons-material';

function MyPatients({ doctorInfo }) {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openPrescriptionDialog, setOpenPrescriptionDialog] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const [newPrescription, setNewPrescription] = useState({
    medicine_name: '',
    dosage: '',
    frequency: 'Once daily',
    days: 1,
    cost_per_day: 0,
    instructions: '',
  });

  useEffect(() => {
    // Fetch patients from backend when doctorInfo is available
    fetchPatients();
    setLoading(false); // Remove this when you add the real fetch call
  }, [doctorInfo]);

  // Example placeholder for making a backend request.
  const fetchPatients = async () => {
    // Implement API call here
    setLoading(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handlePrescribe = (patient) => {
    setSelectedPatient(patient);
    setOpenPrescriptionDialog(true);
  };

  // Placeholder for prescribe logic
  const prescribeMedicine = async (e) => {
    e.preventDefault();
    // Implement API call here
    setOpenPrescriptionDialog(false);
    setNewPrescription({
      medicine_name: '',
      dosage: '',
      frequency: 'Once daily',
      days: 1,
      cost_per_day: 0,
      instructions: '',
    });
    showSnackbar('Prescription added successfully!');
  };

  const getGenderIcon = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male': return <Male sx={{ color: '#1976d2' }} />;
      case 'female': return <Female sx={{ color: '#e91e63' }} />;
      default: return <Transgender sx={{ color: '#9c27b0' }} />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
          My Patients
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and prescribe medicines to your assigned patients
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {patients.map((patient) => (
          <Grid item xs={12} sm={6} lg={4} key={patient.id}>
            <Card elevation={0} sx={{ border: '1px solid #e3f2fd', borderRadius: 3 }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: '#2196f3', mr: 2 }}>
                    {patient.user?.name?.charAt(0).toUpperCase() || <Person />}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">{patient.user?.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {String(patient.id).substring(0, 8)}...
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Cake sx={{ color: '#2196f3', fontSize: 20 }} />
                  <Typography variant="body2">{patient.age || 'N/A'} years</Typography>
                  {getGenderIcon(patient.gender)}
                  <Typography variant="body2">{patient.gender || 'N/A'}</Typography>
                  <Bloodtype sx={{ color: '#f44336', fontSize: 20 }} />
                  <Typography variant="body2">Blood Group: {patient.blood_group || 'N/A'}</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => handlePrescribe(patient)}
                  sx={{
                    mt: 2,
                    background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
                    }
                  }}
                  fullWidth
                >
                  Write Prescription
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {patients.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <MedicalServices sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No patients assigned yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Confirm appointments to assign patients to you
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      {/* Prescription Dialog */}
      <Dialog open={openPrescriptionDialog} onClose={() => setOpenPrescriptionDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Write Prescription for {selectedPatient?.user?.name}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={prescribeMedicine} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              label="Medicine Name"
              value={newPrescription.medicine_name}
              onChange={(e) => setNewPrescription({ ...newPrescription, medicine_name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Dosage"
              value={newPrescription.dosage}
              onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
              required
              fullWidth
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                value={newPrescription.frequency}
                label="Frequency"
                onChange={(e) => setNewPrescription({ ...newPrescription, frequency: e.target.value })}
              >
                <MenuItem value="Once daily">Once daily</MenuItem>
                <MenuItem value="Twice daily">Twice daily</MenuItem>
                <MenuItem value="Three times daily">Three times daily</MenuItem>
                <MenuItem value="Four times daily">Four times daily</MenuItem>
                <MenuItem value="As needed">As needed</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Days"
              type="number"
              value={newPrescription.days}
              onChange={(e) => setNewPrescription({ ...newPrescription, days: parseInt(e.target.value) || 1 })}
              inputProps={{ min: 1 }}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Cost per day"
              type="number"
              value={newPrescription.cost_per_day}
              onChange={(e) => setNewPrescription({ ...newPrescription, cost_per_day: parseFloat(e.target.value) || 0 })}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Instructions"
              value={newPrescription.instructions}
              onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPrescriptionDialog(false)} color="inherit">Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            onClick={prescribeMedicine}
            disabled
          >
            Prescribe Medicine
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default MyPatients;
