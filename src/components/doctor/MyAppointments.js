// src/components/doctor/MyAppointments.js

import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  Snackbar,
  Alert
} from '@mui/material';

import {
  CalendarToday,
  CheckCircle,
  Cancel,
  AccessTime,
  AttachMoney
} from '@mui/icons-material';

function MyAppointments({ doctorInfo }) {
  const [appointments, setAppointments] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    // fetchAppointments will go here after you implement your backend API call
    fetchAppointments();
  }, [doctorInfo]);

  // Placeholder for API fetching logic
  const fetchAppointments = async () => {
    // Use your backend API to get appointments
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  // Placeholder for status update logic
  const updateAppointmentStatus = async (appointmentId, status, patientId) => {
    // Use your backend API to update appointment status
    // On success: showSnackbar('Appointment updated!');
  };

  const getStatusColor = (status) => {
    const colors = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'error' };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
          My Appointments
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your scheduled appointments
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} lg={4} key={appointment.id}>
            <Card elevation={0} sx={{ border: '1px solid #e3f2fd', borderRadius: 3, boxShadow: '0 2px 12px rgba(30, 93, 188, 0.08)' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {appointment.patient?.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(appointment.appointment_date).toLocaleDateString()} | {appointment.appointment_time}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <AttachMoney sx={{ fontSize: 16, verticalAlign: 'middle' }} />
                  {appointment.consultation_fee}
                </Typography>
                <Chip
                  label={appointment.status}
                  color={getStatusColor(appointment.status)}
                  sx={{ fontWeight: 600, mt: 1, mb: 2 }}
                  size="small"
                />
                {appointment.symptoms && (
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Symptoms:</strong> {appointment.symptoms}
                  </Typography>
                )}

                {/* Action Buttons (disabled for now, to be implemented with backend) */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={() => updateAppointmentStatus(appointment.id, 'confirmed', appointment.patient_id)}
                    disabled={appointment.status === 'confirmed' || appointment.status === 'completed'}
                    sx={{ flex: 1 }}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => updateAppointmentStatus(appointment.id, 'completed', appointment.patient_id)}
                    disabled={appointment.status === 'completed'}
                    sx={{
                      flex: 1,
                      background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)'
                    }}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => updateAppointmentStatus(appointment.id, 'cancelled', appointment.patient_id)}
                    disabled={appointment.status === 'cancelled'}
                    sx={{ flex: 1 }}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {appointments.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <CalendarToday sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No appointments scheduled
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

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

export default MyAppointments;
