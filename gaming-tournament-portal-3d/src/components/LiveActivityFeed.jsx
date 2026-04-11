import { useState, useEffect } from 'react'
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion'
/* eslint-enable no-unused-vars */
import { User, Zap, Trophy, MessageSquare } from 'lucide-react'

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState([
    { id: 1, user: 'ShadowStrike', action: 'joined', target: 'Neon Clash', time: 'Just now', type: 'join' },
    { id: 2, user: 'CyberBlade', action: 'won', target: 'Match #42', time: '2m ago', type: 'win' },
    { id: 3, user: 'NeonFlash', action: 'started', target: 'Streaming', time: '5m ago', type: 'live' }
  ])

  useEffect(() => {
    const users = ['PixelWarrior', 'ThunderBolt', 'StormRider', 'VoltMaster', 'ElectricEdge', 'SpartanKing']
    const actions = [
      { text: 'joined', type: 'join', target: 'Quantum Royale' },
      { text: 'won', type: 'win', target: 'Daily Scrims' },
      { text: 'reached', type: 'level', target: 'Level 50' },
      { text: 'updated', type: 'profile', target: 'Bio' }
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const user = users[Math.floor(Math.random() * users.length)]
        const action = actions[Math.floor(Math.random() * actions.length)]
        const newActivity = {
          id: Date.now(),
          user,
          action: action.text,
          target: action.target,
          time: 'Just now',
          type: action.type
        }
        setActivities((prev) => [newActivity, ...prev.slice(0, 7)])
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const icons = {
    join: <User size={14} className="text-neon-blue" />,
    win: <Trophy size={14} className="text-cyber-gold" />,
    live: <Zap size={14} className="text-neon-green" />,
    default: <MessageSquare size={14} className="text-white/40" />
  }

  return (
    <div className="space-y-4 overflow-hidden h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-xs text-white/50 tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
          Live Activity
        </h3>
        <span className="text-[10px] text-white/30 font-mono">Real-time</span>
      </div>
      
      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="flex gap-3 group"
            >
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-white/20 transition-colors">
                {icons[activity.type] || icons.default}
              </div>
              <div className="flex flex-col min-w-0">
                <p className="text-[11px] leading-tight text-white/90">
                  <span className="text-neon-blue font-semibold">{activity.user}</span>
                  {' '}{activity.action}{' '}
                  <span className="text-white/60">{activity.target}</span>
                </p>
                <span className="text-[9px] text-white/30 mt-0.5">{activity.time}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
