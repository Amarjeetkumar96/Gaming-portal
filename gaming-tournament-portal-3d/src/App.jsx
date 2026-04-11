import './App.css'
import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-dvh flex flex-col particle-bg">
      <nav className="sticky top-4 z-50 mx-auto w-[94%] md:w-[86%] glass rounded-2xl px-4 md:px-6 py-4 flex items-center justify-between neon-border floating slide-in-up">
        <div className="text-2xl md:text-3xl font-display tracking-widest gradient-text hover-glow transition-all duration-300">Ranbhumi</div>
        <button 
          aria-label="Menu" 
          className="md:hidden px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 pulse-glow hover-lift" 
          onClick={()=>setOpen(v=>!v)}
        >
          <span className="text-xl cyber-text">☰</span>
        </button>
        <div className="hidden md:flex gap-1 md:gap-2">
          {[
            ['/', 'Home'],
            ['/tournaments','Tournaments'],
            ['/leaderboard','Leaderboard'],
            ['/teams','Teams'],
            ['/profile','Profile'],
            ['/organizer','Organizer'],
            ['/spectator','Spectator'],
          ].map(([to,label], index)=> (
            <NavLink 
              key={to} 
              to={to} 
              end={to === '/'}
              className={({isActive})=>
                `px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover-lift stagger-${index + 1} ${
                  isActive 
                    ? 'text-[color:var(--color-neon-green)] bg-white/10 pulse-glow glow-effect' 
                    : 'text-white/90 hover:bg-white/10 hover:text-white hover-glow'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-2 ml-4 pl-4 border-l border-white/20">
            <NavLink 
              to="/login"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-white/90 hover:bg-white/10 hover:text-white hover-lift"
            >
              Login
            </NavLink>
            <NavLink 
              to="/signup"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold hover-lift shimmer"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      </nav>
      
      {open && (
        <div className="md:hidden mx-auto w-[94%] glass rounded-2xl px-4 py-4 mt-2 flex flex-wrap gap-2 fade-in slide-in-up">
          {[
            ['/', 'Home'],
            ['/tournaments','Tournaments'],
            ['/leaderboard','Leaderboard'],
            ['/teams','Teams'],
            ['/profile','Profile'],
            ['/organizer','Organizer'],
            ['/spectator','Spectator'],
          ].map(([to,label], index)=> (
            <NavLink 
              key={to} 
              to={to} 
              onClick={()=>setOpen(false)} 
              className={({isActive})=>
                `px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover-lift stagger-${index + 1} ${
                  isActive 
                    ? 'text-[color:var(--color-neon-green)] bg-white/10 glow-effect' 
                    : 'text-white/90 hover:bg-white/10 hover-glow'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="flex gap-2 w-full mt-2 pt-2 border-t border-white/20">
            <NavLink 
              to="/login"
              onClick={()=>setOpen(false)}
              className="flex-1 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-white/90 hover:bg-white/10 text-center"
            >
              Login
            </NavLink>
            <NavLink 
              to="/signup"
              onClick={()=>setOpen(false)}
              className="flex-1 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold text-center"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
      
      <main className="flex-1 w-[94%] md:w-[86%] mx-auto pt-6 md:pt-8 pb-10 fade-in slide-in-up">
        <Outlet />
      </main>
      
      <footer className="w-full py-8 text-center text-white/60 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="relative z-10">
          © {new Date().getFullYear()} Ranbhumi - Gaming Tournament Portal
        </div>
      </footer>
    </div>
  )
}

export default App
