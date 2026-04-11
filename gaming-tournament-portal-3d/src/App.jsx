import './App.css'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion'
/* eslint-enable no-unused-vars */
import { 
  Home, 
  Trophy, 
  LayoutDashboard, 
  Users, 
  User as UserIcon, 
  Tv, 
  ChevronRight, 
  ChevronLeft,
  Bell,
  Settings,
  LogOut
} from 'lucide-react'
import { NotificationProvider } from './components/NotificationSystem'
import { useNotifications } from './context/NotificationContext'
import LiveActivityFeed from './components/LiveActivityFeed'

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()
  const { addNotification } = useNotifications()

  // Welcome notification
  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification({
        title: 'Welcome Back, Champion!',
        message: 'You have 3 tournament invites pending.',
        type: 'info'
      })
    }, 2000)
    return () => clearTimeout(timer)
  }, [addNotification])

  const navItems = [
    { to: '/', label: 'Home', icon: <Home size={20} /> },
    { to: '/tournaments', label: 'Tournaments', icon: <Trophy size={20} /> },
    { to: '/leaderboard', label: 'Leaderboard', icon: <LayoutDashboard size={20} /> },
    { to: '/teams', label: 'Teams', icon: <Users size={20} /> },
    { to: '/profile', label: 'Profile', icon: <UserIcon size={20} /> },
    { to: '/organizer', label: 'Staff Hub', icon: <Settings size={20} /> },
    { to: '/spectator', label: 'Spectator', icon: <Tv size={20} /> },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] selection:bg-neon-green selection:text-black transition-all duration-500">
      <div className="scanline" />
      
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-[60] h-20 px-6 flex items-center justify-between border-b border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-display gradient-text tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            Ranbhumi
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {navItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                    isActive ? 'text-neon-green bg-white/5 shadow-[0_0_15px_rgba(57,255,20,0.1)]' : 'text-white/50 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <span className="group-hover:scale-110 transition-transform">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
            <div className="text-xs font-display flex items-center gap-2">
              <span className="text-white/40">LVL</span>
              <span className="text-neon-blue">42</span>
            </div>
            <div className="w-32 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '68%' }}
                className="h-full bg-gradient-to-r from-neon-blue to-neon-purple"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 transition-all text-white/70 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
              <Bell size={18} />
            </button>
            <div className="w-10 h-10 rounded-xl border border-neon-green/30 p-0.5 bg-gradient-to-br from-neon-green/20 to-neon-blue/20">
              <div className="w-full h-full rounded-[9px] bg-black overflow-hidden hover:scale-105 transition-transform cursor-pointer">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow" alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex flex-1 pt-20">
        {/* Persistent Dynamic Sidebar */}
        <motion.aside
          initial={false}
          animate={{ width: sidebarOpen ? 280 : 80 }}
          className="fixed left-0 top-20 bottom-0 z-50 border-r border-white/5 bg-black/20 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-300 group"
        >
          <div className="flex-1 px-4 py-8 space-y-6 overflow-y-auto custom-scrollbar">
            <div className="space-y-1">
              <p className={`px-2 mb-4 text-[10px] font-display text-white/30 tracking-widest uppercase transition-opacity ${sidebarOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                Navigation
              </p>
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 group/nav ${
                      isActive 
                        ? 'bg-gradient-to-r from-neon-purple/20 to-transparent text-white border-l-2 border-neon-purple' 
                        : 'text-white/40 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <div className="shrink-0">{item.icon}</div>
                  <span className={`text-sm font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${sidebarOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                    {item.label}
                  </span>
                </NavLink>
              ))}
            </div>

            {sidebarOpen && (
              <div className="pt-6 border-t border-white/5 h-[300px]">
                <LiveActivityFeed />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 space-y-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-full flex items-center justify-center p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            {sidebarOpen && (
              <button className="w-full flex items-center gap-4 px-3 py-2 text-cyber-pink hover:bg-cyber-pink/10 rounded-xl transition-all group/out">
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Disconnect</span>
              </button>
            )}
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main 
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: sidebarOpen ? 280 : 80 }}
        >
          <div className="p-8 max-w-[1600px] mx-auto min-h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>

            {/* Background Decorative Elements */}
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full -z-10 pointer-events-none" />
            <div className="fixed top-0 left-[20%] w-[400px] h-[400px] bg-neon-green/5 blur-[100px] rounded-full -z-10 pointer-events-none" />
          </div>
        </main>
      </div>
      
      <footer className="w-full py-12 px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 bg-black/40 backdrop-blur-md relative z-50">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-xl font-display text-white/80 tracking-tighter">Ranbhumi</div>
          <p className="text-sm text-white/30 font-mono italic">The Future of Competitive Combat</p>
        </div>
        
        <div className="flex items-center gap-8 text-white/40 text-sm">
          <a href="#" className="hover:text-neon-green transition-colors">Privacy</a>
          <a href="#" className="hover:text-neon-green transition-colors">Terms</a>
          <a href="#" className="hover:text-neon-green transition-colors">Support</a>
          <a href="#" className="hover:text-neon-green transition-colors">API</a>
        </div>
        
        <div className="text-white/20 text-xs font-mono">
          © {new Date().getFullYear()} Ranbhumi Core. Protocol 4.2.0-Alpha
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  )
}

export default App
