import React, { useState, useEffect } from 'react';
import {
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Text,
  Badge,
  Flex,
  Box,
  Input,
  Button,
  IconButton,
  useToast,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
}

const PokemonList: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  const limit = 8;
  const maxPages = 75; // 600 / 8 = 75 pages
  const navigate = useNavigate();
  const toast = useToast();

  const fetchPokemon = async (page: number) => {
    try {
      const offset = (page - 1) * limit;
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const count = Math.min(response.data.count, maxPages * limit);
      setTotalPages(Math.min(Math.ceil(count / limit), maxPages));

      const pokemonData = await Promise.all(
        response.data.results.map(async (p: { url: string }) => {
          const pokemonResponse = await axios.get(p.url);
          return pokemonResponse.data;
        })
      );
      setPokemon(pokemonData);
      setAllPokemon(prev => [...prev, ...pokemonData]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon(currentPage);
  }, [currentPage]);

  const addToTeam = async (pokemon: Pokemon) => {
    try {
      // First check if the Pokemon is already in the team
      const teamResponse = await axios.get('http://localhost:3001/team');
      const teamData = teamResponse.data;
      
      // Check for duplicate Pokemon
      const isDuplicate = teamData.some((p: { pokemonId: number }) => p.pokemonId === pokemon.id);
      if (isDuplicate) {
        toast({
          title: 'Pokémon Already in Team',
          description: `${pokemon.name} is already in your team`,
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
          variant: 'solid',
          containerStyle: {
            background: 'rgba(255, 165, 0, 0.95)',
            color: 'white',
            borderRadius: 'lg',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        });
        return;
      }

      // Check if team is full
      if (teamData.length >= 6) {
        toast({
          title: 'Team is Full',
          description: 'You can only have 6 Pokémon in your team',
          status: 'warning',
          duration: 3000,
          isClosable: true,
          position: 'top',
          variant: 'solid',
          containerStyle: {
            background: 'rgba(255, 165, 0, 0.95)',
            color: 'white',
            borderRadius: 'lg',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        });
        return;
      }

      // Add Pokemon to team
      const response = await axios.post('http://localhost:3001/team', {
        pokemonId: pokemon.id,
        name: pokemon.name,
        timestamp: new Date().toISOString(),
      });

      if (response.status === 201) {
        toast({
          title: 'Pokémon Added!',
          description: `${pokemon.name} has been added to your team`,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          variant: 'solid',
          containerStyle: {
            background: 'rgba(76, 175, 80, 0.95)',
            color: 'white',
            borderRadius: 'lg',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        });
      }
    } catch (error: any) {
      console.error('Error adding Pokemon to team:', error);
      toast({
        title: 'Error',
        description: 'Failed to add Pokémon to team',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        variant: 'solid',
        containerStyle: {
          background: 'rgba(244, 67, 54, 0.95)',
          color: 'white',
          borderRadius: 'lg',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      });
    }
  };

  const filteredPokemon = allPokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      grass: '#78C850',
      poison: '#A040A0',
      fire: '#F08030',
      flying: '#A890F0',
      water: '#6890F0',
      bug: '#A8B820',
      normal: '#A8A878',
      electric: '#F8D030',
      ground: '#E0C068',
      fairy: '#EE99AC',
      fighting: '#C03028',
      psychic: '#F85888',
      rock: '#B8A038',
      steel: '#B8B8D0',
      ice: '#98D8D8',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
    };
    return colors[type] || 'gray.500';
  };

  const getContrastColor = (type: string) => {
    const darkTypes = ['grass', 'electric', 'fairy', 'ice'];
    return darkTypes.includes(type) ? 'black' : 'white';
  };

  return (
    <Box maxW="1200px" mx="auto" px={{ base: 2, md: 4 }}>
      <Flex mb={6} gap={4} direction={{ base: 'column', sm: 'row' }}>
        <Input
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          bg="white"
          color="black"
          _placeholder={{ color: 'gray.500' }}
          size={{ base: 'sm', md: 'md' }}
        />
      </Flex>
      <SimpleGrid 
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
        spacing={{ base: 4, md: 6 }}
        px={{ base: 2, md: 0 }}
      >
        {(searchTerm ? filteredPokemon : pokemon).map((p) => (
          <Box
            key={p.id}
            bgGradient={`linear(to-br, ${getTypeColor(p.types[0].type.name)}20 60%, ${getTypeColor(p.types[0].type.name)}40 100%)`}
            border="3px solid #FFA500"
            borderRadius="2xl"
            boxShadow="0 6px 24px 0 rgba(255, 165, 0, 0.25)"
            position="relative"
            overflow="hidden"
            minH={{ base: '300px', md: '350px' }}
            maxW={{ base: '100%', sm: '260px' }}
            mx="auto"
            _hover={{ boxShadow: '0 12px 32px 0 rgba(255, 165, 0, 0.35)', transform: 'scale(1.04)' }}
            transition="all 0.2s"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            p={0}
          >
            {/* Card Header */}
            <Flex
              justify="space-between"
              align="center"
              px={4}
              py={3}
              bg="#fffbe6"
              borderTopRadius="2xl"
              borderBottom="2px solid #FFA500"
              position="relative"
              zIndex={2}
            >
              <Text 
                fontWeight="bold" 
                fontSize={{ base: 'md', md: 'lg' }} 
                color="black" 
                textTransform="capitalize" 
                fontFamily="Poppins" 
                position="relative" 
                zIndex={1}
              >
                {p.name}
              </Text>
              <Flex align="center" gap={1} position="relative" zIndex={1}>
                <Image src="/lightning-bolt.svg" alt="type" boxSize={{ base: '18px', md: '22px' }} />
                <Text fontWeight="bold" color="black" fontSize={{ base: 'sm', md: 'md' }}>
                  HP {60 + p.id % 40}
                </Text>
              </Flex>
            </Flex>
            {/* Card Art with dynamic background */}
            <Box
              bgGradient={`linear(to-br, ${getTypeColor(p.types[0].type.name)}20 60%, ${getTypeColor(p.types[0].type.name)}40 100%)`}
              px={2}
              py={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
              position="relative"
              minH={{ base: '100px', md: '120px' }}
            >
              {/* Lightning effect for electric types */}
              {p.types.some(t => t.type.name === 'electric') && (
                <Image 
                  src="/lightning-effect.png" 
                  alt="lightning" 
                  position="absolute" 
                  top={2} 
                  left={2} 
                  h={{ base: '30px', md: '40px' }} 
                  opacity={0.18} 
                  zIndex={1} 
                />
              )}
              <Image
                src={p.sprites.other['official-artwork'].front_default}
                alt={p.name}
                h={{ base: '90px', md: '110px' }}
                objectFit="contain"
                mx="auto"
                filter="drop-shadow(0 2px 8px rgba(0,0,0,0.2))"
                zIndex={2}
              />
            </Box>
            {/* Types */}
            <Flex justify="center" gap={2} mt={1} mb={1}>
              {p.types.map((type) => (
                <Badge
                  key={type.type.name}
                  bg={getTypeColor(type.type.name)}
                  color="black"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontSize={{ base: '2xs', md: 'xs' }}
                  fontWeight="bold"
                  boxShadow="md"
                  textTransform="uppercase"
                >
                  {type.type.name}
                </Badge>
              ))}
            </Flex>
            {/* Attacks Section */}
            <Box px={4} py={2}>
              <Flex align="center" justify="space-between" mb={1}>
                <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }} color="black">Nuzzle</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="black">⚪</Text>
              </Flex>
              <Text fontSize={{ base: '2xs', md: 'xs' }} color="black" mb={2}>
                Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed.
              </Text>
              <Flex align="center" justify="space-between" mb={1}>
                <Text fontWeight="bold" fontSize={{ base: 'xs', md: 'sm' }} color="black">Quick Attack</Text>
                <Text fontSize={{ base: 'xs', md: 'sm' }} color="black">⚪⚪</Text>
                <Text fontWeight="bold" color="black">20+</Text>
              </Flex>
              <Text fontSize={{ base: '2xs', md: 'xs' }} color="black">
                Flip a coin. If heads, this attack does 10 more damage.
              </Text>
            </Box>
            {/* Card Footer */}
            <Flex 
              justify="space-between" 
              align="center" 
              px={4} 
              py={2} 
              bg="#fffbe6" 
              borderBottomRadius="2xl" 
              borderTop="2px solid #FFA500" 
              position="relative" 
              zIndex={2}
            >
              <Flex gap={2} align="center" wrap="wrap">
                <Text fontSize={{ base: '3xs', md: '2xs' }} color="black">Weakness: <b style={{ color: '#D32F2F' }}>×2</b></Text>
                <Text fontSize={{ base: '3xs', md: '2xs' }} color="black">Resistance: <b style={{ color: '#1976D2' }}>-20</b></Text>
                <Text fontSize={{ base: '3xs', md: '2xs' }} color="black">Retreat: <b>⚪</b></Text>
              </Flex>
              <Button
                size={{ base: 'xs', md: 'sm' }}
                colorScheme="yellow"
                borderRadius="full"
                fontWeight="bold"
                px={3}
                onClick={() => navigate(`/pokemon/${p.id}`)}
                position="relative"
                zIndex={2}
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              >
                Details
              </Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>
      {!searchTerm && (
        <Flex 
          justify="center" 
          mt={8} 
          gap={4}
          direction={{ base: 'column', sm: 'row' }}
          align="center"
        >
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={currentPage === 1}
            colorScheme="blackAlpha"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: '100%', sm: 'auto' }}
          >
            Previous
          </Button>
          <Text color="black" alignSelf="center" fontWeight="bold" fontSize={{ base: 'sm', md: 'md' }}>
            Page {currentPage} of {totalPages}
          </Text>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={currentPage === totalPages}
            colorScheme="blackAlpha"
            size={{ base: 'sm', md: 'md' }}
            w={{ base: '100%', sm: 'auto' }}
          >
            Next
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default PokemonList; 