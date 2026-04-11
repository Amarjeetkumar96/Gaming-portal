import { useState, useEffect } from 'react'
import LoadingSpinner from './LoadingSpinner'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Arena...')
  
  const loadingSteps = [
    { text: 'Initializing Arena...', duration: 1000 },
    { text: 'Loading 3D Assets...', duration: 1200 },
    { text: 'Connecting to Tournament Network...', duration: 800 },
    { text: 'Preparing Battle Grounds...', duration: 1000 },
    { text: 'Ready for Combat!', duration: 500 }
  ]
  
  useEffect(() => {
    let currentStep = 0
    let currentProgress = 0
    let progressInterval = null
    let mainInterval = null
    
    const startStep = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingText(step.text)
        
        const stepProgress = 100 / loadingSteps.length
        const targetProgress = (currentStep + 1) * stepProgress
        
        progressInterval = setInterval(() => {
          currentProgress += 2
          setProgress(Math.min(currentProgress, targetProgress))
          
          if (currentProgress >= targetProgress) {
            clearInterval(progressInterval)
            currentStep++
            setTimeout(startStep, 100)
          }
        }, step.duration / (stepProgress / 2))
      } else {
        setTimeout(() => onComplete && onComplete(), 500)
      }
    }
    
    mainInterval = setInterval(startStep, 100)
    
    return () => {
      if (mainInterval) clearInterval(mainInterval)
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [onComplete])
  
  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-purple-900/20 to-blue-900/20"></div>
      
      {/* Matrix Rain Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono matrix-text"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="matrix-rain">
                {Math.random().toString(36).substring(2, 3)}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Loading Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* 3D Loading Spinner */}
        <div className="flex justify-center">
          <LoadingSpinner size="xl" />
        </div>
        
        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display cyber-text">
            {loadingText}
          </h2>
          
          {/* Progress Bar */}
          <div className="w-80 mx-auto">
            <div className="bg-black/30 rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-center mt-2 text-white/60 font-mono">
              {Math.round(progress)}%
            </div>
          </div>
        </div>
        
        {/* Cyber Grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-green-400/10 to-transparent animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
