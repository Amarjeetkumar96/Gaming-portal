import { useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Float, Sparkles, Stars } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function LeaderboardPodium({ position, rank, color, teamName }) {
	const ref = useRef()
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
		}
	})
	
	const height = rank === 1 ? 2 : rank === 2 ? 1.5 : 1
	
	return (
		<Float speed={1} rotationIntensity={0.3} floatIntensity={0.2}>
			<group ref={ref} position={position}>
				<mesh castShadow receiveShadow>
					<boxGeometry args={[1.5, height, 1.5]} />
					<meshStandardMaterial 
						color={color} 
						metalness={0.8} 
						roughness={0.2}
						emissive={color}
						emissiveIntensity={0.3}
					/>
				</mesh>
				<mesh position={[0, height/2 + 0.2, 0]}>
					<sphereGeometry args={[0.2, 16, 16]} />
					<meshBasicMaterial 
						color={color} 
						transparent 
						opacity={0.6}
					/>
				</mesh>
				<Text
					position={[0, height + 0.5, 0]}
					fontSize={0.25}
					color="white"
					anchorX="center"
					anchorY="middle"
					font="/fonts/orbitron.woff"
				>
					{teamName}
				</Text>
			</group>
		</Float>
	)
}

function LeaderboardVisualization() {
	return (
		<Canvas 
			gl={{ 
				antialias: true, 
				powerPreference: 'high-performance',
				toneMapping: THREE.ACESFilmicToneMapping,
				toneMappingExposure: 1.1
			}} 
			dpr={[1, 2]} 
			camera={{ position: [5, 4, 8], fov: 50 }}
			shadows
		>
			<color attach="background" args={['#000000']} />
			<Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
			
			<ambientLight intensity={0.4} color="#ffffff" />
			<directionalLight 
				position={[10, 10, 5]} 
				intensity={1.2} 
				color="#bc13fe" 
				castShadow
				shadow-mapSize={[2048, 2048]}
			/>
			<pointLight position={[-5, 5, -5]} intensity={0.8} color="#00e5ff" />
			<pointLight position={[5, 5, 5]} intensity={0.6} color="#39ff14" />
			
			<LeaderboardPodium position={[0, -0.5, 0]} rank={1} color="#ffd700" teamName="Neon Ninjas" />
			<LeaderboardPodium position={[-2, -0.75, 0]} rank={2} color="#c0c0c0" teamName="Quantum Quakes" />
			<LeaderboardPodium position={[2, -1, 0]} rank={3} color="#cd7f32" teamName="Cyber Spartans" />
			
			<Sparkles count={80} scale={8} size={1.5} speed={0.6} color="#39ff14" />
			<Sparkles count={60} scale={6} size={1} speed={0.8} color="#bc13fe" />
			
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial 
					color="#050505" 
					metalness={0.8} 
					roughness={0.2}
				/>
			</mesh>
			
			<OrbitControls 
				enableDamping 
				autoRotate
				autoRotateSpeed={0.2}
				maxPolarAngle={Math.PI / 2}
				minDistance={4}
				maxDistance={12}
			/>
		</Canvas>
	)
}

export default function Leaderboard3DPage() {
	const [rows, setRows] = useState([
		{ 
			team: 'Neon Ninjas', 
			score: 1280, 
			players: ['ShadowStrike', 'CyberBlade', 'NeonFlash', 'QuantumKnight', 'PixelWarrior'],
			game: 'Valorant',
			rank: 1,
			trend: 'up',
			winRate: 87.5,
			matches: 24
		},
		{ 
			team: 'Quantum Quakes', 
			score: 1160, 
			players: ['ThunderBolt', 'LightningStrike', 'StormRider', 'VoltMaster', 'ElectricEdge'],
			game: 'League of Legends',
			rank: 2,
			trend: 'up',
			winRate: 82.1,
			matches: 28
		},
		{ 
			team: 'Cyber Spartans', 
			score: 1100, 
			players: ['SpartanKing', 'WarriorElite', 'BattleCry', 'VictoryRush', 'Conquest'],
			game: 'Fortnite',
			rank: 3,
			trend: 'down',
			winRate: 78.9,
			matches: 19
		},
		{ 
			team: 'Dragon Masters', 
			score: 1050, 
			players: ['DragonLord', 'FireBreath', 'ScaleArmor', 'WingFlap', 'TailWhip'],
			game: 'Street Fighter VI',
			rank: 4,
			trend: 'up',
			winRate: 85.2,
			matches: 27
		},
		{ 
			team: 'Rocket Rebels', 
			score: 980, 
			players: ['RocketRush', 'BoostBlast', 'AerialAce', 'GoalGetter', 'SpeedDemon'],
			game: 'Rocket League',
			rank: 5,
			trend: 'up',
			winRate: 76.3,
			matches: 22
		},
		{ 
			team: 'Apex Legends', 
			score: 920, 
			players: ['ApexPredator', 'SquadLeader', 'BattleRoyale', 'VictoryRoyale', 'Champion'],
			game: 'Apex Legends',
			rank: 6,
			trend: 'down',
			winRate: 71.8,
			matches: 25
		},
		{ 
			team: 'Pixel Warriors', 
			score: 890, 
			players: ['PixelPerfect', 'RetroGamer', 'ClassicKing', 'ArcadeAce', 'VintageVictory'],
			game: 'Minecraft',
			rank: 7,
			trend: 'up',
			winRate: 69.4,
			matches: 18
		},
		{ 
			team: 'Speed Demons', 
			score: 850, 
			players: ['SpeedRacer', 'TurboBoost', 'NitroRush', 'VelocityViper', 'RapidFire'],
			game: 'CS:GO',
			rank: 8,
			trend: 'down',
			winRate: 65.7,
			matches: 23
		}
	])

	useEffect(() => {
		const interval = setInterval(() => {
			setRows((prev) => {
				const updated = prev.map((r) => ({ 
					...r, 
					score: Math.max(0, r.score + Math.floor(Math.random() * 40 - 20)),
					winRate: Math.max(0, Math.min(100, r.winRate + (Math.random() * 2 - 1)))
				}))
				return [...updated].sort((a, b) => b.score - a.score).map((team, index) => ({
					...team,
					rank: index + 1
				}))
			})
		}, 3000)
		return () => clearInterval(interval)
	}, [])

	return (
		<div className="space-y-10 stagger-in">
			<div className="text-center space-y-4">
				<div className="inline-block px-4 py-1.5 rounded-full glass-premium text-neon-green text-[10px] font-display mb-2">
					Neural Network Rankings
				</div>
				<h2 className="text-4xl lg:text-6xl font-display neon-text-purple tracking-tighter">Live Leaderboard</h2>
				<p className="text-white/60 font-mono italic">Synchronizing combat data in real-time</p>
			</div>
			
			<div className="glass-vibrant rounded-[2.5rem] p-8 mb-10 overflow-hidden relative group">
				<div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/5 via-transparent to-purple-500/5 z-0" />
				<h3 className="text-lg font-display text-white/50 mb-6 text-center tracking-widest relative z-10">Elite Podium</h3>
				<div className="h-[45dvh] relative z-10">
					<LeaderboardVisualization />
				</div>
			</div>
			
			<div className="space-y-4">
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					{[
						{ label: 'Total Nodes', value: rows.length, color: 'text-neon-green' },
						{ label: 'Peak Voltage', value: rows[0]?.score || 0, color: 'text-neon-blue' },
						{ label: 'Avg Efficiency', value: `${Math.round(rows.reduce((acc, team) => acc + team.winRate, 0) / rows.length)}%`, color: 'text-neon-purple' },
						{ label: 'Combat cycles', value: rows.reduce((acc, team) => acc + team.matches, 0), color: 'text-cyber-orange' },
					].map((stat, i) => (
						<div key={i} className="glass-premium p-6 rounded-2xl text-center card-hover">
							<div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
							<div className="text-[10px] font-display text-white/30 tracking-widest">{stat.label}</div>
						</div>
					))}
				</div>
				
				<div className="space-y-3">
					{rows.map((team) => (
						<div key={team.team} className="glass-premium rounded-2xl p-5 hover-lift card-hover transition-all duration-500 border-white/5 group relative overflow-hidden">
							<div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							
							<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
								<div className="flex items-center space-x-6">
									<div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg transition-transform group-hover:scale-110 ${
										team.rank === 1 ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.4)]' :
										team.rank === 2 ? 'bg-gray-400 text-black shadow-[0_0_20px_rgba(156,163,175,0.4)]' :
										team.rank === 3 ? 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]' :
										'bg-white/5 text-white/40 border border-white/10'
									}`}>
										{team.rank}
									</div>
									<div className="space-y-1">
										<h3 className="text-xl font-display text-white/90 group-hover:text-white transition-colors tracking-tight">{team.team}</h3>
										<div className="flex items-center space-x-3 text-xs font-mono">
											<span className="text-neon-blue uppercase">{team.game}</span>
											<span className="text-white/20">|</span>
											<span className="text-white/40">{team.matches} Match Cycles</span>
										</div>
									</div>
								</div>
								
								<div className="flex items-center justify-between lg:justify-end gap-8 bg-black/20 p-4 rounded-xl lg:bg-transparent lg:p-0">
									<div className="text-center min-w-[60px]">
										<div className="text-2xl font-black text-neon-green tracking-tighter">{team.score}</div>
										<div className="text-[10px] text-white/30 uppercase font-display">Rating</div>
									</div>
									<div className="text-center min-w-[60px]">
										<div className="text-xl font-black text-neon-blue tracking-tighter">{team.winRate.toFixed(1)}%</div>
										<div className="text-[10px] text-white/30 uppercase font-display">Win Ratio</div>
									</div>
									<div className={`p-2 rounded-lg ${team.trend === 'up' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
										{team.trend === 'up' ? '↑' : '↓'}
									</div>
								</div>
							</div>
							
							<div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
								{team.players.map((player, playerIdx) => (
									<span key={playerIdx} className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-default">
										{player}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

