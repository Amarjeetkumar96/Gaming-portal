import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Float, Sparkles, Cloud } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

function FloatingParticles() {
	const particles = useRef()
	const particleCount = 200
	
	const particlePositions = useMemo(() => {
		const positions = new Float32Array(particleCount * 3)
		for (let i = 0; i < particleCount; i++) {
			positions[i * 3] = (Math.random() - 0.5) * 50
			positions[i * 3 + 1] = (Math.random() - 0.5) * 50
			positions[i * 3 + 2] = (Math.random() - 0.5) * 50
		}
		return positions
	}, [])
	
	useFrame((state) => {
		if (particles.current) {
			particles.current.rotation.y = state.clock.elapsedTime * 0.05
			particles.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
		}
	})
	
	return (
		<points ref={particles}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					count={particleCount}
					array={particlePositions}
					itemSize={3}
				/>
			</bufferGeometry>
			<pointsMaterial
				color="#39ff14"
				size={0.1}
				transparent
				opacity={0.8}
				sizeAttenuation
			/>
		</points>
	)
}

function EnergyRings() {
	const ring1 = useRef()
	const ring2 = useRef()
	const ring3 = useRef()
	
	useFrame((state) => {
		if (ring1.current) ring1.current.rotation.z += 0.01
		if (ring2.current) ring2.current.rotation.z -= 0.008
		if (ring3.current) ring3.current.rotation.z += 0.012
	})
	
	return (
		<group>
			<mesh ref={ring1} position={[0, 0, 0]}>
				<torusGeometry args={[4, 0.1, 16, 100]} />
				<meshBasicMaterial color="#39ff14" transparent opacity={0.6} />
			</mesh>
			<mesh ref={ring2} position={[0, 0, 0]}>
				<torusGeometry args={[5, 0.08, 16, 100]} />
				<meshBasicMaterial color="#bc13fe" transparent opacity={0.4} />
			</mesh>
			<mesh ref={ring3} position={[0, 0, 0]}>
				<torusGeometry args={[6, 0.06, 16, 100]} />
				<meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
			</mesh>
		</group>
	)
}

function FloatingCubes() {
	const cubes = useRef()
	
	useFrame((state) => {
		if (cubes.current) {
			cubes.current.children.forEach((cube, i) => {
				cube.rotation.x = state.clock.elapsedTime * (0.5 + i * 0.1)
				cube.rotation.y = state.clock.elapsedTime * (0.3 + i * 0.05)
				cube.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5
			})
		}
	})
	
	return (
		<group ref={cubes}>
			{Array.from({ length: 8 }).map((_, i) => (
				<Float key={i} speed={1 + i * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
					<mesh position={[
						Math.cos(i * Math.PI / 4) * 8,
						Math.sin(i * Math.PI / 4) * 2,
						Math.sin(i * Math.PI / 4) * 8
					]}>
						<boxGeometry args={[0.3, 0.3, 0.3]} />
						<meshStandardMaterial 
							color={i % 3 === 0 ? '#39ff14' : i % 3 === 1 ? '#bc13fe' : '#00e5ff'}
							metalness={0.8}
							roughness={0.2}
							emissive={i % 3 === 0 ? '#39ff14' : i % 3 === 1 ? '#bc13fe' : '#00e5ff'}
							emissiveIntensity={0.2}
						/>
					</mesh>
				</Float>
			))}
		</group>
	)
}

function MainController() {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	
	useFrame((state, delta) => {
		if (!ref.current) return
		ref.current.rotation.y += delta * 0.8
		ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.3
		ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
		
		if (hovered) {
			ref.current.scale.setScalar(1.2)
		} else {
			ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
		}
	})
	
	return (
		<group>
			<mesh 
				ref={ref} 
				castShadow 
				receiveShadow
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				<torusGeometry args={[1.2, 0.4, 32, 64]} />
				<meshStandardMaterial 
					color="#00e5ff" 
					metalness={0.8} 
					roughness={0.1} 
					emissive="#0ff" 
					emissiveIntensity={hovered ? 0.3 : 0.1}
				/>
			</mesh>
			<mesh position={[0, 0, 0]} castShadow>
				<sphereGeometry args={[0.3, 16, 16]} />
				<meshStandardMaterial 
					color="#bc13fe" 
					metalness={0.9} 
					roughness={0.05} 
					emissive="#bc13fe" 
					emissiveIntensity={0.2}
				/>
			</mesh>
		</group>
	)
}

function RotatingRings() {
	const ring1 = useRef()
	const ring2 = useRef()
	const ring3 = useRef()
	
	useFrame((state, delta) => {
		if (ring1.current) ring1.current.rotation.z += delta * 0.5
		if (ring2.current) ring2.current.rotation.z -= delta * 0.3
		if (ring3.current) ring3.current.rotation.z += delta * 0.7
	})
	
	return (
		<group>
			<mesh ref={ring1} position={[0, 0, 0]}>
				<torusGeometry args={[2, 0.1, 16, 32]} />
				<meshBasicMaterial color="#39ff14" transparent opacity={0.6} />
			</mesh>
			<mesh ref={ring2} position={[0, 0, 0]}>
				<torusGeometry args={[2.5, 0.08, 16, 32]} />
				<meshBasicMaterial color="#bc13fe" transparent opacity={0.4} />
			</mesh>
			<mesh ref={ring3} position={[0, 0, 0]}>
				<torusGeometry args={[3, 0.06, 16, 32]} />
				<meshBasicMaterial color="#00e5ff" transparent opacity={0.3} />
			</mesh>
		</group>
	)
}

export default function Home3D() {
	return (
		<div className="grid md:grid-cols-2 gap-8 items-center">
			<div className="h-[42dvh] md:h-[52dvh] rounded-2xl overflow-hidden glass relative slide-in-left hover-lift">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 z-10 pointer-events-none"></div>
				<Canvas 
					gl={{ 
						antialias: true, 
						powerPreference: 'high-performance',
						toneMapping: THREE.ACESFilmicToneMapping,
						toneMappingExposure: 1.3
					}} 
					dpr={[1, 2]} 
					camera={{ position: [5, 4, 8], fov: 45 }}
					shadows
				>
					<color attach="background" args={['#000000']} />
					<Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade speed={1.5} />
					
					{/* Advanced Lighting Setup */}
					<ambientLight intensity={0.3} color="#ffffff" />
					<directionalLight 
						position={[15, 15, 8]} 
						intensity={2.5} 
						color="#bc13fe" 
						castShadow
						shadow-mapSize={[4096, 4096]}
						shadow-camera-far={100}
						shadow-camera-left={-15}
						shadow-camera-right={15}
						shadow-camera-top={15}
						shadow-camera-bottom={-15}
					/>
					<pointLight position={[-12, 8, -8]} intensity={1.5} color="#00e5ff" />
					<pointLight position={[12, 8, 8]} intensity={1.3} color="#39ff14" />
					<pointLight position={[0, 15, 0]} intensity={1.0} color="#ff6b35" />
					<pointLight position={[-8, 12, 4]} intensity={0.8} color="#ff1493" />
					<pointLight position={[8, 12, -4]} intensity={0.8} color="#ffd700" />
					
					{/* 3D Scene Elements */}
					<MainController />
					<EnergyRings />
					<FloatingParticles />
					<FloatingCubes />
					
					{/* Enhanced Sparkles Effect */}
					<Sparkles count={120} scale={12} size={2.5} speed={0.3} color="#39ff14" />
					<Sparkles count={100} scale={10} size={2} speed={0.5} color="#bc13fe" />
					<Sparkles count={80} scale={8} size={1.5} speed={0.7} color="#00e5ff" />
					<Sparkles count={60} scale={6} size={1.2} speed={0.9} color="#ff6b35" />
					<Sparkles count={40} scale={4} size={1} speed={1.1} color="#ff1493" />
					
					{/* Atmospheric Cloud */}
					<Cloud
						opacity={0.1}
						speed={0.2}
						width={20}
						depth={20}
						segments={20}
						color="#39ff14"
					/>
					
					{/* Enhanced Ground Plane */}
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
						<planeGeometry args={[40, 40]} />
						<meshStandardMaterial 
							color="#0a0a0a" 
							metalness={0.9} 
							roughness={0.1}
							emissive="#001122"
							emissiveIntensity={0.05}
						/>
					</mesh>
					
					{/* Holographic Grid */}
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.9, 0]}>
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
						enablePan={false} 
						dampingFactor={0.03}
						autoRotate
						autoRotateSpeed={0.3}
						maxPolarAngle={Math.PI / 2}
						minDistance={4}
						maxDistance={15}
					/>
					
					<Environment preset="night" />
				</Canvas>
			</div>
			<div className="space-y-6 slide-in-right">
				<div className="space-y-4">
					<h1 className="text-4xl md:text-6xl font-display neon-text leading-tight bounce-in">
						Welcome to 
						<span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shimmer">
							Ranbhumi
						</span>
					</h1>
					<p className="text-white/80 max-w-prose text-lg leading-relaxed slide-in-up stagger-1">
						Dive into a futuristic arena where tournaments, teams, and leaderboards come alive in stunning 3D. 
						Experience the next generation of competitive gaming.
					</p>
				</div>
				
				<div className="flex flex-wrap gap-4">
					<div className="glass rounded-xl p-4 flex-1 min-w-[200px] hover-lift scale-in stagger-2">
						<div className="text-2xl font-bold text-green-400 mb-2 glow-effect">50+</div>
						<div className="text-white/70">Active Tournaments</div>
					</div>
					<div className="glass rounded-xl p-4 flex-1 min-w-[200px] hover-lift scale-in stagger-3">
						<div className="text-2xl font-bold text-blue-400 mb-2 glow-effect">1.2K</div>
						<div className="text-white/70">Players Online</div>
					</div>
					<div className="glass rounded-xl p-4 flex-1 min-w-[200px] hover-lift scale-in stagger-4">
						<div className="text-2xl font-bold text-purple-400 mb-2 glow-effect">24/7</div>
						<div className="text-white/70">Live Matches</div>
					</div>
				</div>
			</div>
		</div>
	)
}

