import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Float, Sparkles, Cloud } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'
import { useNotifications } from '../context/NotificationContext'

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
	
	useFrame(() => {
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
	const { addNotification } = useNotifications()
	
	useFrame((state, delta) => {
		if (!ref.current) return
		ref.current.rotation.y += delta * 0.8
		ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.3
		ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
		
		if (hovered) {
			ref.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
		} else {
			ref.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
		}
	})

	const handleClick = () => {
		addNotification({
			title: 'Energy Core Synced',
			message: 'Neural interface established. Tournament latency: 12ms.',
			type: 'success'
		})
	}
	
	return (
		<group>
			<mesh 
				ref={ref} 
				castShadow 
				receiveShadow
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={handleClick}
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

export default function Home3D() {
	return (
		<div className="grid lg:grid-cols-2 gap-12 items-center stagger-in">
			<div className="h-[50dvh] lg:h-[65dvh] rounded-3xl overflow-hidden glass-vibrant relative group hover-lift transition-all duration-700">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-green-900/10 z-10 pointer-events-none group-hover:opacity-50 transition-opacity"></div>
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
					
					<ambientLight intensity={0.3} color="#ffffff" />
					<directionalLight 
						position={[15, 15, 8]} 
						intensity={2.5} 
						color="#bc13fe" 
						castShadow
						shadow-mapSize={[2048, 2048]}
					/>
					<pointLight position={[-12, 8, -8]} intensity={1.5} color="#00e5ff" />
					<pointLight position={[12, 8, 8]} intensity={1.3} color="#39ff14" />
					
					<MainController />
					<EnergyRings />
					<FloatingParticles />
					<FloatingCubes />
					
					<Sparkles count={120} scale={12} size={2.5} speed={0.3} color="#39ff14" />
					<Sparkles count={80} scale={8} size={1.5} speed={0.7} color="#00e5ff" />
					
					<Cloud opacity={0.05} speed={0.2} width={20} depth={20} color="#39ff14" />
					
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
						<planeGeometry args={[40, 40]} />
						<meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
					</mesh>
					
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.9, 0]}>
						<planeGeometry args={[30, 30, 30, 30]} />
						<meshBasicMaterial color="#39ff14" transparent opacity={0.05} wireframe />
					</mesh>
					
					<OrbitControls 
						enableDamping 
						enablePan={false} 
						autoRotate
						autoRotateSpeed={0.3}
						maxPolarAngle={Math.PI / 2}
						minDistance={4}
						maxDistance={15}
					/>
					
					<Environment preset="night" />
				</Canvas>
				
				<div className="absolute top-4 right-4 z-20 glass px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter text-white/50">
					Interactive Core Module
				</div>
			</div>

			<div className="space-y-10">
				<div className="space-y-6">
					<div className="inline-block px-4 py-1.5 rounded-full glass-premium border-neon-green/30 text-neon-green text-[10px] font-display mb-4 animate-pulse-slow">
						The Future is Here
					</div>
					<h1 className="text-5xl lg:text-7xl font-display leading-[1.1] tracking-tighter">
						The Ultimate <br />
						<span className="gradient-text">Gaming Portal</span>
					</h1>
					<p className="text-white/60 text-lg lg:text-xl font-mono leading-relaxed max-w-xl">
						Experience high-stakes competitive combat in a futuristic arena. 
						Real-time tracking, 3D visualization, and neural network connectivity.
					</p>
				</div>
				
				<div className="flex flex-wrap gap-4">
					{[
						{ label: 'Verified Tourney', value: '50+', color: 'text-neon-green' },
						{ label: 'Active Combatants', value: '1.2K', color: 'text-neon-blue' },
						{ label: 'Live Broadcasts', value: '24/7', color: 'text-neon-purple' },
					].map((stat, i) => (
						<div key={i} className="glass-premium p-6 rounded-2xl flex-1 min-w-[160px] card-hover">
							<div className={`text-3xl font-black ${stat.color} mb-1`}>{stat.value}</div>
							<div className="text-[10px] font-display text-white/40 uppercase">{stat.label}</div>
						</div>
					))}
				</div>

				<div className="flex gap-4">
					<button className="btn-cyber flex items-center gap-2 group">
						Enter Arena
						<div className="group-hover:translate-x-1 transition-transform">→</div>
					</button>
					<button className="glass px-8 py-3 rounded-lg font-bold hover:bg-white/5 transition-all">
						Read Protocol
					</button>
				</div>
			</div>
		</div>
	)
}

