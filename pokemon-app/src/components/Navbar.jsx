import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <SportsKabaddiIcon sx={{ mr: 1 }} />
          PokeDex
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/pokemon"
            startIcon={<SportsKabaddiIcon />}
          >
            Pokemon
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/team"
            startIcon={<GroupIcon />}
          >
            My Team
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/battle"
            startIcon={<SportsKabaddiIcon />}
          >
            Battle
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/history"
            startIcon={<HistoryIcon />}
          >
            History
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 