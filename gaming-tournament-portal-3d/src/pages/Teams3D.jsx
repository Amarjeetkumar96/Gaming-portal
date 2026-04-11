import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Avatar({ color = '#bc13fe', position }) {
	return (
		<mesh position={position} castShadow receiveShadow>
			<sphereGeometry args={[0.6, 32, 32]} />
			<meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
		</mesh>
	)
}

export default function Teams3D() {
	const teams = [
		{ 
			name: 'Neon Ninjas', 
			color: '#39ff14',
			game: 'Valorant',
			players: 5,
			rank: 1,
			winRate: 87.5,
			matches: 24,
			prizeMoney: '$45,000',
			established: '2023',
			description: 'Elite tactical shooter specialists with unmatched precision and strategy.',
			achievements: ['Championship Winner 2024', 'Regional Champions', 'Best Team Strategy']
		},
		{ 
			name: 'Quantum Quakes', 
			color: '#bc13fe',
			game: 'League of Legends',
			players: 5,
			rank: 2,
			winRate: 82.1,
			matches: 28,
			prizeMoney: '$38,000',
			established: '2022',
			description: 'Strategic MOBA masters known for their innovative gameplay and teamwork.',
			achievements: ['World Championship Runner-up', 'Mid-Season Champions', 'Most Improved Team']
		},
		{ 
			name: 'Cyber Spartans', 
			color: '#00e5ff',
			game: 'Fortnite',
			players: 4,
			rank: 3,
			winRate: 78.9,
			matches: 19,
			prizeMoney: '$32,000',
			established: '2023',
			description: 'Battle royale warriors with exceptional building and combat skills.',
			achievements: ['Fortnite Cup Winners', 'Builder Champions', 'Solo Victory Leaders']
		},
		{ 
			name: 'Dragon Masters', 
			color: '#ff6b35',
			game: 'Street Fighter VI',
			players: 3,
			rank: 4,
			winRate: 85.2,
			matches: 27,
			prizeMoney: '$28,000',
			established: '2021',
			description: 'Fighting game legends with lightning-fast reflexes and perfect execution.',
			achievements: ['EVO Champions', 'Combo Masters', 'Perfect Victory Streak']
		},
		{ 
			name: 'Rocket Rebels', 
			color: '#ffd700',
			game: 'Rocket League',
			players: 3,
			rank: 5,
			winRate: 76.3,
			matches: 22,
			prizeMoney: '$25,000',
			established: '2022',
			description: 'Aerial acrobats of the digital soccer field with incredible ball control.',
			achievements: ['Rocket League Cup Winners', 'Aerial Masters', 'Goal Scoring Champions']
		},
		{ 
			name: 'Apex Legends', 
			color: '#ff1493',
			game: 'Apex Legends',
			players: 3,
			rank: 6,
			winRate: 71.8,
			matches: 25,
			prizeMoney: '$22,000',
			established: '2023',
			description: 'Squad-based battle royale experts with exceptional teamwork and survival skills.',
			achievements: ['Apex Championship Winners', 'Squad Champions', 'Survival Masters']
		}
	]
	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl md:text-4xl font-display neon-text">Elite Teams</h2>
				<p className="text-white/70">Meet the top competitive gaming teams</p>
			</div>
			
			<div className="grid md:grid-cols-2 gap-6">
				<div className="glass rounded-2xl p-6">
					<h3 className="text-xl font-semibold mb-4 text-center">3D Team Arena</h3>
					<div className="h-[50dvh]">
						<Canvas gl={{ antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]} camera={{ position: [4, 3, 6], fov: 50 }}>
							<ambientLight intensity={0.6} />
							<spotLight position={[6, 8, 4]} angle={0.3} intensity={1.3} castShadow />
							<pointLight position={[-5, 5, -5]} intensity={0.8} color="#39ff14" />
							<pointLight position={[5, 5, 5]} intensity={0.6} color="#bc13fe" />
							{teams.map((t, i) => (
								<Avatar key={i} color={t.color} position={[i * 2.5 - 6.25, 0, 0]} />
							))}
							<OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />
						</Canvas>
					</div>
				</div>
				
				<div className="space-y-4">
					{teams.map((team, i) => (
						<div key={i} className="glass rounded-xl p-4 hover:scale-105 transition-all duration-300">
							<div className="flex items-center justify-between mb-3">
								<div className="flex items-center space-x-3">
									<div 
										className="w-4 h-4 rounded-full pulse-glow" 
										style={{ backgroundColor: team.color }}
									></div>
									<h3 className="text-lg font-semibold" style={{ color: team.color }}>
										{team.name}
									</h3>
									<span className="px-2 py-1 bg-white/10 rounded text-xs text-white/70">
										#{team.rank}
									</span>
								</div>
								<div className="text-right">
									<div className="text-sm font-bold text-green-400">{team.prizeMoney}</div>
									<div className="text-xs text-white/50">Prize Money</div>
								</div>
							</div>
							
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Game:</span>
									<span className="text-white font-medium">{team.game}</span>
								</div>
								
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Players:</span>
									<span className="text-white font-medium">{team.players}</span>
								</div>
								
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Win Rate:</span>
									<span className="text-blue-400 font-medium">{team.winRate}%</span>
								</div>
								
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Matches:</span>
									<span className="text-white font-medium">{team.matches}</span>
								</div>
								
								<div className="flex items-center justify-between text-sm">
									<span className="text-white/60">Established:</span>
									<span className="text-white font-medium">{team.established}</span>
								</div>
								
								<p className="text-white/70 text-sm mt-2">{team.description}</p>
								
								<div className="mt-3 pt-2 border-t border-white/10">
									<div className="text-xs text-white/50 mb-2">Achievements:</div>
									<div className="flex flex-wrap gap-1">
										{team.achievements.map((achievement, idx) => (
											<span key={idx} className="px-2 py-1 bg-white/5 rounded text-xs text-white/70">
												{achievement}
											</span>
										))}
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

