import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Button,
  Alert,
} from '@mui/material';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const getType = (types) => types?.[0]?.type?.name || '';
const getStat = (stats, statName) => {
  const stat = stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : '';
};

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addMsg, setAddMsg] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon details:', error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const handleAddToTeam = async () => {
    if (!pokemon) return;
    try {
      // Check team size
      const teamRes = await axios.get('http://localhost:3000/team');
      if (teamRes.data.length >= 6) {
        setAddMsg('Your team is full! Remove a Pokémon before adding a new one.');
        return;
      }
      // Prevent duplicates
      if (teamRes.data.some((p) => p.id === pokemon.id)) {
        setAddMsg('This Pokémon is already in your team!');
        return;
      }
      await axios.post('http://localhost:3000/team', {
        id: pokemon.id,
        name: pokemon.name,
        level: 1,
      });
      setAddMsg('Added to your team!');
    } catch {
      setAddMsg('Failed to add to team.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!pokemon) {
    return (
      <Container>
        <Alert severity="error">Pokemon not found</Alert>
      </Container>
    );
  }

  const stats = pokemon.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));
  const type = getType(pokemon.types);
  const hp = getStat(pokemon.stats, 'hp');

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <PokemonCard
          name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          hp={hp}
          type={type}
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          stats={stats}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ fontWeight: 700, mt: 1 }}
            onClick={handleAddToTeam}
          >
            Add to Team
          </Button>
          {addMsg && <Alert severity="info" sx={{ mt: 2 }}>{addMsg}</Alert>}
        </PokemonCard>
      </Box>
    </Container>
  );
};

export default PokemonDetail; 