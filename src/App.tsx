import React from 'react';
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements } from 'react-router-dom';
import Navbar from './components/Navbar';
import PokemonList from './components/PokemonList';
import PokemonDetail from './components/PokemonDetail';
import TeamBuilder from './components/TeamBuilder';
import BattleArena from './components/BattleArena';
import BattleHistory from './components/BattleHistory';
import { Box } from '@chakra-ui/react';

const App: React.FC = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Box minH="100vh">
        <Navbar />
        <Box p={4}>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/team" element={<TeamBuilder />} />
            <Route path="/battle" element={<BattleArena />} />
            <Route path="/history" element={<BattleHistory />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App; 