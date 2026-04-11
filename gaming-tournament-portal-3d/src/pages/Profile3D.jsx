import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function PlayerAvatar({ color = '#39ff14', position }) {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.y = state.clock.elapsedTime * 0.5
			ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
		}
	})
	
	return (
		<group position={position}>
			<mesh 
				ref={ref} 
				castShadow 
				receiveShadow
				onPointerOver={() => setHovered(true)}
				onPointerOut={() => setHovered(false)}
			>
				<sphereGeometry args={[0.8, 32, 32]} />
				<meshStandardMaterial 
					color={color} 
					metalness={0.8} 
					roughness={0.2} 
					emissive={color} 
					emissiveIntensity={hovered ? 0.3 : 0.1}
				/>
			</mesh>
			{hovered && (
				<Text
					position={[0, 1.5, 0]}
					fontSize={0.2}
					color={color}
					anchorX="center"
					anchorY="middle"
				>
					Player
				</Text>
			)}
		</group>
	)
}

export default function Profile3D() {
	const [selectedPlayer, setSelectedPlayer] = useState(0)
	
	const players = [
		{
			name: 'ShadowStrike',
			team: 'Neon Ninjas',
			color: '#39ff14',
			game: 'Valorant',
			rank: 1,
			level: 85,
			winRate: 87.5,
			matches: 156,
			killDeathRatio: 2.3,
			headshotPercentage: 68.2,
			avgScore: 1280,
			achievements: ['Champion 2024', 'MVP x12', 'Perfect Game x5'],
			recentMatches: [
				{ opponent: 'Quantum Quakes', result: 'W', score: '13-8' },
				{ opponent: 'Cyber Spartans', result: 'W', score: '13-6' },
				{ opponent: 'Dragon Masters', result: 'L', score: '11-13' }
			]
		},
		{
			name: 'ThunderBolt',
			team: 'Quantum Quakes',
			color: '#bc13fe',
			game: 'League of Legends',
			rank: 2,
			level: 78,
			winRate: 82.1,
			matches: 203,
			killDeathRatio: 3.1,
			headshotPercentage: 72.5,
			avgScore: 1160,
			achievements: ['World Runner-up', 'MVP x8', 'Pentakill x3'],
			recentMatches: [
				{ opponent: 'Neon Ninjas', result: 'L', score: '8-13' },
				{ opponent: 'Cyber Spartans', result: 'W', score: '13-9' },
				{ opponent: 'Rocket Rebels', result: 'W', score: '13-4' }
			]
		},
		{
			name: 'SpartanKing',
			team: 'Cyber Spartans',
			color: '#00e5ff',
			game: 'Fortnite',
			rank: 3,
			level: 72,
			winRate: 78.9,
			matches: 189,
			killDeathRatio: 1.9,
			headshotPercentage: 65.8,
			avgScore: 1100,
			achievements: ['Fortnite Cup Winner', 'Builder Master', 'Victory Royale x45'],
			recentMatches: [
				{ opponent: 'Neon Ninjas', result: 'L', score: '6-13' },
				{ opponent: 'Quantum Quakes', result: 'L', score: '9-13' },
				{ opponent: 'Apex Legends', result: 'W', score: '13-7' }
			]
		}
	]
	
	const currentPlayer = players[selectedPlayer]
	
	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl md:text-4xl font-display neon-text">Player Profiles</h2>
				<p className="text-white/70">View detailed player statistics and achievements</p>
			</div>
			
			<div className="grid md:grid-cols-2 gap-6">
				{/* 3D Player Avatar */}
				<div className="glass rounded-2xl p-6">
					<h3 className="text-xl font-semibold mb-4 text-center">3D Player Arena</h3>
					<div className="h-[50dvh]">
						<Canvas gl={{ antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]} camera={{ position: [0, 2, 4], fov: 50 }}>
							<ambientLight intensity={0.6} />
							<spotLight position={[5, 8, 5]} angle={0.4} intensity={1.2} castShadow />
							<pointLight position={[-3, 3, -3]} intensity={0.8} color={currentPlayer.color} />
							<PlayerAvatar color={currentPlayer.color} position={[0, 0, 0]} />
							<OrbitControls enableDamping autoRotate autoRotateSpeed={0.3} />
						</Canvas>
					</div>
				</div>
				
				{/* Player Selection */}
				<div className="space-y-4">
					<div className="glass rounded-xl p-4">
						<h3 className="text-lg font-semibold mb-3">Select Player</h3>
						<div className="grid grid-cols-1 gap-2">
							{players.map((player, i) => (
								<button
									key={i}
									onClick={() => setSelectedPlayer(i)}
									className={`p-3 rounded-lg text-left transition-all duration-300 ${
										selectedPlayer === i 
											? 'bg-white/20 border-2' 
											: 'bg-white/5 hover:bg-white/10'
									}`}
									style={{ borderColor: selectedPlayer === i ? player.color : 'transparent' }}
								>
									<div className="flex items-center space-x-3">
										<div 
											className="w-3 h-3 rounded-full" 
											style={{ backgroundColor: player.color }}
										></div>
										<div>
											<div className="font-medium text-white">{player.name}</div>
											<div className="text-sm text-white/70">{player.team} • {player.game}</div>
										</div>
									</div>
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			
			{/* Player Details */}
			<div className="glass rounded-2xl p-6">
				<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{/* Basic Info */}
					<div className="space-y-4">
						<div>
							<h3 className="text-2xl font-bold" style={{ color: currentPlayer.color }}>
								{currentPlayer.name}
							</h3>
							<p className="text-white/70">{currentPlayer.team} • {currentPlayer.game}</p>
						</div>
						
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-white/60">Rank:</span>
								<span className="text-white font-medium">#{currentPlayer.rank}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-white/60">Level:</span>
								<span className="text-white font-medium">{currentPlayer.level}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-white/60">Win Rate:</span>
								<span className="text-green-400 font-medium">{currentPlayer.winRate}%</span>
							</div>
							<div className="flex justify-between">
								<span className="text-white/60">Matches:</span>
								<span className="text-white font-medium">{currentPlayer.matches}</span>
							</div>
						</div>
					</div>
					
					{/* Stats */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-white">Statistics</h4>
						<div className="space-y-2">
							<div className="flex justify-between">
								<span className="text-white/60">K/D Ratio:</span>
								<span className="text-blue-400 font-medium">{currentPlayer.killDeathRatio}</span>
							</div>
							<div className="flex justify-between">
								<span className="text-white/60">Headshot %:</span>
								<span className="text-purple-400 font-medium">{currentPlayer.headshotPercentage}%</span>
							</div>
							<div className="flex justify-between">
								<span className="text-white/60">Avg Score:</span>
								<span className="text-yellow-400 font-medium">{currentPlayer.avgScore}</span>
							</div>
						</div>
					</div>
					
					{/* Achievements */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-white">Achievements</h4>
						<div className="space-y-2">
							{currentPlayer.achievements.map((achievement, i) => (
								<div key={i} className="px-3 py-2 bg-white/5 rounded text-sm text-white/80">
									{achievement}
								</div>
							))}
						</div>
					</div>
					
					{/* Recent Matches */}
					<div className="space-y-4">
						<h4 className="text-lg font-semibold text-white">Recent Matches</h4>
						<div className="space-y-2">
							{currentPlayer.recentMatches.map((match, i) => (
								<div key={i} className="flex items-center justify-between p-2 bg-white/5 rounded">
									<span className="text-white/80">{match.opponent}</span>
									<div className="flex items-center space-x-2">
										<span className={`px-2 py-1 rounded text-xs ${
											match.result === 'W' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
										}`}>
											{match.result}
										</span>
										<span className="text-white/60 text-sm">{match.score}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

