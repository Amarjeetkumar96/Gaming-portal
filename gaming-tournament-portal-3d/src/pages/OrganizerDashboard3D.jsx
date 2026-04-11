import { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment, Stars, Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import { useNotifications } from '../context/NotificationContext'

function DataNode({ position, color, label, size = 1 }) {
	const ref = useRef()
	const [hovered, setHovered] = useState(false)
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1
			ref.current.rotation.y = state.clock.elapsedTime * 0.5
		}
	})
	
	return (
		<Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
			<group position={position}>
				<mesh 
					ref={ref}
					onPointerOver={() => setHovered(true)}
					onPointerOut={() => setHovered(false)}
					aria-label={label}
				>
					<octahedronGeometry args={[size * 0.5]} />
					<meshStandardMaterial 
						color={color} 
						metalness={0.9} 
						roughness={0.1}
						emissive={color}
						emissiveIntensity={hovered ? 0.8 : 0.3}
					/>
				</mesh>
				<mesh position={[0, -0.8, 0]}>
					<cylinderGeometry args={[0.02, 0.02, 1.5]} />
					<meshBasicMaterial color={color} transparent opacity={0.2} />
				</mesh>
			</group>
		</Float>
	)
}

function DashboardVisual() {
	return (
		<Canvas 
			gl={{ antialias: true }} 
			dpr={[1, 2]} 
			camera={{ position: [6, 4, 8], fov: 45 }}
		>
			<color attach="background" args={['#000000']} />
			<Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
			
			<ambientLight intensity={0.4} />
			<pointLight position={[10, 10, 10]} intensity={1.5} color="#bc13fe" />
			<pointLight position={[-10, 5, -10]} intensity={1} color="#00e5ff" />
			
			<DataNode position={[0, 0, 0]} color="#39ff14" label="Main Core" size={1.5} />
			<DataNode position={[-3, 1, 2]} color="#bc13fe" label="User Logic" />
			<DataNode position={[3, -1, -2]} color="#00e5ff" label="Match Engine" />
			<DataNode position={[2, 2, 3]} color="#ff6b35" label="Auth Socket" />
			
			<Sparkles count={100} scale={10} size={2} speed={0.5} color="#39ff14" />
			
			<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
				<planeGeometry args={[30, 30, 30, 30]} />
				<meshBasicMaterial color="#39ff14" transparent opacity={0.05} wireframe />
			</mesh>
			
			<OrbitControls enableDamping autoRotate autoRotateSpeed={0.5} />
			<Environment preset="night" />
		</Canvas>
	)
}

export default function OrganizerDashboard3D() {
	const { addNotification } = useNotifications()
	const stats = [
		{ label: 'Active Servers', value: '12', trend: '+2', color: 'text-neon-green' },
		{ label: 'Global Load', value: '42%', trend: '-5%', color: 'text-neon-blue' },
		{ label: 'Neural Uplinks', value: '8.4k', trend: '+1.2k', color: 'text-neon-purple' },
		{ label: 'System Health', value: '99.9%', trend: 'Stable', color: 'text-cyber-cyan' }
	]

	const handleAction = (action) => {
		addNotification({
			title: 'Command Executed',
			message: `System protocol: ${action} initialized successfully.`,
			type: 'success'
		})
	}

	return (
		<div className="space-y-10 stagger-in">
			<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-2">
				<div className="space-y-2">
					<div className="flex items-center gap-3">
						<div className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
						<span className="text-neon-green text-[10px] font-display tracking-[0.3em] uppercase">System Live</span>
					</div>
					<h2 className="text-4xl lg:text-5xl font-display tracking-tight">Staff <span className="gradient-text">Control Center</span></h2>
				</div>
				<div className="flex gap-3">
					<button 
						onClick={() => handleAction('DIAGNOSTICS')}
						className="glass-premium px-6 py-2.5 rounded-xl text-xs font-display hover:text-neon-blue transition-all border-white/5"
					>
						Full Diagnostics
					</button>
					<button 
						onClick={() => handleAction('SYSTEM PURGE')}
						className="bg-cyber-pink/20 text-cyber-pink px-6 py-2.5 rounded-xl text-xs font-display hover:bg-cyber-pink/30 transition-all border border-cyber-pink/20"
					>
						Emergency Purge
					</button>
				</div>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat, i) => (
					<div key={i} className="glass-premium p-6 rounded-2xl border-white/5 card-hover relative overflow-hidden group">
						<div className="absolute top-0 right-0 w-24 h-24 bg-white/5 blur-2xl -z-10 group-hover:bg-white/10 transition-colors" />
						<div className="text-[10px] font-display text-white/30 tracking-widest uppercase mb-2">{stat.label}</div>
						<div className={`text-3xl font-black ${stat.color} tracking-tighter`}>{stat.value}</div>
						<div className="mt-2 text-[10px] font-mono text-white/20">
							Trend: <span className={stat.trend.startsWith('+') ? 'text-neon-green' : 'text-white/40'}>{stat.trend}</span>
						</div>
					</div>
				))}
			</div>

			<div className="grid lg:grid-cols-3 gap-6">
				<div className="lg:col-span-2 glass-vibrant rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden h-[500px]">
					<div className="absolute top-8 left-8 z-10 space-y-1">
						<h3 className="text-sm font-display tracking-widest text-white/40">Neural Core Visualization</h3>
						<p className="text-xs text-white/20 font-mono italic text-nowrap">Real-time node map of tournament infrastructure</p>
					</div>
					<div className="absolute inset-0 pointer-events-auto">
						<DashboardVisual />
					</div>
				</div>

				<div className="space-y-6">
					<div className="glass-premium rounded-3xl p-8 border-white/5 h-full">
						<h3 className="text-sm font-display tracking-widest text-white/40 mb-8 border-b border-white/5 pb-4">Protocol Queue</h3>
						<div className="space-y-6">
							{[
								{ id: 'T-992', status: 'deploying', time: '2m ago' },
								{ id: 'M-441', status: 'verified', time: '12m ago' },
								{ id: 'S-772', status: 'stabilized', time: '45m ago' },
								{ id: 'U-102', status: 'failed', time: '1h ago' },
								{ id: 'R-229', status: 'queued', time: '2h ago' }
							].map((item, i) => (
								<div key={i} className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
									<div className="flex items-center gap-4">
										<div className={`w-1.5 h-1.5 rounded-full ${
											item.status === 'failed' ? 'bg-cyber-pink shadow-[0_0_10px_rgba(255,20,147,0.5)]' : 
											item.status === 'deploying' ? 'bg-neon-blue animate-pulse' : 'bg-neon-green'
										}`} />
										<div className="space-y-0.5">
											<div className="text-xs font-mono text-white/90">PROCESS_{item.id}</div>
											<div className="text-[10px] text-white/20 uppercase tracking-tighter">{item.status}</div>
										</div>
									</div>
									<div className="text-right">
										<div className="text-[9px] text-white/20 font-mono">{item.time}</div>
									</div>
								</div>
							))}
						</div>
						
						<button 
							onClick={() => handleAction('QUEUE_OPTIMIZATION')}
							className="w-full mt-10 py-3 rounded-xl border border-white/5 hover:border-white/10 glass bg-white/5 text-[10px] font-display tracking-widest uppercase hover:bg-white/10 transition-all"
						>
							Optimize Clusters
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
