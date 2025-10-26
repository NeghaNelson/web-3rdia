import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Chip,
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
  Alert
} from '@mui/material';

function DashboardHome({ patientInfo }) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [openAppointmentDialog, setOpenAppointmentDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [newAppointment, setNewAppointment] = useState({
    doctor_id: '',
    appointment_date: '',
    appointment_time: '',
    symptoms: ''
  });

  useEffect(() => {
    fetchPrescriptions();
    fetchAppointments();
    fetchDoctors();
  }, [patientInfo]);

  // API fetches
  const fetchDoctors = async () => {
    try {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      setDoctors([]); // fallback
    }
  };

  const fetchPrescriptions = async () => {
    if (!patientInfo?.id) return;
    try {
      const res = await fetch(`/api/prescriptions?patientId=${patientInfo.id}`);
      const data = await res.json();
      setPrescriptions(data);
    } catch (error) {
      setPrescriptions([]);
    }
  };

  const fetchAppointments = async () => {
    if (!patientInfo?.id) return;
    try {
      const res = await fetch(`/api/appointments?patientId=${patientInfo.id}`);
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      setAppointments([]);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const scheduleAppointment = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          patient_id: patientInfo.id,
          doctor_id: newAppointment.doctor_id,
          appointment_date: newAppointment.appointment_date,
          appointment_time: newAppointment.appointment_time,
          symptoms: newAppointment.symptoms,
        }),
      });

      if (!res.ok) throw new Error('Failed to book appointment');
      await fetchAppointments(); // refresh appointments list
      showSnackbar('Appointment booked successfully!');
      setOpenAppointmentDialog(false);
      setNewAppointment({ doctor_id: '', appointment_date: '', appointment_time: '', symptoms: '' });
    } catch (err) {
      showSnackbar('Error booking appointment', 'error');
    }
  };

  const getAppointmentStatusColor = (status) => {
    const colors = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'error' };
    return colors[status] || 'default';
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your appointments and prescriptions
        </Typography>
      </Box>

      {/* Quick Action Button */}
      <Button
        variant="contained"
        onClick={() => setOpenAppointmentDialog(true)}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)',
          boxShadow: '0 4px 15px rgba(30, 93, 188, 0.3)',
          mb: 4,
          '&:hover': {
            background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
            boxShadow: '0 6px 20px rgba(30, 93, 188, 0.4)'
          }
        }}
      >
        Book New Appointment
      </Button>

      {/* Prescriptions */}
      <Typography variant="h6" sx={{ color: '#2196f3', fontWeight: 600, mb: 2 }}>
        My Prescriptions
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {prescriptions.map((prescription) => (
          <Grid item xs={12} sm={6} md={4} key={prescription.id}>
            <Card elevation={0} sx={{ border: '1px solid #e3f2fd', borderRadius: 3 }}>
              <CardContent>
                <Typography fontWeight="bold">{prescription.medicine_name}</Typography>
                <Typography fontSize={14}>Dr. {prescription.doctor?.user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Dosage: {prescription.dosage}
                  <br />
                  Frequency: {prescription.frequency}
                  <br />
                  Duration: {prescription.days} days
                </Typography>
                {prescription.instructions && (
                  <Typography variant="caption" color="text.secondary">
                    Instructions: {prescription.instructions}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
        {prescriptions.length === 0 && (
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ textAlign: 'center', py: 3, color: '#888' }}>
              No prescriptions yet
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Appointments */}
      <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 600, mb: 2 }}>
        My Appointments
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {appointments.map((appointment) => (
          <Grid item xs={12} sm={6} md={4} key={appointment.id}>
            <Card elevation={0} sx={{ border: '1px solid #e8f5e9', borderRadius: 3 }}>
              <CardContent>
                <Typography fontWeight={600}>Dr. {appointment.doctor?.user?.name}</Typography>
                <Typography variant="body2" color="text.secondary">{appointment.doctor?.specialization}</Typography>
                <Typography variant="body2">
                  Date: {new Date(appointment.appointment_date).toLocaleDateString()}
                  <br />
                  Time: {appointment.appointment_time}
                  <br />
                  Fee: ${appointment.consultation_fee}
                </Typography>
                {appointment.symptoms && (
                  <Typography variant="caption" color="text.secondary">
                    Symptoms: {appointment.symptoms}
                  </Typography>
                )}
                <Chip
                  size="small"
                  label={appointment.status}
                  color={getAppointmentStatusColor(appointment.status)}
                  sx={{ mt: 1, fontWeight: 600 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
        {appointments.length === 0 && (
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ textAlign: 'center', py: 3, color: '#888' }}>
              No appointments scheduled
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* Book Appointment Dialog */}
      <Dialog
        open={openAppointmentDialog}
        onClose={() => setOpenAppointmentDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(30, 93, 188, 0.2)'
          }
        }}
      >
        <DialogTitle>Book New Appointment</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={scheduleAppointment}>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                value={newAppointment.doctor_id}
                label="Select Doctor"
                onChange={(e) => setNewAppointment({ ...newAppointment, doctor_id: e.target.value })}
                required
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    Dr. {doctor.user?.name} - {doctor.specialization} (${doctor.consultation_fee})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Appointment Date"
              type="date"
              value={newAppointment.appointment_date}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointment_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Appointment Time"
              type="time"
              value={newAppointment.appointment_time}
              onChange={(e) => setNewAppointment({ ...newAppointment, appointment_time: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Symptoms"
              value={newAppointment.symptoms}
              onChange={(e) => setNewAppointment({ ...newAppointment, symptoms: e.target.value })}
              multiline
              rows={3}
              fullWidth
              placeholder="Describe your symptoms..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAppointmentDialog(false)} sx={{ color: '#666' }}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={scheduleAppointment}
            disabled={
              !newAppointment.doctor_id ||
              !newAppointment.appointment_date ||
              !newAppointment.appointment_time
            }
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default DashboardHome;
