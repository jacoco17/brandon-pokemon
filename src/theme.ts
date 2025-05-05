import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: 'linear-gradient(135deg, #fffbe6 0%, #ffe066 40%, #fff6b7 100%)',
        color: 'gray.900',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontFamily: 'Poppins, sans-serif',
        position: 'relative',
        '::after': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          backgroundImage: 'url(/sparkle-overlay.png)',
          opacity: 0.12,
          zIndex: 0,
        },
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          bg: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(12px)',
          borderRadius: '2xl',
          boxShadow: '0 8px 32px 0 rgba(255, 215, 48, 0.25)',
          border: '2px solid #F8D030',
          transition: 'transform 0.2s',
          _hover: {
            transform: 'scale(1.03)',
            boxShadow: '0 12px 40px 0 rgba(255, 215, 48, 0.35)',
          },
        },
      },
    },
  },
  colors: {
    pokemon: {
      fire: '#F08030',
      water: '#6890F0',
      grass: '#78C850',
      electric: '#F8D030',
      psychic: '#F85888',
      ice: '#98D8D8',
      dragon: '#7038F8',
      dark: '#705848',
      fairy: '#EE99AC',
      normal: '#A8A878',
      fighting: '#C03028',
      flying: '#A890F0',
      poison: '#A040A0',
      ground: '#E0C068',
      rock: '#B8A038',
      bug: '#A8B820',
      ghost: '#705898',
      steel: '#B8B8D0',
    },
  },
}); 