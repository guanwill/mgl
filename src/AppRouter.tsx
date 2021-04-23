import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
};

export default AppRouter;
