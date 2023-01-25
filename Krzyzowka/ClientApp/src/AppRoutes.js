import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Quiz } from "./components/Quiz";
import { Crossword } from './components/Crossword/Crossword';
import { Leaderboard } from "./components/Leaderboard";
import { Home } from "./components/Home";
import React, { Component } from 'react';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/quiz',
    element: <Quiz /> 
  },
  {
    path: '/crossword/:id',
    element: <Crossword />
  },
  {
    path: '/leaderboard',
    //requireAuth: true,
    element: <Leaderboard />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
