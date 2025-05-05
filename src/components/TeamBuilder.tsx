import React, { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Text,
  Badge,
  Flex,
  Button,
  useToast,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

interface TeamPokemon {
  id: number;  // This is the Pokemon's ID from PokeAPI
  teamId: number;  // This will store the unique team entry ID
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
}

const TeamBuilder: React.FC = () => {
  const [team, setTeam] = useState<TeamPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await axios.get('http://localhost:3001/team');
      const teamData = await Promise.all(
        response.data.map(async (pokemon: { pokemonId: number, id: number }) => {
          const pokemonResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${pokemon.pokemonId}`
          );
          return {
            ...pokemonResponse.data,
            teamId: pokemon.id
          };
        })
      );
      // Remove duplicates based on pokemonId
      const uniqueTeam = teamData.filter((p, idx, arr) =>
        p && arr.findIndex(x => x && x.id === p.id) === idx
      );
      setTeam(uniqueTeam.filter(Boolean));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching team:', error);
      setLoading(false);
    }
  };

  const removeFromTeam = async (teamId: number) => {
    try {
      await axios.delete(`http://localhost:3001/team/${teamId}`);
      setTeam(team.filter((p) => p.teamId !== teamId));
      toast({
        title: 'Pokémon Removed',
        description: 'The Pokémon has been removed from your team',
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
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove Pokémon from team',
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

  if (loading) {
    return <Text>Loading team...</Text>;
  }

  return (
    <Box maxW="1200px" mx="auto" px={{ base: 2, md: 4 }}>
      <Heading 
        mb={6} 
        textAlign="center" 
        color="black" 
        fontFamily="Poppins" 
        fontWeight="extrabold"
        fontSize={{ base: '2xl', md: '3xl' }}
      >
        My Pokemon Team
      </Heading>
      {team.length === 0 ? (
        <Text 
          textAlign="center" 
          fontSize={{ base: 'lg', md: 'xl' }} 
          color="black" 
          fontFamily="Poppins"
        >
          You have no Pokemon on your team. Add Pokémon from the Pokemon list!
        </Text>
      ) : (
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 3 }} 
          spacing={{ base: 4, md: 6 }}
          px={{ base: 2, md: 0 }}
        >
          {team.map((pokemon) => (
            <Card
              key={pokemon.teamId}
              bgGradient={`linear(to-br, ${getTypeColor(pokemon.types[0].type.name)}20 60%, ${getTypeColor(pokemon.types[0].type.name)}40 100%)`}
              border="3px solid #FFA500"
              borderRadius="2xl"
              boxShadow="0 6px 24px 0 rgba(255, 165, 0, 0.25)"
              position="relative"
              overflow="hidden"
              _hover={{ boxShadow: '0 12px 32px 0 rgba(255, 165, 0, 0.35)', transform: 'scale(1.04)' }}
              transition="all 0.2s"
            >
              <CardBody>
                <Box
                  position="relative"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  minH={{ base: '180px', md: '200px' }}
                  bgGradient={`linear(to-br, ${getTypeColor(pokemon.types[0].type.name)}10 60%, ${getTypeColor(pokemon.types[0].type.name)}30 100%)`}
                  borderRadius="xl"
                  mb={4}
                >
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    h={{ base: '160px', md: '180px' }}
                    objectFit="contain"
                    filter="drop-shadow(0 2px 8px rgba(0,0,0,0.2))"
                  />
                </Box>
                <Text
                  fontSize={{ base: 'lg', md: 'xl' }}
                  fontWeight="bold"
                  textTransform="capitalize"
                  textAlign="center"
                  color="black"
                  fontFamily="Poppins"
                  mb={2}
                >
                  {pokemon.name}
                </Text>
                <Flex justify="center" gap={2} mb={4}>
                  {pokemon.types.map((type) => (
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
                <Button
                  colorScheme="red"
                  size={{ base: 'sm', md: 'md' }}
                  w="full"
                  onClick={() => removeFromTeam(pokemon.teamId)}
                  borderRadius="full"
                  fontWeight="bold"
                  _hover={{ transform: 'scale(1.05)' }}
                  transition="all 0.2s"
                >
                  Remove from Team
                </Button>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default TeamBuilder; 