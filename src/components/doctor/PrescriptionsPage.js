// src/components/doctor/PrescriptionsPage.js

import React, { useState, useEffect } from 'react';

import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip
} from '@mui/material';

import {
  MedicalServices
} from '@mui/icons-material';

function PrescriptionsPage({ doctorInfo }) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions(); // <-- Call your backend API here in the future
  }, [doctorInfo]);

  // Placeholder for future API logic:
  const fetchPrescriptions = async () => {
    // Use your backend API to fetch prescriptions written by this doctor
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
          My Prescriptions
        </Typography>
        <Typography variant="body1" color="text.secondary">
          View all prescriptions you've written
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {prescriptions.map((prescription) => (
          <Grid item xs={12} sm={6} lg={4} key={prescription.id}>
            <Card elevation={0} sx={{ border: '1px solid #e3f2fd', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {prescription.medicine_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Patient: {prescription.patient?.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Dosage: {prescription.dosage}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Frequency: {prescription.frequency}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Duration: {prescription.days} days
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Cost/Day: ${prescription.cost_per_day}
                </Typography>
                {prescription.instructions && (
                  <Box sx={{ py: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Instructions:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {prescription.instructions}
                    </Typography>
                  </Box>
                )}
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Prescribed on: {new Date(prescription.created_at).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {prescriptions.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <MedicalServices sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No prescriptions written yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                You will see prescriptions here after you write them for your patients
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}

export default PrescriptionsPage;
