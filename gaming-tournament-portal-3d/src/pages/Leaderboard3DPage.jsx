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
				{/* Glowing effect */}
				<mesh position={[0, height/2, 0]}>
					<sphereGeometry args={[0.3, 16, 16]} />
					<meshBasicMaterial 
						color={color} 
						transparent 
						opacity={0.6}
					/>
				</mesh>
				<Text
					position={[0, height + 0.5, 0]}
					fontSize={0.2}
					color={color}
					anchorX="center"
					anchorY="middle"
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
			
			{/* Lighting */}
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
			
			{/* Podiums for top 3 teams */}
			<LeaderboardPodium position={[0, 0, 0]} rank={1} color="#ffd700" teamName="Neon Ninjas" />
			<LeaderboardPodium position={[-2, 0, 0]} rank={2} color="#c0c0c0" teamName="Quantum Quakes" />
			<LeaderboardPodium position={[2, 0, 0]} rank={3} color="#cd7f32" teamName="Cyber Spartans" />
			
			{/* Sparkles */}
			<Sparkles count={80} scale={8} size={1.5} speed={0.6} color="#39ff14" />
			<Sparkles count={60} scale={6} size={1} speed={0.8} color="#bc13fe" />
			
			{/* Ground */}
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial 
					color="#111111" 
					metalness={0.8} 
					roughness={0.2}
					emissive="#000011"
					emissiveIntensity={0.05}
				/>
			</mesh>
			
			<OrbitControls 
				enableDamping 
				dampingFactor={0.05}
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
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl md:text-4xl font-display neon-text">Live Leaderboard</h2>
				<p className="text-white/70">Real-time team rankings and statistics</p>
			</div>
			
			{/* 3D Leaderboard Visualization */}
			<div className="glass rounded-2xl p-6 mb-6">
				<h3 className="text-xl font-semibold mb-4 text-center">3D Podium</h3>
				<div className="h-[40dvh]">
					<LeaderboardVisualization />
				</div>
			</div>
			
			<div className="glass rounded-2xl p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
					<div className="glass rounded-xl p-4 text-center">
						<div className="text-2xl font-bold text-green-400">{rows.length}</div>
						<div className="text-white/70 text-sm">Total Teams</div>
					</div>
					<div className="glass rounded-xl p-4 text-center">
						<div className="text-2xl font-bold text-blue-400">{rows[0]?.score || 0}</div>
						<div className="text-white/70 text-sm">Highest Score</div>
					</div>
					<div className="glass rounded-xl p-4 text-center">
						<div className="text-2xl font-bold text-purple-400">{Math.round(rows.reduce((acc, team) => acc + team.winRate, 0) / rows.length)}%</div>
						<div className="text-white/70 text-sm">Avg Win Rate</div>
					</div>
					<div className="glass rounded-xl p-4 text-center">
						<div className="text-2xl font-bold text-yellow-400">{rows.reduce((acc, team) => acc + team.matches, 0)}</div>
						<div className="text-white/70 text-sm">Total Matches</div>
					</div>
				</div>
				
				<div className="space-y-3">
					{rows.map((team, idx) => (
						<div key={team.team} className="glass rounded-xl p-4 hover:scale-105 transition-all duration-300">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
										team.rank === 1 ? 'bg-yellow-500 text-black' :
										team.rank === 2 ? 'bg-gray-400 text-black' :
										team.rank === 3 ? 'bg-orange-600 text-white' :
										'bg-white/10 text-white'
									}`}>
										{team.rank}
									</div>
									<div>
										<h3 className="text-lg font-semibold text-white">{team.team}</h3>
										<div className="flex items-center space-x-2 text-sm text-white/70">
											<span>{team.game}</span>
											<span>•</span>
											<span>{team.matches} matches</span>
										</div>
									</div>
								</div>
								
								<div className="flex items-center space-x-6">
									<div className="text-center">
										<div className="text-2xl font-bold text-green-400">{team.score}</div>
										<div className="text-xs text-white/50">Score</div>
									</div>
									<div className="text-center">
										<div className="text-lg font-bold text-blue-400">{team.winRate.toFixed(1)}%</div>
										<div className="text-xs text-white/50">Win Rate</div>
									</div>
									<div className="flex items-center space-x-1">
										<span className={`text-sm ${team.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
											{team.trend === 'up' ? '↗' : '↘'}
										</span>
									</div>
								</div>
							</div>
							
							<div className="mt-3 pt-3 border-t border-white/10">
								<div className="flex flex-wrap gap-2">
									{team.players.map((player, playerIdx) => (
										<span key={playerIdx} className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
											{player}
										</span>
									))}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

