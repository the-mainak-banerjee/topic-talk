import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import theme from './theme';
import './theme/style.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProider } from './contexts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <AuthContextProider>
          <App />
        </AuthContextProider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

