import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// src
const Home = lazy(() => import('../Pages/Home'));

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default AppRouter;
