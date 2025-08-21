/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			glass: {
  				DEFAULT: 'var(--glass)',
  				nav: 'var(--glass-nav)',
  				card: 'var(--glass-card)'
  			},
  			// Professional Orange + Light Blue palette
  			orange: {
  				50: '#FFF7ED',
  				100: '#FFEDD5',
  				200: '#FED7AA',
  				300: '#FDBA74',
  				400: '#FB923C',
  				500: '#FF6600', // Primary orange
  				600: '#EA580C',
  				700: '#C2410C',
  				800: '#9A3412',
  				900: '#7C2D12',
  			},
  			blue: {
  				50: '#F0F9FF',
  				100: '#E0F2FE',
  				200: '#BAE6FD',
  				300: '#7DD3FC',
  				400: '#38BDF8',
  				500: '#0EA5E9', // Secondary blue
  				600: '#0284C7',
  				700: '#0369A1',
  				800: '#075985',
  				900: '#0C4A6E',
  			},
  			gray: {
  				50: '#F8FAFC',
  				100: '#F1F5F9',
  				200: '#E2E8F0',
  				300: '#CBD5E1',
  				400: '#94A3B8',
  				500: '#64748B',
  				600: '#475569',
  				700: '#334155', // Main foreground
  				800: '#1E293B',
  				900: '#0F172A',
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			// Professional font stack using CSS variables from next/font
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			],
  			body: [
  				'var(--font-inter)',
  				'system-ui',
  				'-apple-system',
  				'BlinkMacSystemFont',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			xs: ['0.75rem', { lineHeight: '1rem' }],
  			sm: ['0.875rem', { lineHeight: '1.25rem' }],
  			base: ['1rem', { lineHeight: '1.5rem' }],
  			lg: ['1.125rem', { lineHeight: '1.75rem' }],
  			xl: ['1.25rem', { lineHeight: '1.75rem' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem' }],
  			'4xl': ['2.25rem', { lineHeight: '2.5rem' }],
  			'5xl': ['3rem', { lineHeight: '1.2' }],
  			'6xl': ['3.75rem', { lineHeight: '1.2' }],
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  		},
  		backdropBlur: {
  			xs: '2px',
  		},
  		boxShadow: {
  			'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  			'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  			'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateY(0)'
  				}
  			},
  			'slide-in': {
  				'0%': {
  					opacity: 0,
  					transform: 'translateX(-10px)'
  				},
  				'100%': {
  					opacity: 1,
  					transform: 'translateX(0)'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'slide-in': 'slide-in 0.5s ease-out'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography"), require("tailwindcss-animate")],
} 