import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import 'leaflet/dist/leaflet.css';
// theme
import { ColorThemeProvider } from './context/ColorThemeProvider';
import Paper from '@mui/material/Paper';
import RootLayout from './pages/Root';
import Error from './pages/Error';
import GameMap from './pages/GameMap';
import MarkersPage from './pages/MarkersPage';
import AuthenticationPage, { action as authAction } from './pages/Authentication';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader } from './util/auth';

const router = createBrowserRouter([
    {
        path: '/',
        id: 'root',
        loader: tokenLoader,
        element: <RootLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <GameMap />,
            },
            { path: 'markers', element: <MarkersPage /> },
            {
                path: '/auth',
                element: <AuthenticationPage />,
                action: authAction,
            },
            {
                path: '/logout',
                action: logoutAction,
            },
        ],
    },
]);
function App() {
    return (
        <ColorThemeProvider>
            <RouterProvider router={router} />
        </ColorThemeProvider>
        // -------------------
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
    );
}

export default App;
