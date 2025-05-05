import { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  TextField,
  Pagination,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000');
        setPokemonList(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
        setLoading(false);
      }
    };
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPokemon = filteredPokemon.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
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
      <TextField
        fullWidth
        label="Search Pokemon"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 4 }}
      />
      <Grid container spacing={3}>
        {paginatedPokemon.map((pokemon) => {
          const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={pokemon.name} display="flex" justifyContent="center">
              <PokemonCard
                name={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                hp={''}
                type={''}
                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`}
                stats={[]}
                sx={{ width: '100%', maxWidth: 340 }}
              >
                <Button
                  component={RouterLink}
                  to={`/pokemon/${pokemonId}`}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 1, fontWeight: 700 }}
                  fullWidth
                >
                  View Details
                </Button>
              </PokemonCard>
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredPokemon.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </Box>
    </Container>
  );
};

export default PokemonList; 