import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GameMap from './components/GameMap';
function App() {
    return (
        // <div className="App">
        //     <header className="App-header">
        //         <img src={logo} className="App-logo" alt="logo" />
        //         <p>
        //             Edit <code>src/App.js</code> and save to reload.
        //         </p>
        //         <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        //             Learn React
        //         </a>
        //     </header>
        //     <Button className={'text-red-700'} variant="contained">
        //         Hello World
        //     </Button>
        //     <h1 className="text-3xl font-bold underline p-5 bg-red-700">Hello world!</h1>
        // </div>
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                        m: 1,
                        width: 700,
                        height: 700,
                    },
                }}
            >
                <GameMap />
            </Box>
        </>
    );
}

export default App;
