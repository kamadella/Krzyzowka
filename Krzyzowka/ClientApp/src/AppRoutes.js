import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Quiz } from "./components/Quiz";
import { Crossword } from './components/Crossword/Crossword';
import { Leaderboard } from "./components/Leaderboard";
import { Home } from "./components/Home";
import { CrosswordList } from './components/CrosswordList';

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
    path: '/crosswordList',
    element: <CrosswordList />
    },
    {
     path: '/crossword',
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
