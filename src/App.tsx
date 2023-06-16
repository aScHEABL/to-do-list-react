import React from 'react';
import { MantineProvider, Text } from '@mantine/core';
import AppContainer from './components/AppContainer';

export default function App() {
  return (
    <MantineProvider theme={{ 
      colorScheme: 'dark',
      colors: {
        'blue-gray': ['#e9f3fd', '#cdd7e5', '#afbccf', '#90a2bb', '#7287a7', '#586e8d', '#44556f', '#303d50', '#1b2532', '#060c17'],
      }
       }} withGlobalStyles withNormalizeCSS>
      <AppContainer />
    </MantineProvider>
  );
}