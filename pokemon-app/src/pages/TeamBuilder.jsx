import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const TeamBuilder = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch team from json-server
    const fetchTeam = async () => {
      try {
        const response = await axios.get('http://localhost:3000/team');
        setTeam(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching team:', error);
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  const removeFromTeam = async (pokemonId) => {
    try {
      await axios.delete(`http://localhost:3000/team/${pokemonId}`);
      setTeam(team.filter(pokemon => pokemon.id !== pokemonId));
    } catch (error) {
      console.error('Error removing Pokemon from team:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        My Pokemon Team
      </Typography>

      {team.length === 0 && !loading && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Your team is empty. Add Pokemon to your team from the Pokemon list!
        </Alert>
      )}

      <Grid container spacing={4}>
        {team.map((pokemon) => (
          <Grid item xs={12} sm={6} md={4} key={pokemon.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                alt={pokemon.name}
                sx={{ objectFit: 'contain', p: 2 }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h5" component="div">
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                  </Typography>
                  <IconButton
                    color="error"
                    onClick={() => removeFromTeam(pokemon.id)}
                    aria-label="remove from team"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Level: {pokemon.level || 1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {team.length >= 6 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          Your team is full! Remove a Pokemon to add new ones.
        </Alert>
      )}
    </Container>
  );
};

export default TeamBuilder; 