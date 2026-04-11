import { useState, useEffect, useCallback } from 'react'
/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from 'framer-motion'
/* eslint-enable no-unused-vars */
import { Bell, CheckCircle, Info, AlertTriangle, X } from 'lucide-react'
import { NotificationContext } from '../context/NotificationContext'

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const addNotification = useCallback((notification) => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { ...notification, id }])
    
    if (notification.duration !== 0) {
      setTimeout(() => {
        removeNotification(id)
      }, notification.duration || 5000)
    }
  }, [removeNotification])

  // Simulate random notifications
  useEffect(() => {
    const events = [
      { title: 'New Tournament', message: 'Cyber Arena Registration is now open!', type: 'info' },
      { title: 'Match Started', message: 'Neon Ninjas vs Quantum Quakes is LIVE!', type: 'success' },
      { title: 'Leaderboard Update', message: 'ThunderBolt has climbed to Rank #3!', type: 'info' },
      { title: 'Low Latency', message: 'Asia-South server is performing optimally.', type: 'success' }
    ]

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const event = events[Math.floor(Math.random() * events.length)]
        addNotification({
          ...event,
          id: Date.now()
        })
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [addNotification])

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-80">
        <AnimatePresence>
          {notifications.map((n) => (
            <NotificationItem key={n.id} notification={n} onDismiss={removeNotification} />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  )
}

function NotificationItem({ notification, onDismiss }) {
  const icons = {
    success: <CheckCircle className="text-neon-green" size={20} />,
    info: <Info className="text-neon-blue" size={20} />,
    warning: <AlertTriangle className="text-cyber-orange" size={20} />,
    error: <X className="text-cyber-pink" size={20} />
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className="glass-vibrant p-4 rounded-xl flex gap-3 items-start relative overflow-hidden group"
    >
      <div className="mt-0.5">{icons[notification.type] || icons.info}</div>
      <div className="flex-1">
        <h4 className="font-display text-sm mb-1">{notification.title}</h4>
        <p className="text-xs text-white/70 leading-relaxed">{notification.message}</p>
      </div>
      <button 
        onClick={() => onDismiss(notification.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/10 rounded"
      >
        <X size={14} />
      </button>
      <motion.div 
        initial={{ width: '100%' }}
        animate={{ width: 0 }}
        transition={{ duration: (notification.duration || 5000) / 1000, ease: 'linear' }}
        className="absolute bottom-0 left-0 h-0.5 bg-white/20"
      />
    </motion.div>
  )
}
