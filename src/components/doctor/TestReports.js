// src/components/doctor/TestReports.js

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
  Chip,
  IconButton,
  LinearProgress
} from '@mui/material';

import {
  Assessment,
  Upload,
  Download,
  Delete,
  CloudUpload,
  Description
} from '@mui/icons-material';

function TestReports({ doctorInfo }) {
  const [reports, setReports] = useState([]);
  const [patients, setPatients] = useState([]);
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [newReport, setNewReport] = useState({
    patient_id: '',
    report_name: '',
    report_type: 'Blood Test',
    description: '',
    test_date: new Date().toISOString().split('T')[0]
  });

  const fetchReports = async () => {
  // TODO: Call your backend API here and setReports(data);
};

const fetchPatients = async () => {
  // TODO: Call your backend API here and setPatients(data);
};


  useEffect(() => {
    fetchReports();
    fetchPatients();
  }, [doctorInfo]);

  // Placeholder for file select and upload logic:
  const handleFileSelect = (event) => {
    // handle file select
  };
  const uploadReport = async (e) => {
    // handle upload
  };
  const deleteReport = async (reportId, fileUrl) => {
    // handle deletion
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#1a237e' }}>
          Test Reports
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload and manage patient test reports
        </Typography>
      </Box>

      <Button
        variant="contained"
        startIcon={<CloudUpload />}
        onClick={() => setOpenUploadDialog(true)}
        sx={{
          background: 'linear-gradient(135deg, #1e5dbc 0%, #2196f3 100%)',
          boxShadow: '0 4px 15px rgba(30, 93, 188, 0.3)',
          mb: 3,
          '&:hover': {
            background: 'linear-gradient(135deg, #1565c0 0%, #1976d2 100%)'
          }
        }}
      >
        Upload New Report
      </Button>

      <Grid container spacing={3}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} lg={4} key={report.id}>
            <Card elevation={0} sx={{ border: '1px solid #e3f2fd', borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {report.report_name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Patient: {report.patient?.user?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Test Date: {new Date(report.test_date).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  File: {report.file_name}
                </Typography>
                {report.description && (
                  <Box sx={{ py: 1 }}>
                    <Typography variant="caption" color="text.secondary" fontWeight={600}>
                      Description:
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {report.description}
                    </Typography>
                  </Box>
                )}
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    startIcon={<Download />}
                    href={report.file_url}
                    download
                    target="_blank"
                    sx={{ flex: 1 }}
                  >
                    Download
                  </Button>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => deleteReport(report.id, report.file_url)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {reports.length === 0 && (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Assessment sx={{ fontSize: 80, color: '#e0e0e0', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No test reports uploaded yet
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Dialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Upload Test Report</DialogTitle>
        <DialogContent>
          <Box component="form" /* onSubmit={uploadReport} */ sx={{ mt: 2 }}>
            <FormControl margin="normal" fullWidth>
              <InputLabel>Select Patient</InputLabel>
              <Select
                value={newReport.patient_id}
                label="Select Patient"
                onChange={(e) => setNewReport({ ...newReport, patient_id: e.target.value })}
                required
              >
                {patients.map(patient => (
                  <MenuItem key={patient.id} value={patient.id}>
                    {patient.user?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Report Name"
              value={newReport.report_name}
              onChange={(e) => setNewReport({ ...newReport, report_name: e.target.value })}
              required
              fullWidth
            />
            <FormControl margin="normal" fullWidth>
              <InputLabel>Report Type</InputLabel>
              <Select
                value={newReport.report_type}
                label="Report Type"
                onChange={(e) => setNewReport({ ...newReport, report_type: e.target.value })}
                required
              >
                <MenuItem value="Blood Test">Blood Test</MenuItem>
                <MenuItem value="X-Ray">X-Ray</MenuItem>
                <MenuItem value="MRI Scan">MRI Scan</MenuItem>
                <MenuItem value="CT Scan">CT Scan</MenuItem>
                <MenuItem value="Ultrasound">Ultrasound</MenuItem>
                <MenuItem value="ECG">ECG</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="normal"
              label="Test Date"
              type="date"
              value={newReport.test_date}
              onChange={(e) => setNewReport({ ...newReport, test_date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              required
              fullWidth
            />
            <TextField
              margin="normal"
              label="Description"
              value={newReport.description}
              onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
            {/* File upload field should go here */}
            <Button variant="contained" component="label" fullWidth sx={{ mb: 1 }}>
              Select File
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.png" hidden onChange={handleFileSelect} />
            </Button>
            {selectedFile && (
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </Typography>
            )}
            {uploading && <LinearProgress sx={{ mt: 2 }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUploadDialog(false)} disabled={uploading}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled
          >
            {uploading ? 'Uploading...' : 'Upload Report'}
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

export default TestReports
