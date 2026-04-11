import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Environment, Stars, Float, Sparkles, Cloud } from '@react-three/drei'
import { useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

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
				{/* Glowing ring around platform */}
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
			{/* Central Arena Structure */}
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
			
			{/* Arena Border */}
			<mesh position={[0, -0.7, 0]}>
				<torusGeometry args={[8.5, 0.1, 16, 100]} />
				<meshBasicMaterial 
					color="#39ff14" 
					transparent 
					opacity={0.8}
				/>
			</mesh>
			
			{/* Energy Beams */}
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

function RotatingCard({ color = '#39ff14', title = 'Tournament', subtitle = 'Game Mode', ...props }) {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	
	useFrame((_, delta) => {
		if (ref.current) {
			if (!hovered) {
				ref.current.rotation.y += delta * 0.8
				ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1
			}
			ref.current.position.y = Math.sin(Date.now() * 0.002 + props.position[0]) * 0.05
		}
	})
	
	return (
		<group {...props}>
			{/* Main Card */}
			<mesh
				ref={ref}
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
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
			
			{/* Glowing Ring */}
			<mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[1.2, 0.05, 16, 32]} />
				<meshBasicMaterial 
					color={color} 
					transparent 
					opacity={hovered ? 0.8 : 0.4}
					side={THREE.DoubleSide}
				/>
			</mesh>
			
			{/* Hover Text */}
			{hovered && (
				<Text
					position={[0, 2.2, 0]}
					fontSize={0.3}
					color={color}
					anchorX="center"
					anchorY="middle"
					font="/fonts/inter-bold.woff"
				>
					{title}
				</Text>
			)}
			
			{/* Particle Effects */}
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
		<div className="space-y-6">
			<div className="text-center space-y-2 slide-in-up">
				<h2 className="text-3xl md:text-4xl font-display neon-text bounce-in">Tournament Arena</h2>
				<p className="text-white/70 slide-in-up stagger-1">Choose your battle and enter the 3D arena</p>
			</div>
			
			<div className="glass rounded-2xl p-6 relative overflow-hidden hover-lift slide-in-up stagger-2">
				<div className="absolute inset-0 bg-gradient-to-br from-green-900/10 via-purple-900/10 to-blue-900/10 z-10 pointer-events-none"></div>
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
						
						{/* Advanced Lighting Setup */}
						<ambientLight intensity={0.4} color="#ffffff" />
						<directionalLight 
							position={[15, 15, 8]} 
							intensity={2.2} 
							color="#bc13fe" 
							castShadow
							shadow-mapSize={[4096, 4096]}
							shadow-camera-far={100}
							shadow-camera-left={-20}
							shadow-camera-right={20}
							shadow-camera-top={20}
							shadow-camera-bottom={-20}
						/>
						<pointLight position={[-8, 8, -8]} intensity={1.5} color="#00e5ff" />
						<pointLight position={[8, 8, 8]} intensity={1.3} color="#39ff14" />
						<pointLight position={[0, 12, 0]} intensity={1.0} color="#ff6b35" />
						<pointLight position={[-12, 6, 4]} intensity={0.8} color="#ff1493" />
						<pointLight position={[12, 6, -4]} intensity={0.8} color="#ffd700" />
						
						{/* Tournament Arena */}
						<TournamentArena />
						
						{/* Tournament Cards */}
						{cards.map((c, i) => (
							<RotatingCard 
								key={i} 
								color={c.color} 
								title={c.title}
								subtitle={c.subtitle}
								position={[i * 3 - 7.5, 0, 0]} 
							/>
						))}
						
						{/* Floating Platforms */}
						{cards.map((c, i) => (
							<FloatingPlatform 
								key={`platform-${i}`}
								position={[i * 3 - 7.5, -1.5, 0]} 
								color={c.color} 
							/>
						))}
						
						{/* Enhanced Sparkles Effect */}
						<Sparkles count={150} scale={18} size={2.5} speed={0.4} color="#39ff14" />
						<Sparkles count={120} scale={15} size={2} speed={0.6} color="#bc13fe" />
						<Sparkles count={100} scale={12} size={1.5} speed={0.8} color="#00e5ff" />
						<Sparkles count={80} scale={10} size={1.2} speed={1.0} color="#ff6b35" />
						<Sparkles count={60} scale={8} size={1} speed={1.2} color="#ff1493" />
						
						{/* Atmospheric Cloud */}
						<Cloud
							opacity={0.08}
							speed={0.3}
							width={25}
							depth={25}
							segments={25}
							color="#39ff14"
						/>
						
						{/* Enhanced Ground Plane */}
						<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, 0]} receiveShadow>
							<planeGeometry args={[50, 50]} />
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
							<planeGeometry args={[40, 40, 40, 40]} />
							<meshBasicMaterial 
								color="#39ff14" 
								transparent 
								opacity={0.08}
								wireframe
							/>
						</mesh>
						
						<OrbitControls 
							enableDamping 
							dampingFactor={0.03}
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
			
			{/* Tournament Info Cards */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{cards.map((card, i) => (
					<div key={i} className={`glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group hover-lift scale-in stagger-${i + 1}`}>
						<div className="flex items-center justify-between mb-4">
							<div className="flex items-center space-x-3">
								<div 
									className="w-4 h-4 rounded-full pulse-glow" 
									style={{ backgroundColor: card.color }}
								></div>
								<h3 className="text-xl font-semibold" style={{ color: card.color }}>
									{card.title}
								</h3>
							</div>
							<span className={`px-3 py-1 rounded-full text-xs font-medium ${
								card.status === 'Live' ? 'bg-red-500/20 text-red-400' :
								card.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
								'bg-blue-500/20 text-blue-400'
							}`}>
								{card.status}
							</span>
						</div>
						
						<div className="space-y-3">
							<div className="flex items-center space-x-2">
								<span className="text-white/60 text-sm">Game:</span>
								<span className="text-white font-medium">{card.game}</span>
							</div>
							
							<div className="flex items-center space-x-2">
								<span className="text-white/60 text-sm">Format:</span>
								<span className="text-white font-medium">{card.subtitle}</span>
							</div>
							
							<p className="text-white/70 text-sm">{card.description}</p>
							
							<div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/10">
								<div>
									<div className="text-xs text-white/50">Prize Pool</div>
									<div className="text-lg font-bold text-green-400">{card.prize}</div>
								</div>
								<div>
									<div className="text-xs text-white/50">Players</div>
									<div className="text-lg font-bold text-blue-400">{card.players}</div>
								</div>
							</div>
							
							<div className="flex items-center justify-between pt-2">
								<div className="text-xs text-white/50">Start Time</div>
								<div className="text-sm font-medium text-white">{card.startTime}</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

