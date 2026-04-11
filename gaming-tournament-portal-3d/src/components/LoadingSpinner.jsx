import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

function SpinningCube() {
  const ref = useRef()
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5
      ref.current.rotation.y = state.clock.elapsedTime * 0.3
      ref.current.rotation.z = state.clock.elapsedTime * 0.2
    }
  })
  
  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#39ff14" 
        metalness={0.8} 
        roughness={0.2}
        emissive="#39ff14"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function LoadingSpinner({ size = 'md' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }
  
  return (
    <div className={`${sizeClasses[size]} relative`}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[2, 2, 2]} intensity={1} color="#39ff14" />
        <pointLight position={[-2, -2, -2]} intensity={1} color="#bc13fe" />
        <SpinningCube />
      </Canvas>
    </div>
  )
}

export default LoadingSpinner
