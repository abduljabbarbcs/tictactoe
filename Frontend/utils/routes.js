import React from 'react';
import Home from 'Components/Home';
import Board from 'Components/Board';
export const routes = [
  { path: '/', component: <Home />, exact: true },
  { path: '/start-game/:id', component: <Board /> }
]