import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Environment, Stars, Float, Sparkles, Cloud } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useNotifications } from '../context/NotificationContext'

function FloatingPlatform({ position, color }) {
	const ref = useRef()
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.2
			ref.current.rotation.y = state.clock.elapsedTime * 0.3
		}
	})
	
	return (
		<Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
			<group ref={ref} position={position}>
				<mesh castShadow receiveShadow>
					<cylinderGeometry args={[1.2, 1.2, 0.15, 32]} />
					<meshStandardMaterial 
						color={color} 
						metalness={0.9} 
						roughness={0.1} 
						emissive={color} 
						emissiveIntensity={0.2}
					/>
				</mesh>
				<mesh position={[0, 0.1, 0]}>
					<torusGeometry args={[1.3, 0.05, 16, 64]} />
					<meshBasicMaterial 
						color={color} 
						transparent 
						opacity={0.6}
					/>
				</mesh>
			</group>
		</Float>
	)
}

function TournamentArena() {
	const arenaRef = useRef()
	const elapsedTimeRef = useRef(0)
	
	useFrame((state) => {
		if (arenaRef.current) {
			arenaRef.current.rotation.y = state.clock.elapsedTime * 0.1
		}
		elapsedTimeRef.current = state.clock.elapsedTime
	})
	
	return (
		<group ref={arenaRef}>
			<mesh position={[0, -1, 0]} castShadow receiveShadow>
				<cylinderGeometry args={[8, 8, 0.5, 64]} />
				<meshStandardMaterial 
					color="#1a1a1a" 
					metalness={0.8} 
					roughness={0.2}
					emissive="#001122"
					emissiveIntensity={0.1}
				/>
			</mesh>
			
			<mesh position={[0, -0.7, 0]}>
				<torusGeometry args={[8.5, 0.1, 16, 100]} />
				<meshBasicMaterial 
					color="#39ff14" 
					transparent 
					opacity={0.8}
				/>
			</mesh>
			
			{Array.from({ length: 8 }).map((_, i) => (
				<EnergyBeam key={i} index={i} elapsedTime={elapsedTimeRef.current} />
			))}
		</group>
	)
}

function EnergyBeam({ index, elapsedTime }) {
	return (
		<mesh position={[
			Math.cos(index * Math.PI / 4) * 7,
			Math.sin(elapsedTime * 2 + index) * 0.5 + 2,
			Math.sin(index * Math.PI / 4) * 7
		]}>
			<cylinderGeometry args={[0.05, 0.05, 4, 8]} />
			<meshBasicMaterial 
				color={index % 3 === 0 ? '#39ff14' : index % 3 === 1 ? '#bc13fe' : '#00e5ff'}
				transparent
				opacity={0.7}
			/>
		</mesh>
	)
}

function RotatingCard({ color = '#39ff14', title = 'Tournament', ...props }) {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	const { addNotification } = useNotifications()
	
	useFrame((_, delta) => {
		if (ref.current) {
			if (!hovered) {
				ref.current.rotation.y += delta * 0.8
				ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
			}
			ref.current.position.y = Math.sin(Date.now() * 0.002 + props.position[0]) * 0.05
		}
	})

	const handleClick = () => {
		addNotification({
			title: 'Tournament Details Query',
			message: `Accessing data for ${title}. Prize: $25,000.`,
			type: 'info'
		})
	}
	
	return (
		<group {...props}>
			<mesh
				ref={ref}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
				onClick={handleClick}
				castShadow
				receiveShadow
			>
				<boxGeometry args={[1.6, 1.6, 1.6]} />
				<meshStandardMaterial 
					color={color} 
					metalness={0.9} 
					roughness={0.1} 
					emissive={color} 
					emissiveIntensity={hovered ? 0.6 : 0.2}
				/>
			</mesh>
			
			<mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[1.2, 0.05, 16, 32]} />
				<meshBasicMaterial 
					color={color} 
					transparent 
					opacity={hovered ? 0.8 : 0.4}
					side={THREE.DoubleSide}
				/>
			</mesh>
			
			{hovered && (
				<Text
					position={[0, 2.2, 0]}
					fontSize={0.3}
					color={color}
					anchorX="center"
					anchorY="middle"
				>
					{title}
				</Text>
			)}
			
			{hovered && Array.from({ length: 8 }).map((_, i) => (
				<mesh key={i} position={[
					Math.cos(i * Math.PI / 4) * 2,
					Math.sin(Date.now() * 0.01 + i) * 0.5 + 1,
					Math.sin(i * Math.PI / 4) * 2
				]}>
					<sphereGeometry args={[0.05]} />
					<meshBasicMaterial color={color} transparent opacity={0.6} />
				</mesh>
			))}
		</group>
	)
}

export default function Tournaments3D() {
	const cards = [
		{ 
			color: '#39ff14', 
			title: 'Neon Clash', 
			subtitle: '5v5', 
			game: 'Valorant',
			prize: '$25,000',
			players: 128,
			status: 'Live',
			startTime: '2:30 PM',
			description: 'Intense 5v5 tactical shooter tournament'
		},
		{ 
			color: '#bc13fe', 
			title: 'Quantum Royale', 
			subtitle: 'Solo', 
			game: 'Fortnite',
			prize: '$15,000',
			players: 256,
			status: 'Upcoming',
			startTime: '6:00 PM',
			description: 'Battle royale mayhem with 256 players'
		},
		{ 
			color: '#00e5ff', 
			title: 'Cyber Arena', 
			subtitle: '3v3', 
			game: 'League of Legends',
			prize: '$20,000',
			players: 64,
			status: 'Registration',
			startTime: '4:00 PM',
			description: 'Strategic 3v3 MOBA competition'
		},
		{ 
			color: '#ff6b35', 
			title: 'Dragon Masters', 
			subtitle: '1v1', 
			game: 'Street Fighter VI',
			prize: '$10,000',
			players: 32,
			status: 'Live',
			startTime: '1:00 PM',
			description: 'Epic fighting game championship'
		},
		{ 
			color: '#ffd700', 
			title: 'Rocket League', 
			subtitle: '2v2', 
			game: 'Rocket League',
			prize: '$12,000',
			players: 48,
			status: 'Upcoming',
			startTime: '8:00 PM',
			description: 'High-flying car soccer action'
		},
		{ 
			color: '#ff1493', 
			title: 'Apex Legends', 
			subtitle: 'Squad', 
			game: 'Apex Legends',
			prize: '$18,000',
			players: 60,
			status: 'Registration',
			startTime: '7:00 PM',
			description: 'Squad-based battle royale'
		}
	]
	
	return (
		<div className="space-y-12 stagger-in">
			<div className="text-center space-y-4">
				<div className="inline-block px-4 py-1.5 rounded-full glass-premium text-neon-blue text-[10px] font-display mb-2">
					Global Events Dashboard
				</div>
				<h2 className="text-4xl lg:text-6xl font-display neon-text-purple">Tournament Arena</h2>
				<p className="text-white/60 font-mono">Select a virtual node to initialize synchronization</p>
			</div>
			
			<div className="glass-vibrant rounded-[2.5rem] p-8 relative overflow-hidden group">
				<div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-transparent to-blue-900/10 z-10 pointer-events-none"></div>
				<div className="aspect-[21/9] w-full relative z-20">
					<Canvas 
						gl={{ 
							antialias: true, 
							powerPreference: 'high-performance',
							toneMapping: THREE.ACESFilmicToneMapping,
							toneMappingExposure: 1.2
						}} 
						dpr={[1, 2]} 
						camera={{ position: [8, 6, 12], fov: 45 }}
						shadows
					>
						<color attach="background" args={['#000000']} />
						<Stars radius={120} depth={60} count={5000} factor={5} saturation={0} fade speed={1.2} />
						
						<ambientLight intensity={0.4} color="#ffffff" />
						<directionalLight 
							position={[15, 15, 8]} 
							intensity={2.2} 
							color="#bc13fe" 
							castShadow
							shadow-mapSize={[2048, 2048]}
						/>
						<pointLight position={[-8, 8, -8]} intensity={1.5} color="#00e5ff" />
						<pointLight position={[8, 8, 8]} intensity={1.3} color="#39ff14" />
						
						<TournamentArena />
						
						{cards.map((c, i) => (
							<RotatingCard 
								key={i} 
								color={c.color} 
								title={c.title}
								position={[i * 3 - 7.5, 0, 0]} 
							/>
						))}
						
						{cards.map((c, i) => (
							<FloatingPlatform 
								key={`platform-${i}`}
								position={[i * 3 - 7.5, -1.5, 0]} 
								color={c.color} 
							/>
						))}
						
						<Sparkles count={150} scale={18} size={2.5} speed={0.4} color="#39ff14" />
						<Sparkles count={100} scale={12} size={1.5} speed={0.8} color="#00e5ff" />
						
						<Cloud opacity={0.05} speed={0.3} width={25} depth={25} color="#39ff14" />
						
						<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
							<planeGeometry args={[50, 50]} />
							<meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
						</mesh>
						
						<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
							<planeGeometry args={[40, 40, 40, 40]} />
							<meshBasicMaterial color="#39ff14" transparent opacity={0.05} wireframe />
						</mesh>
						
						<OrbitControls 
							enableDamping 
							autoRotate
							autoRotateSpeed={0.2}
							maxPolarAngle={Math.PI / 2}
							minDistance={6}
							maxDistance={20}
						/>
						
						<Environment preset="night" />
					</Canvas>
				</div>
			</div>
			
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
				{cards.map((card, i) => (
					<div key={i} className="glass-premium rounded-2xl p-6 border-white/5 hover-lift card-hover group relative overflow-hidden">
						<div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -z-10 group-hover:bg-neon-green/10 transition-colors" />
						
						<div className="flex items-center justify-between mb-6">
							<div className="flex items-center gap-3">
								<div 
									className="w-3 h-3 rounded-full shadow-[0_0_10px_currentColor] animate-pulse" 
									style={{ color: card.color, backgroundColor: card.color }}
								></div>
								<h3 className="text-xl font-display text-white/90 group-hover:text-white transition-colors">
									{card.title}
								</h3>
							</div>
							<span className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold tracking-widest ${
								card.status === 'Live' ? 'bg-red-500/20 text-red-400' :
								card.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
								'bg-blue-500/20 text-blue-400'
							}`}>
								{card.status}
							</span>
						</div>
						
						<div className="space-y-4">
							<div className="flex justify-between text-sm">
								<span className="text-white/40 font-mono">Protocol:</span>
								<span className="text-white font-medium">{card.game}</span>
							</div>
							
							<div className="flex justify-between text-sm">
								<span className="text-white/40 font-mono">Format:</span>
								<span className="text-white font-medium">{card.subtitle}</span>
							</div>
							
							<p className="text-white/60 text-xs leading-relaxed min-h-[40px]">
								{card.description}
							</p>
							
							<div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
								<div>
									<div className="text-[10px] text-white/30 uppercase font-display mb-1">Prize Pool</div>
									<div className="text-lg font-black text-neon-green">{card.prize}</div>
								</div>
								<div>
									<div className="text-[10px] text-white/30 uppercase font-display mb-1">Slots</div>
									<div className="text-lg font-black text-neon-blue">{card.players}</div>
								</div>
							</div>
							
							<button className="w-full mt-2 py-3 rounded-xl glass hover:bg-white/10 text-white font-display text-xs transition-all tracking-widest border-neon-blue/20 hover:border-neon-blue/40">
								Join Protocol
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

