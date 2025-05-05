import jsonServer from 'json-server';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Custom middleware to check for duplicates
const checkDuplicate = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/team') {
    const db = router.db.getState();
    const team = db.team || [];
    const newPokemon = req.body;
    
    // Check if team is full
    if (team.length >= 6) {
      return res.status(400).json({
        error: 'Team is full. You can only have 6 Pokémon in your team.'
      });
    }

    // Check for duplicate Pokemon
    const isDuplicate = team.some(p => p.pokemonId === newPokemon.pokemonId);
    if (isDuplicate) {
      return res.status(400).json({
        error: 'This Pokémon is already in your team.'
      });
    }
  }
  next();
};

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(checkDuplicate);
server.use(router);

// Endpoint to clean the team: remove duplicates and limit to 6 unique Pokémon
server.get('/clean-team', (req, res) => {
  const db = router.db.getState();
  let team = db.team || [];
  // Remove duplicates by pokemonId and keep only the first occurrence, limit to 6
  const uniqueTeam = [];
  const seen = new Set();
  for (const p of team) {
    if (!seen.has(p.pokemonId)) {
      uniqueTeam.push(p);
      seen.add(p.pokemonId);
    }
    if (uniqueTeam.length === 6) break;
  }
  // Update db.json
  router.db.set('team', uniqueTeam).write();
  res.json({ cleaned: true, team: uniqueTeam });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
}); 