import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function DashboardCube({ color = '#39ff14', position, title }) {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.y = state.clock.elapsedTime * 0.3
			ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
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
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial 
					color={color} 
					metalness={0.8} 
					roughness={0.2} 
					emissive={color} 
					emissiveIntensity={hovered ? 0.4 : 0.1}
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
					{title}
				</Text>
			)}
		</group>
	)
}

export default function OrganizerDashboard3D() {
	const [activeTab, setActiveTab] = useState('overview')
	
	const tournaments = [
		{
			id: 1,
			name: 'Neon Clash Championship',
			game: 'Valorant',
			status: 'Live',
			participants: 128,
			prizePool: 25000,
			startDate: '2024-01-15',
			endDate: '2024-01-20',
			matches: 64,
			completed: 32
		},
		{
			id: 2,
			name: 'Quantum Royale',
			game: 'Fortnite',
			status: 'Upcoming',
			participants: 256,
			prizePool: 15000,
			startDate: '2024-01-25',
			endDate: '2024-01-30',
			matches: 128,
			completed: 0
		},
		{
			id: 3,
			name: 'Cyber Arena Masters',
			game: 'League of Legends',
			status: 'Registration',
			participants: 64,
			prizePool: 20000,
			startDate: '2024-02-01',
			endDate: '2024-02-05',
			matches: 32,
			completed: 0
		}
	]
	
	const stats = {
		totalTournaments: 12,
		activeTournaments: 3,
		totalParticipants: 1847,
		totalPrizePool: 150000,
		completedMatches: 156,
		upcomingMatches: 89
	}
	
	return (
		<div className="space-y-6">
			<div className="text-center space-y-2">
				<h2 className="text-3xl md:text-4xl font-display neon-text">Organizer Dashboard</h2>
				<p className="text-white/70">Manage tournaments, teams, and matches</p>
			</div>
			
			{/* 3D Dashboard Visualization */}
			<div className="glass rounded-2xl p-6">
				<h3 className="text-xl font-semibold mb-4 text-center">3D Management Hub</h3>
				<div className="h-[40dvh]">
					<Canvas gl={{ antialias: true, powerPreference: 'high-performance' }} dpr={[1, 2]} camera={{ position: [3, 2, 5], fov: 50 }}>
						<ambientLight intensity={0.6} />
						<spotLight position={[5, 8, 5]} angle={0.4} intensity={1.2} castShadow />
						<pointLight position={[-3, 3, -3]} intensity={0.8} color="#39ff14" />
						<pointLight position={[3, 3, 3]} intensity={0.6} color="#bc13fe" />
						
						<DashboardCube color="#39ff14" position={[-2, 0, 0]} title="Tournaments" />
						<DashboardCube color="#bc13fe" position={[0, 0, 0]} title="Teams" />
						<DashboardCube color="#00e5ff" position={[2, 0, 0]} title="Matches" />
						
						<OrbitControls enableDamping autoRotate autoRotateSpeed={0.2} />
					</Canvas>
				</div>
			</div>
			
			{/* Stats Overview */}
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-green-400">{stats.totalTournaments}</div>
					<div className="text-white/70 text-sm">Total Tournaments</div>
				</div>
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-blue-400">{stats.activeTournaments}</div>
					<div className="text-white/70 text-sm">Active</div>
				</div>
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-purple-400">{stats.totalParticipants}</div>
					<div className="text-white/70 text-sm">Participants</div>
				</div>
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-yellow-400">${stats.totalPrizePool.toLocaleString()}</div>
					<div className="text-white/70 text-sm">Prize Pool</div>
				</div>
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-red-400">{stats.completedMatches}</div>
					<div className="text-white/70 text-sm">Completed</div>
				</div>
				<div className="glass rounded-xl p-4 text-center">
					<div className="text-2xl font-bold text-orange-400">{stats.upcomingMatches}</div>
					<div className="text-white/70 text-sm">Upcoming</div>
				</div>
			</div>
			
			{/* Tournament Management */}
			<div className="glass rounded-2xl p-6">
				<div className="flex items-center justify-between mb-6">
					<h3 className="text-xl font-semibold text-white">Tournament Management</h3>
					<button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
						+ Create Tournament
					</button>
				</div>
				
				<div className="space-y-4">
					{tournaments.map((tournament) => (
						<div key={tournament.id} className="glass rounded-xl p-4 hover:scale-105 transition-all duration-300">
							<div className="flex items-center justify-between">
								<div className="flex items-center space-x-4">
									<div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
										<span className="text-2xl">🎮</span>
									</div>
									<div>
										<h4 className="text-lg font-semibold text-white">{tournament.name}</h4>
										<p className="text-white/70 text-sm">{tournament.game} • {tournament.participants} participants</p>
									</div>
								</div>
								
								<div className="flex items-center space-x-6">
									<div className="text-center">
										<div className="text-sm font-bold text-green-400">${tournament.prizePool.toLocaleString()}</div>
										<div className="text-xs text-white/50">Prize Pool</div>
									</div>
									<div className="text-center">
										<div className="text-sm font-bold text-blue-400">{tournament.completed}/{tournament.matches}</div>
										<div className="text-xs text-white/50">Matches</div>
									</div>
									<span className={`px-3 py-1 rounded-full text-xs font-medium ${
										tournament.status === 'Live' ? 'bg-red-500/20 text-red-400' :
										tournament.status === 'Upcoming' ? 'bg-yellow-500/20 text-yellow-400' :
										'bg-blue-500/20 text-blue-400'
									}`}>
										{tournament.status}
									</span>
									<div className="flex space-x-2">
										<button className="px-3 py-1 bg-white/10 text-white/70 rounded text-sm hover:bg-white/20 transition-colors">
											Edit
										</button>
										<button className="px-3 py-1 bg-white/10 text-white/70 rounded text-sm hover:bg-white/20 transition-colors">
											View
										</button>
									</div>
								</div>
							</div>
							
							<div className="mt-3 pt-3 border-t border-white/10">
								<div className="flex items-center justify-between text-sm text-white/60">
									<span>Start: {tournament.startDate}</span>
									<span>End: {tournament.endDate}</span>
									<div className="flex items-center space-x-2">
										<div className="w-2 h-2 bg-green-400 rounded-full"></div>
										<span>Progress: {Math.round((tournament.completed / tournament.matches) * 100)}%</span>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			
			{/* Quick Actions */}
			<div className="grid md:grid-cols-3 gap-4">
				<div className="glass rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
					<div className="text-3xl mb-2">🏆</div>
					<h4 className="font-semibold text-white mb-2">Create Tournament</h4>
					<p className="text-white/70 text-sm">Set up a new competitive tournament</p>
				</div>
				<div className="glass rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
					<div className="text-3xl mb-2">👥</div>
					<h4 className="font-semibold text-white mb-2">Manage Teams</h4>
					<p className="text-white/70 text-sm">Add, edit, or remove teams</p>
				</div>
				<div className="glass rounded-xl p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
					<div className="text-3xl mb-2">📊</div>
					<h4 className="font-semibold text-white mb-2">View Analytics</h4>
					<p className="text-white/70 text-sm">Tournament performance metrics</p>
				</div>
			</div>
		</div>
	)
}

