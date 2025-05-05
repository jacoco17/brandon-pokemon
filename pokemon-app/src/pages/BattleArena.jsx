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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const BattleArena = () => {
  const [team, setTeam] = useState([]);
  const [selectedPokemon1, setSelectedPokemon1] = useState('');
  const [selectedPokemon2, setSelectedPokemon2] = useState('');
  const [battleResult, setBattleResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  const calculateBattleResult = (pokemon1, pokemon2) => {
    // Get the stats for comparison
    const stats1 = {
      hp: pokemon1.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: pokemon1.stats.find(stat => stat.stat.name === 'attack').base_stat,
      speed: pokemon1.stats.find(stat => stat.stat.name === 'speed').base_stat,
    };

    const stats2 = {
      hp: pokemon2.stats.find(stat => stat.stat.name === 'hp').base_stat,
      attack: pokemon2.stats.find(stat => stat.stat.name === 'attack').base_stat,
      speed: pokemon2.stats.find(stat => stat.stat.name === 'speed').base_stat,
    };

    // Compare stats
    let pokemon1Wins = 0;
    let pokemon2Wins = 0;

    if (stats1.hp > stats2.hp) pokemon1Wins++;
    else if (stats2.hp > stats1.hp) pokemon2Wins++;

    if (stats1.attack > stats2.attack) pokemon1Wins++;
    else if (stats2.attack > stats1.attack) pokemon2Wins++;

    if (stats1.speed > stats2.speed) pokemon1Wins++;
    else if (stats2.speed > stats1.speed) pokemon2Wins++;

    return pokemon1Wins > pokemon2Wins ? pokemon1 : pokemon2;
  };

  const handleBattle = async () => {
    if (!selectedPokemon1 || !selectedPokemon2) {
      setBattleResult({ error: 'Please select two Pokemon to battle!' });
      return;
    }

    try {
      const [pokemon1, pokemon2] = await Promise.all([
        axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon1}`),
        axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon2}`),
      ]);

      const winner = calculateBattleResult(pokemon1.data, pokemon2.data);

      // Save battle result to json-server
      await axios.post('http://localhost:3000/battles', {
        pokemon1: pokemon1.data.name,
        pokemon2: pokemon2.data.name,
        winner: winner.name,
        timestamp: new Date().toISOString(),
      });

      setBattleResult({
        pokemon1: pokemon1.data,
        pokemon2: pokemon2.data,
        winner,
      });
    } catch (error) {
      console.error('Error during battle:', error);
      setBattleResult({ error: 'An error occurred during the battle!' });
    }
  };

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
        Battle Arena
      </Typography>

      {team.length < 2 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You need at least 2 Pokemon in your team to battle!
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select First Pokemon</InputLabel>
            <Select
              value={selectedPokemon1}
              onChange={(e) => setSelectedPokemon1(e.target.value)}
              label="Select First Pokemon"
            >
              {team.map((pokemon) => (
                <MenuItem key={pokemon.id} value={pokemon.id}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Select Second Pokemon</InputLabel>
            <Select
              value={selectedPokemon2}
              onChange={(e) => setSelectedPokemon2(e.target.value)}
              label="Select Second Pokemon"
            >
              {team.map((pokemon) => (
                <MenuItem key={pokemon.id} value={pokemon.id}>
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleBattle}
              disabled={!selectedPokemon1 || !selectedPokemon2}
            >
              Start Battle
            </Button>
          </Box>
        </Grid>

        {battleResult && (
          <Grid item xs={12}>
            {battleResult.error ? (
              <Alert severity="error">{battleResult.error}</Alert>
            ) : (
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom align="center">
                    Battle Result
                  </Typography>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${battleResult.pokemon1.id}.png`}
                          alt={battleResult.pokemon1.name}
                          sx={{ objectFit: 'contain', p: 2 }}
                        />
                        <CardContent>
                          <Typography variant="h6" align="center">
                            {battleResult.pokemon1.name.charAt(0).toUpperCase() + battleResult.pokemon1.name.slice(1)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100%">
                        <Typography variant="h3" color="primary">
                          VS
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Winner: {battleResult.winner.name.charAt(0).toUpperCase() + battleResult.winner.name.slice(1)}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Card>
                        <CardMedia
                          component="img"
                          height="200"
                          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${battleResult.pokemon2.id}.png`}
                          alt={battleResult.pokemon2.name}
                          sx={{ objectFit: 'contain', p: 2 }}
                        />
                        <CardContent>
                          <Typography variant="h6" align="center">
                            {battleResult.pokemon2.name.charAt(0).toUpperCase() + battleResult.pokemon2.name.slice(1)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default BattleArena; 