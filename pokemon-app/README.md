# Pokemon App

A modern Pokemon application built with React, Vite, and Material-UI that allows users to browse Pokemon, build teams, and simulate battles.

## Features

- Browse and search Pokemon with pagination
- View detailed Pokemon information (stats, types, abilities)
- Build and manage your Pokemon team (up to 6 Pokemon)
- Simulate battles between Pokemon
- Track battle history
- Modern and responsive UI

## Technologies Used

- React
- Vite
- Material-UI
- React Router
- Axios
- JSON Server

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pokemon-app
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

1. Start the JSON Server (in a separate terminal):
```bash
npm run server
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `db.json` - JSON Server database
- `public/` - Static assets

## API Usage

The application uses the following APIs:
- [PokeAPI](https://pokeapi.co/) - For Pokemon data
- JSON Server - For local data storage (team and battle history)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
