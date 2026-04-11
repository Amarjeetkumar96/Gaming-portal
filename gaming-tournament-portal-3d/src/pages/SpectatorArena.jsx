import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Float, Sparkles, Stars, Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Scoreboard({ position, color, score, teamName }) {
	const ref = useRef()
	useFrame((state) => {
		if (!ref.current) return
		ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
		ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
	})
	
	return (
		<Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
			<group ref={ref} position={position}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[3, 2, 0.2]} />
					<meshStandardMaterial 
						color={color} 
						metalness={0.8} 
						roughness={0.2}
						emissive={color}
						emissiveIntensity={0.3}
					/>
				</mesh>
				{/* Glowing border */}
				<mesh position={[0, 0, 0.11]}>
					<planeGeometry args={[3.2, 2.2]} />
					<meshBasicMaterial 
						color={color} 
						transparent 
						opacity={0.6}
					/>
				</mesh>
				<Text
					position={[0, 0.3, 0.12]}
					fontSize={0.3}
					color={color}
					anchorX="center"
					anchorY="middle"
				>
					{teamName}
				</Text>
				<Text
					position={[0, -0.3, 0.12]}
					fontSize={0.6}
					color={color}
					anchorX="center"
					anchorY="middle"
				>
					{score}
				</Text>
			</group>
		</Float>
	)
}

function ArenaStadium() {
	const stadiumRef = useRef()
	
	useFrame((state) => {
		if (stadiumRef.current) {
			stadiumRef.current.rotation.y = state.clock.elapsedTime * 0.05
		}
	})
	
	return (
		<group ref={stadiumRef}>
			{/* Stadium Base */}
			<mesh position={[0, -2, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[15, 15, 0.5, 64]} />
				<meshStandardMaterial 
					color="#1a1a1a" 
					metalness={0.8} 
					roughness={0.2}
					emissive="#001122"
					emissiveIntensity={0.1}
				/>
			</mesh>
			
			{/* Stadium Walls */}
			{Array.from({ length: 8 }).map((_, i) => (
				<mesh key={i} position={[
					Math.cos(i * Math.PI / 4) * 12,
					-1,
					Math.sin(i * Math.PI / 4) * 12
				]} rotation={[0, i * Math.PI / 4, 0]}>
					<boxGeometry args={[2, 4, 0.2]} />
					<meshStandardMaterial 
						color="#39ff14" 
						metalness={0.8} 
						roughness={0.2}
						emissive="#39ff14"
						emissiveIntensity={0.2}
					/>
				</mesh>
			))}
			
			{/* Energy Beams */}
			{Array.from({ length: 16 }).map((_, i) => (
				<mesh key={i} position={[
					Math.cos(i * Math.PI / 8) * 10,
					Math.sin(Date.now() * 0.001 + i) * 0.5 + 3,
					Math.sin(i * Math.PI / 8) * 10
				]}>
					<cylinderGeometry args={[0.1, 0.1, 6, 8]} />
					<meshBasicMaterial 
						color={i % 3 === 0 ? '#39ff14' : i % 3 === 1 ? '#bc13fe' : '#00e5ff'}
						transparent
						opacity={0.8}
					/>
				</mesh>
			))}
		</group>
	)
}

export default function SpectatorArena() {
	const [scores] = useState({ a: 3, b: 5 })
	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl md:text-4xl font-display neon-text">Spectator Arena</h2>
				<p className="text-white/70">Watch live matches in stunning 3D</p>
			</div>
			
			<div className="glass rounded-2xl p-6 relative overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-purple-900/10 to-blue-900/10 z-10 pointer-events-none"></div>
				<div className="aspect-[21/9] relative z-20">
					<Canvas 
						gl={{ 
							antialias: true, 
							powerPreference: 'high-performance',
							toneMapping: THREE.ACESFilmicToneMapping,
							toneMappingExposure: 1.2
						}} 
						dpr={[1, 2]} 
						camera={{ position: [0, 6, 12], fov: 50 }}
						shadows
					>
						<color attach="background" args={['#000000']} />
						<Stars radius={100} depth={50} count={4000} factor={5} saturation={0} fade speed={1.2} />
						
						{/* Advanced Lighting */}
						<ambientLight intensity={0.3} color="#ffffff" />
						<directionalLight 
							position={[10, 15, 8]} 
							intensity={1.8} 
							color="#bc13fe" 
							castShadow
							shadow-mapSize={[4096, 4096]}
						/>
						<pointLight position={[-8, 8, -8]} intensity={1.2} color="#39ff14" />
						<pointLight position={[8, 8, 8]} intensity={1.0} color="#bc13fe" />
						<pointLight position={[0, 12, 0]} intensity={0.8} color="#00e5ff" />
						
						{/* Stadium */}
						<ArenaStadium />
						
						{/* Scoreboards */}
						<Scoreboard position={[-4, 3, 0]} color="#39ff14" score={scores.a} teamName="Team A" />
						<Scoreboard position={[4, 3, 0]} color="#bc13fe" score={scores.b} teamName="Team B" />
						
						{/* Sparkles */}
						<Sparkles count={100} scale={12} size={2} speed={0.6} color="#39ff14" />
						<Sparkles count={80} scale={10} size={1.5} speed={0.8} color="#bc13fe" />
						<Sparkles count={60} scale={8} size={1} speed={1} color="#00e5ff" />
						
						{/* Ground */}
						<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
							<planeGeometry args={[40, 40]} />
							<meshStandardMaterial 
								color="#0a0a0a" 
								metalness={0.9} 
								roughness={0.1}
								emissive="#001122"
								emissiveIntensity={0.03}
							/>
						</mesh>
						
						{/* Holographic Grid */}
						<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
							<planeGeometry args={[30, 30, 30, 30]} />
							<meshBasicMaterial 
								color="#39ff14" 
								transparent 
								opacity={0.1}
								wireframe
							/>
						</mesh>
						
						<OrbitControls 
							enableDamping 
							dampingFactor={0.03}
							autoRotate
							autoRotateSpeed={0.2}
							maxPolarAngle={Math.PI / 2}
							minDistance={8}
							maxDistance={20}
						/>
					</Canvas>
				</div>
			</div>
			
			<div className="glass rounded-2xl p-6">
				<div className="grid md:grid-cols-3 gap-4">
					<div className="text-center">
						<div className="text-3xl font-bold text-green-400 mb-2">Live</div>
						<div className="text-white/70">Match Status</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-blue-400 mb-2">1,247</div>
						<div className="text-white/70">Viewers</div>
					</div>
					<div className="text-center">
						<div className="text-3xl font-bold text-purple-400 mb-2">Round 3</div>
						<div className="text-white/70">Current Round</div>
					</div>
				</div>
			</div>
		</div>
	)
}

