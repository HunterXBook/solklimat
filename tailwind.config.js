/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
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
  					height: '0'
  				}
  			},
        // Новые анимации для Banner
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)'
          },
          '50%': {
            transform: 'translateY(-20px)'
          }
        },
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)'
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(59, 130, 246, 0.8)'
          }
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          }
        },
        'shimmer': {
          '0%': {
            transform: 'translateX(-100%)'
          },
          '100%': {
            transform: 'translateX(100%)'
          }
        },
        'bounce-gentle': {
          '0%, 100%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          }
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        },
        'scale-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'glow-rotate': {
          '0%': { 
            transform: 'rotate(0deg)',
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)'
          },
          '50%': { 
            'box-shadow': '0 0 40px rgba(59, 130, 246, 0.8)'
          },
          '100%': { 
            transform: 'rotate(360deg)',
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)'
          }
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        },
        'fade-in-scale': {
          '0%': {
            transform: 'scale(0.8)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        // Новые анимации
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 3s ease infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'scale-pulse': 'scale-pulse 2s ease-in-out infinite',
        'glow-rotate': 'glow-rotate 4s linear infinite',
        'slide-in-left': 'slide-in-left 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'fade-in-scale': 'fade-in-scale 0.5s ease-out',
        'rotate-slow': 'rotate-slow 20s linear infinite'
  		},
      // Дополнительные утилиты для эффектов
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.7)',
        'glow-xl': '0 0 60px rgba(59, 130, 246, 0.8)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.2)',
        'neon-blue': '0 0 5px #00bcd4, 0 0 10px #00bcd4, 0 0 15px #00bcd4',
        'neon-cyan': '0 0 5px #06b6d4, 0 0 10px #06b6d4, 0 0 15px #06b6d4',
        'soft-glow': '0 4px 20px rgba(59, 130, 246, 0.3)',
        'intense-glow': '0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(59, 130, 246, 0.6)'
      },
      dropShadow: {
        'glow': '0 0 10px rgba(59, 130, 246, 0.8)',
        'glow-lg': '0 0 20px rgba(59, 130, 246, 0.9)'
      }
  	}
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography")
  ],
}