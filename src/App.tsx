import React from 'react';
import { MantineProvider } from '@mantine/core';
import TaskPage from './pages/TaskPage';
import { HashRouter } from 'react-router-dom';
import { AppContextProvider } from './AppContext';

export default function App() {
  return (
    <MantineProvider theme={{ 
      colorScheme: 'dark',
      colors: {
        'blue-gray': ['#e9f3fd', '#cdd7e5', '#afbccf', '#90a2bb', '#7287a7', '#586e8d', '#44556f', '#303d50', '#1b2532', '#060c17'],
      }
       }} withGlobalStyles withNormalizeCSS>
        <AppContextProvider>
          <HashRouter>
            <TaskPage />
          </HashRouter>
        </AppContextProvider>
    </MantineProvider>
  );
}
