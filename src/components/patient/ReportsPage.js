import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  Tabs,
  Tab,
  IconButton
} from '@mui/material';
import {
  Assessment,
  Download,
  Print,
  CalendarToday,
  CheckCircle,
  Description,
  Visibility
} from '@mui/icons-material';

function ReportsPage({ patientInfo }) {
  const [appointments, setAppointments] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [testReports, setTestReports] = useState([]);
  const [tabValue, setTabValue] = useState('test-reports');

  const fetchData = async () => {
  // Example: replace with real API calls
  const reports = await fetchTestReportsAPI();
  setTestReports(reports);
    const appointmentsRes = await fetch('/api/appointments?patientId=' + patientInfo.id);
  const appointments = await appointmentsRes.json();
  setAppointments(appointments);

  const prescriptionsRes = await fetch('/api/prescriptions?patientId=' + patientInfo.id);
  const prescriptions = await prescriptionsRes.json();
  setPrescriptions(prescriptions);

  const testReportsRes = await fetch('/api/test-reports?patientId=' + patientInfo.id);
  const testReports = await testReportsRes.json();
  setTestReports(testReports);
};

const fetchTestReportsAPI = async (patientId) => {
  const res = await fetch(`/api/test-reports?patientId=${patientId}`);
  return res.json();
};





  useEffect(() => {
    // Fetch appointments, prescriptions, and test reports from your backend here
    fetchData();
  }, [patientInfo]);

  // Example placeholder for status color
  const getStatusColor = (status) => {
    const colors = { pending: 'warning', confirmed: 'info', completed: 'success', cancelled: 'error' };
    return colors[status] || 'default';
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    alert('PDF download feature coming soon!');
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
            Medical Reports & History
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View your test reports, appointments, and prescription history
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<Print />}
            onClick={handlePrint}
            sx={{
              borderColor: '#2196f3',
              color: '#2196f3',
              '&:hover': {
                borderColor: '#1976d2',
                bgcolor: '#e3f2fd'
              }
            }}
          >
            Print
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Download />}
            onClick={handleDownloadPDF}
            sx={{
              background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)',
              boxShadow: '0 4px 15px rgba(30, 93, 188, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)',
                boxShadow: '0 6px 20px rgba(30, 93, 188, 0.4)'
              }
            }}
          >
            Download PDF
          </Button>
        </Box>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Card elevation={0} sx={{
            border: '1px solid #e3f2fd', borderRadius: 3, boxShadow: '0 2px 12px rgba(30, 93, 188, 0.08)',
            transition: 'all 0.3s', '&:hover': {
              transform: 'translateY(-4px)', boxShadow: '0 6px 20px rgba(30, 93, 188, 0.15)'
            }
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  p: 2,
                  background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                  borderRadius: 2
                }}>
                  <Description sx={{ color: '#1976d2', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold" sx={{ color: '#1a237e' }}>
                    {testReports.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Test Reports
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* Other statistic cards omitted for brevity - keep as in your original code */}
      </Grid>

      {/* Tabs for different sections */}
      <Card elevation={0} sx={{ border: '1px solid #e0e0e0', borderRadius: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem'
              }
            }}
          >
            <Tab 
              icon={<Description />} 
              iconPosition="start"
              label={`Test Reports (${testReports.length})`} 
              value="test-reports" 
            />
            <Tab 
              icon={<CalendarToday />} 
              iconPosition="start"
              label={`Appointments (${appointments.length})`} 
              value="appointments" 
            />
            <Tab 
              icon={<Assessment />} 
              iconPosition="start"
              label={`Prescriptions (${prescriptions.length})`} 
              value="prescriptions" 
            />
          </Tabs>
        </Box>

        {/* Test Reports Tab */}
        {/* ... keep the rest of your tabbed content, just remove data fetching logic ... */}
      </Card>
    </Container>
  );
}
export default ReportsPage
