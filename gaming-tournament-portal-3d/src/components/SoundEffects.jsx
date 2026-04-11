import { useEffect, useRef } from 'react'

export function useSoundEffects() {
  const audioContextRef = useRef(null)
  
  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && window.AudioContext) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])
  
  const playBeep = (frequency = 800, duration = 100) => {
    if (!audioContextRef.current) return
    
    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    oscillator.frequency.setValueAtTime(frequency, audioContextRef.current.currentTime)
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.1, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + duration / 1000)
    
    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + duration / 1000)
  }
  
  const playClick = () => playBeep(1000, 50)
  const playHover = () => playBeep(1200, 30)
  const playSuccess = () => {
    playBeep(800, 100)
    setTimeout(() => playBeep(1000, 100), 100)
    setTimeout(() => playBeep(1200, 100), 200)
  }
  
  const playError = () => {
    playBeep(200, 200)
    setTimeout(() => playBeep(150, 200), 200)
  }
  
  return {
    playClick,
    playHover,
    playSuccess,
    playError
  }
}

export default useSoundEffects
