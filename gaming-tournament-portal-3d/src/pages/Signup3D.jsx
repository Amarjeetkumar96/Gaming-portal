import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Stars, Float, Sparkles, Cloud } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'

function FloatingSphere({ position, color, speed = 1 }) {
	const ref = useRef()
	
	useFrame((state) => {
		if (ref.current) {
			ref.current.rotation.x = state.clock.elapsedTime * speed
			ref.current.rotation.y = state.clock.elapsedTime * speed * 0.5
			ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.4
		}
	})
	
	return (
		<Float speed={speed} rotationIntensity={0.3} floatIntensity={0.4}>
			<mesh ref={ref} position={position} castShadow>
				<sphereGeometry args={[0.6, 32, 32]} />
				<meshStandardMaterial 
					color={color} 
					metalness={0.8} 
					roughness={0.2}
					emissive={color}
					emissiveIntensity={0.4}
				/>
			</mesh>
		</Float>
	)
}

function SignupPortal() {
	const portalRef = useRef()
	
	useFrame((state) => {
		if (portalRef.current) {
			portalRef.current.rotation.y = state.clock.elapsedTime * 0.3
			portalRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
		}
	})
	
	return (
		<group ref={portalRef}>
			{/* Outer Portal Ring */}
			<mesh position={[0, 0, 0]}>
				<torusGeometry args={[4, 0.3, 16, 100]} />
				<meshBasicMaterial 
					color="#bc13fe" 
					transparent 
					opacity={0.9}
				/>
			</mesh>
			
			{/* Middle Portal Ring */}
			<mesh position={[0, 0, 0]}>
				<torusGeometry args={[3, 0.2, 16, 100]} />
				<meshBasicMaterial 
					color="#39ff14" 
					transparent 
					opacity={0.7}
				/>
			</mesh>
			
			{/* Inner Portal Ring */}
			<mesh position={[0, 0, 0]}>
				<torusGeometry args={[2, 0.1, 16, 100]} />
				<meshBasicMaterial 
					color="#00e5ff" 
					transparent 
					opacity={0.5}
				/>
			</mesh>
			
			{/* Portal Energy Core */}
			<mesh position={[0, 0, 0]}>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshBasicMaterial 
					color="#ffffff" 
					transparent 
					opacity={0.3}
				/>
			</mesh>
		</group>
	)
}

export default function Signup3D() {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		gamePreference: '',
		agreeToTerms: false
	})
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState({})
	
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData({
			...formData,
			[name]: type === 'checkbox' ? checked : value
		})
		
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors({
				...errors,
				[name]: ''
			})
		}
	}
	
	const validateForm = () => {
		const newErrors = {}
		
		if (!formData.username.trim()) {
			newErrors.username = 'Username is required'
		} else if (formData.username.length < 3) {
			newErrors.username = 'Username must be at least 3 characters'
		}
		
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required'
		} else if (!/\S+@\S+\.\S+/.test(formData.email)) {
			newErrors.email = 'Email is invalid'
		}
		
		if (!formData.password) {
			newErrors.password = 'Password is required'
		} else if (formData.password.length < 6) {
			newErrors.password = 'Password must be at least 6 characters'
		}
		
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match'
		}
		
		if (!formData.gamePreference) {
			newErrors.gamePreference = 'Please select a game preference'
		}
		
		if (!formData.agreeToTerms) {
			newErrors.agreeToTerms = 'You must agree to the terms and conditions'
		}
		
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		
		if (!validateForm()) {
			return
		}
		
		setIsLoading(true)
		
		// Simulate signup process
		setTimeout(() => {
			setIsLoading(false)
			// Handle signup logic here
			console.log('Signup attempt:', formData)
		}, 2000)
	}
	
	return (
		<div className="min-h-screen flex items-center justify-center relative overflow-hidden">
			{/* 3D Background */}
			<div className="absolute inset-0 z-0">
				<Canvas 
					gl={{ 
						antialias: true, 
						powerPreference: 'high-performance',
						toneMapping: THREE.ACESFilmicToneMapping,
						toneMappingExposure: 1.2
					}} 
					dpr={[1, 2]} 
					camera={{ position: [0, 2, 8], fov: 50 }}
					shadows
				>
					<color attach="background" args={['#000000']} />
					<Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
					
					{/* Advanced Lighting */}
					<ambientLight intensity={0.4} color="#ffffff" />
					<directionalLight 
						position={[10, 10, 5]} 
						intensity={1.5} 
						color="#bc13fe" 
						castShadow
						shadow-mapSize={[4096, 4096]}
					/>
					<pointLight position={[-5, 5, -5]} intensity={1.0} color="#39ff14" />
					<pointLight position={[5, 5, 5]} intensity={1.0} color="#00e5ff" />
					
					{/* Floating Spheres */}
					<FloatingSphere position={[-5, 1, -3]} color="#bc13fe" speed={0.7} />
					<FloatingSphere position={[5, 1, -3]} color="#39ff14" speed={1.1} />
					<FloatingSphere position={[-4, 2, 3]} color="#00e5ff" speed={0.5} />
					<FloatingSphere position={[4, 2, 3]} color="#ff6b35" speed={0.9} />
					<FloatingSphere position={[0, 3, -2]} color="#ffd700" speed={0.8} />
					
					{/* Signup Portal */}
					<SignupPortal />
					
					{/* Sparkles */}
					<Sparkles count={120} scale={8} size={2} speed={0.5} color="#bc13fe" />
					<Sparkles count={100} scale={6} size={1.5} speed={0.7} color="#39ff14" />
					<Sparkles count={80} scale={4} size={1} speed={0.9} color="#00e5ff" />
					
					{/* Atmospheric Cloud */}
					<Cloud
						opacity={0.05}
						speed={0.2}
						width={20}
						depth={20}
						segments={20}
						color="#bc13fe"
					/>
					
					{/* Ground Plane */}
					<mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]} receiveShadow>
						<planeGeometry args={[40, 40]} />
						<meshStandardMaterial 
							color="#0a0a0a" 
							metalness={0.9} 
							roughness={0.1}
							emissive="#001122"
							emissiveIntensity={0.02}
						/>
					</mesh>
					
					<OrbitControls 
						enableDamping 
						dampingFactor={0.05}
						autoRotate
						autoRotateSpeed={0.3}
						maxPolarAngle={Math.PI / 2}
						minDistance={5}
						maxDistance={15}
					/>
				</Canvas>
			</div>
			
			{/* Signup Form */}
			<div className="relative z-10 w-full max-w-lg mx-auto px-6">
				<div className="glass rounded-2xl p-8 relative overflow-hidden">
					{/* Background Gradient */}
					<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-green-900/20 to-blue-900/20 z-10 pointer-events-none"></div>
					
					{/* Form Content */}
					<div className="relative z-20">
						{/* Header */}
						<div className="text-center mb-8">
							<h1 className="text-4xl font-display neon-text mb-2">Join Ranbhumi</h1>
							<p className="text-white/70">Create your gaming identity</p>
						</div>
						
						{/* Signup Form */}
						<form onSubmit={handleSubmit} className="space-y-5">
							{/* Username Field */}
							<div>
								<label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									value={formData.username}
									onChange={handleChange}
									required
									className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.username 
											? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
											: 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
									}`}
									placeholder="Choose a unique username"
								/>
								{errors.username && <p className="text-red-400 text-xs mt-1">{errors.username}</p>}
							</div>
							
							{/* Email Field */}
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.email 
											? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
											: 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
									}`}
									placeholder="Enter your email"
								/>
								{errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
							</div>
							
							{/* Password Fields */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
										Password
									</label>
									<input
										type="password"
										id="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
											errors.password 
												? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
												: 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
										}`}
										placeholder="Create password"
									/>
									{errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
								</div>
								
								<div>
									<label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
										Confirm Password
									</label>
									<input
										type="password"
										id="confirmPassword"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleChange}
										required
										className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
											errors.confirmPassword 
												? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
												: 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
										}`}
										placeholder="Confirm password"
									/>
									{errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
								</div>
							</div>
							
							{/* Game Preference */}
							<div>
								<label htmlFor="gamePreference" className="block text-sm font-medium text-white/80 mb-2">
									Favorite Game
								</label>
								<select
									id="gamePreference"
									name="gamePreference"
									value={formData.gamePreference}
									onChange={handleChange}
									required
									className={`w-full px-4 py-3 bg-black/30 border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
										errors.gamePreference 
											? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
											: 'border-white/20 focus:border-purple-400 focus:ring-purple-400/20'
									}`}
								>
									<option value="">Select your favorite game</option>
									<option value="valorant">Valorant</option>
									<option value="fortnite">Fortnite</option>
									<option value="league-of-legends">League of Legends</option>
									<option value="street-fighter">Street Fighter VI</option>
									<option value="rocket-league">Rocket League</option>
									<option value="apex-legends">Apex Legends</option>
									<option value="csgo">Counter-Strike 2</option>
									<option value="dota2">Dota 2</option>
								</select>
								{errors.gamePreference && <p className="text-red-400 text-xs mt-1">{errors.gamePreference}</p>}
							</div>
							
							{/* Terms and Conditions */}
							<div>
								<label className="flex items-start">
									<input 
										type="checkbox" 
										name="agreeToTerms"
										checked={formData.agreeToTerms}
										onChange={handleChange}
										className="w-4 h-4 text-purple-400 bg-black/30 border-white/20 rounded focus:ring-purple-400 focus:ring-2 mt-1" 
									/>
									<span className="ml-3 text-sm text-white/70">
										I agree to the{' '}
										<Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
											Terms and Conditions
										</Link>
										{' '}and{' '}
										<Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
											Privacy Policy
										</Link>
									</span>
								</label>
								{errors.agreeToTerms && <p className="text-red-400 text-xs mt-1">{errors.agreeToTerms}</p>}
							</div>
							
							{/* Signup Button */}
							<button
								type="submit"
								disabled={isLoading}
								className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none neon-border"
							>
								{isLoading ? (
									<div className="flex items-center justify-center">
										<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
										Creating account...
									</div>
								) : (
									'Create Account'
								)}
							</button>
						</form>
						
						{/* Divider */}
						<div className="relative my-6">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-white/20"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-black text-white/50">Or continue with</span>
							</div>
						</div>
						
						{/* Social Signup */}
						<div className="grid grid-cols-2 gap-3">
							<button className="flex items-center justify-center px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300">
								<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
									<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
									<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
									<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
									<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
								</svg>
								Google
							</button>
							<button className="flex items-center justify-center px-4 py-3 bg-black/30 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-all duration-300">
								<svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
								</svg>
								Facebook
							</button>
						</div>
						
						{/* Login Link */}
						<div className="text-center mt-6">
							<p className="text-white/70">
								Already have an account?{' '}
								<Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
									Sign in here
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
