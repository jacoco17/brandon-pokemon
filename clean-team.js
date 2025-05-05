import fs from 'fs';

const dbPath = './db.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
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

db.team = uniqueTeam;
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

console.log('Team cleaned! Remaining team:', uniqueTeam); 