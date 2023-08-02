import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from './ColorModeContext';
export const ColorThemeProvider = (props) => {
    const [mode, setMode] = useState('dark');
    // 自動啟用暗模式：
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    // 自動啟用暗模式：
                    // mode: prefersDarkMode ? 'dark' : 'light',
                    //
                    primary: {
                        main: '#fbc02d',
                    },
                    secondary: {
                        main: '#5785fb',
                    },
                    warning: {
                        main: '#f57f17',
                    },
                    success: {
                        main: '#00e676',
                    },
                },
            }),
        [mode]
        // 自動啟用暗模式：
        // [prefersDarkMode]
    );
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};
