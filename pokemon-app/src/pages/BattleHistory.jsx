import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const BattleHistory = () => {
  const [battles, setBattles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBattles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/battles');
        setBattles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching battle history:', error);
        setLoading(false);
      }
    };

    fetchBattles();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Battle History
      </Typography>

      {battles.length === 0 ? (
        <Typography variant="h6" color="text.secondary" align="center">
          No battles recorded yet. Start battling to see your history!
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Pokemon 1</TableCell>
                <TableCell>Pokemon 2</TableCell>
                <TableCell>Winner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {battles.map((battle) => (
                <TableRow key={battle.id}>
                  <TableCell>
                    {new Date(battle.timestamp).toLocaleDateString()} {new Date(battle.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>{battle.pokemon1.charAt(0).toUpperCase() + battle.pokemon1.slice(1)}</TableCell>
                  <TableCell>{battle.pokemon2.charAt(0).toUpperCase() + battle.pokemon2.slice(1)}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {battle.winner.charAt(0).toUpperCase() + battle.winner.slice(1)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BattleHistory; 