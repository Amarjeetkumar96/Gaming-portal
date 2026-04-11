module.exports = {
	content: [
		'./index.html',
		'./src/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				neon: { green: '#39ff14', purple: '#bc13fe', blue: '#00e5ff' },
				cyber: { 
					pink: '#ff1493', 
					orange: '#ff6b35', 
					gold: '#ffd700', 
					cyan: '#00ffff', 
					magenta: '#ff00ff', 
					lime: '#ccff00' 
				},
			},
			boxShadow: {
				neon: '0 0 10px rgba(57,255,20,0.6), 0 0 20px rgba(188,19,254,0.4)',
				glass: '0 4px 30px rgba(0,0,0,0.3)',
			},
			animation: {
				'fade-in': 'fadeIn 0.6s ease-out',
				'slide-in-up': 'slideInUp 0.6s ease-out',
				'slide-in-left': 'slideInLeft 0.6s ease-out',
				'slide-in-right': 'slideInRight 0.6s ease-out',
				'scale-in': 'scaleIn 0.5s ease-out',
				'rotate-in': 'rotateIn 0.8s ease-out',
				'bounce-in': 'bounceIn 0.8s ease-out',
				'shimmer': 'shimmer 2s infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'matrix-rain': 'matrixRain 3s linear infinite',
				'cyber-scan': 'cyberScan 2s ease-in-out infinite',
			},
			fontFamily: {
				'display': ['Orbitron', 'Arial Black', 'sans-serif'],
				'mono': ['Share Tech Mono', 'Courier New', 'monospace'],
			},
		},
	},
	plugins: [],
}
