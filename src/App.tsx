import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import GlobalStyles from './styles/global';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <GlobalStyles />    
  </>
);

export default App;
