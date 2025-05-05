import { Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Welcome to PokeDex
      </Typography>
      <Typography variant="h5" component="h2" gutterBottom align="center" color="text.secondary">
        Your Ultimate Pokemon Companion
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt="Pokemon"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Browse Pokemon
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explore the vast world of Pokemon. View their stats, abilities, and more!
              </Typography>
              <Button
                component={RouterLink}
                to="/pokemon"
                startIcon={<SportsKabaddiIcon />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Explore Pokemon
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
              alt="Team"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Build Your Team
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Create your dream team of up to 6 Pokemon and prepare for battle!
              </Typography>
              <Button
                component={RouterLink}
                to="/team"
                startIcon={<GroupIcon />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Manage Team
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png"
              alt="Battle"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Battle Arena
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Challenge other trainers and test your Pokemon's strength in epic battles!
              </Typography>
              <Button
                component={RouterLink}
                to="/battle"
                startIcon={<HistoryIcon />}
                sx={{ mt: 2 }}
                fullWidth
              >
                Enter Arena
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home; 