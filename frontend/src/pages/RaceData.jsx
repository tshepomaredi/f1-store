// frontend/src/pages/RaceData.jsx
import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, FormControl, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getRaceData } from '../services/api';

const RaceData = () => {
  const [lapData, setLapData] = useState([]);
  const [selectedRace, setSelectedRace] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedRace) {
      fetchLapData(selectedRace);
    }
  }, [selectedRace]);

  const fetchLapData = async (race) => {
    setLoading(true);
    try {
      const data = await getRaceData(race);
      setLapData(data);
    } catch (error) {
      console.error('Error fetching lap data:', error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Race Lap Times Comparison
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <Select
            value={selectedRace}
            onChange={(e) => setSelectedRace(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">Select a race</MenuItem>
            <MenuItem value="monaco">Monaco GP</MenuItem>
            <MenuItem value="silverstone">British GP</MenuItem>
            <MenuItem value="monza">Italian GP</MenuItem>
          </Select>
        </FormControl>

        {loading ? (
          <Typography>Loading...</Typography>
        ) : lapData.length > 0 ? (
          <LineChart width={800} height={400} data={lapData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="lap" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="driver1Time" stroke="#8884d8" name="Driver 1" />
            <Line type="monotone" dataKey="driver2Time" stroke="#82ca9d" name="Driver 2" />
          </LineChart>
        ) : (
          <Typography>Select a race to view lap time data</Typography>
        )}
      </Paper>
    </Container>
  );
};

export default RaceData;
