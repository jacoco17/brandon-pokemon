import { Box, Typography, Chip, useTheme } from '@mui/material';

// Type color mapping for premium accent
const TYPE_COLORS = {
  electric: '#FFDE00',
  fire: '#FF9900',
  water: '#3399FF',
  grass: '#78C850',
  psychic: '#FF66CC',
  normal: '#A8A77A',
  fighting: '#C22E28',
  flying: '#A98FF3',
  ground: '#E2BF65',
  rock: '#B6A136',
  bug: '#A6B91A',
  ghost: '#735797',
  steel: '#B7B7CE',
  ice: '#96D9D6',
  dragon: '#6F35FC',
  dark: '#705746',
  fairy: '#D685AD',
  poison: '#A33EA1',
};

const foilBg = `linear-gradient(135deg, #fffbe6 0%, #f7e7ff 40%, #e0f7fa 100%)`;

export default function PokemonCard({
  name,
  hp,
  type,
  image,
  stats = [],
  children,
  sx = {},
}) {
  const theme = useTheme();
  const typeColor = TYPE_COLORS[type] || theme.palette.primary.main;

  return (
    <Box
      sx={{
        width: 320,
        minHeight: 440,
        borderRadius: 4,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)',
        background: foilBg,
        border: `3px solid ${typeColor}`,
        p: 2,
        m: 'auto',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Chip
          label={type?.toUpperCase() || 'POKEMON'}
          sx={{
            bgcolor: typeColor,
            color: '#222',
            fontWeight: 'bold',
            fontSize: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#333' }}>
          HP <span style={{ color: typeColor }}>{hp}</span>
        </Typography>
      </Box>
      {/* Image */}
      <Box
        sx={{
          width: '100%',
          height: 180,
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 2px 12px 0 rgba(0,0,0,0.10)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
        }}
      >
        <img
          src={image}
          alt={name}
          style={{ maxHeight: 160, maxWidth: '90%', objectFit: 'contain', filter: 'drop-shadow(0 2px 8px #0002)' }}
        />
      </Box>
      {/* Name */}
      <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 1, color: '#222', mb: 1, textAlign: 'center', textShadow: '0 2px 8px #fff8' }}>
        {name}
      </Typography>
      {/* Stats */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 2 }}>
        {stats.map((stat) => (
          <Chip
            key={stat.name}
            label={`${stat.name.toUpperCase()}: ${stat.value}`}
            sx={{
              bgcolor: '#fff',
              color: typeColor,
              fontWeight: 700,
              border: `1.5px solid ${typeColor}`,
              fontSize: 13,
              boxShadow: '0 1px 4px #0001',
            }}
          />
        ))}
      </Box>
      {/* Actions (e.g. Add to Team) */}
      <Box sx={{ mt: 'auto', textAlign: 'center' }}>{children}</Box>
      {/* Foil shine overlay */}
      <Box
        sx={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(120deg, #fff8 10%, #fff2 40%, #fff0 80%)',
          opacity: 0.5,
          zIndex: 1,
        }}
      />
    </Box>
  );
} 