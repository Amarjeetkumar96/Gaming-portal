import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home3D from './pages/Home3D.jsx'
import Tournaments3D from './pages/Tournaments3D.jsx'
import Leaderboard3DPage from './pages/Leaderboard3DPage.jsx'
import Teams3D from './pages/Teams3D.jsx'
import Profile3D from './pages/Profile3D.jsx'
import OrganizerDashboard3D from './pages/OrganizerDashboard3D.jsx'
import SpectatorArena from './pages/SpectatorArena.jsx'
import Login3D from './pages/Login3D.jsx'
import Signup3D from './pages/Signup3D.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home3D /> },
      { path: 'tournaments', element: <Tournaments3D /> },
      { path: 'leaderboard', element: <Leaderboard3DPage /> },
      { path: 'teams', element: <Teams3D /> },
      { path: 'profile', element: <Profile3D /> },
      { path: 'organizer', element: <OrganizerDashboard3D /> },
      { path: 'spectator', element: <SpectatorArena /> },
    ],
  },
  {
    path: '/login',
    element: <Login3D />,
  },
  {
    path: '/signup',
    element: <Signup3D />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
