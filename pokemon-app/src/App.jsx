import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PokemonList from './pages/PokemonList';
import PokemonDetail from './pages/PokemonDetail';
import TeamBuilder from './pages/TeamBuilder';
import BattleArena from './pages/BattleArena';
import BattleHistory from './pages/BattleHistory';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff0000',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="/team" element={<TeamBuilder />} />
          <Route path="/battle" element={<BattleArena />} />
          <Route path="/history" element={<BattleHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
