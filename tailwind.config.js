import { heroui } from '@heroui/theme'

/** @type {import('tailwindcss').Config} */
const config = {
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    plugins: [
        heroui({
            addCommonColors: true,
            themes: {                
                // Account type themes (light variants)
                "member": {
                  "colors": {
                    // Override primary + base background/foreground like light theme
                    "primary": {
                      "DEFAULT": "#2AFC98",
                      "foreground": "#000"
                    },
                    // Card background token (use with class: bg-card)
                    "card": "#ffffff",
                    // NextUI/HeroUI default surface token used by components like Card
                    "content1": "#ffffff",
                    "background": "#fffbf6",
                    "foreground": "#000"
                  }
                },
                "partner": {
                  "colors": {
                    "primary": {
                      "DEFAULT": "#119DA4",
                      "foreground": "#fff"
                    },
                    "card": "#ffffff",
                    "content1": "#ffffff",
                    "background": "#fffbf6",
                    "foreground": "#000"
                  }
                },
                // Account type themes (dark variants)
                "member-dark": {
                  "colors": {
                    "primary": {
                      "DEFAULT": "#2AFC98",
                      "foreground": "#000"
                    },
                    "card": "#121214",
                    "content1": "#121214",
                    "background": "#0a080a",
                    "foreground": "#fff"
                  }
                },
                "partner-dark": {
                  "colors": {
                    "primary": {
                      "DEFAULT": "#119DA4",
                      "foreground": "#fff"
                    },
                    "card": "#121214",
                    "content1": "#121214",
                    "background": "#0a080a",
                    "foreground": "#fff"
                  }
                },
                // Anonymous themes (for unauthenticated users) - violet
                "anonymous": {
                  "colors": {
                    "primary": {
                      "DEFAULT": "#7C3AED",
                      "foreground": "#fff"
                    },
                    "card": "#ffffff",
                    "content1": "#ffffff",
                    "background": "#fffbf6",
                    "foreground": "#000"
                  }
                },
                "anonymous-dark": {
                  "colors": {
                    "primary": {
                      "DEFAULT": "#7C3AED",
                      "foreground": "#fff"
                    },
                    "card": "#121214",
                    "content1": "#121214",
                    "background": "#0a080a",
                    "foreground": "#fff"
                  }
                }
            },
            "layout": {
              "fontSize": {
                "tiny": "0.75rem",
                "small": "0.875rem",
                "medium": "1rem",
                "large": "1.125rem"
              },
              "lineHeight": {
                "tiny": "1rem",
                "small": "1.25rem",
                "medium": "1.5rem",
                "large": "1.75rem"
              },
              "radius": {
                "small": "0.5rem",
                "medium": "0.75rem",
                "large": "0.875rem"
              },
              "borderWidth": {
                "small": "1px",
                "medium": "2px",
                "large": "3px"
              },
              "disabledOpacity": "0.5",
              "dividerWeight": "1",
              "hoverOpacity": "0.9"
            },
        })
    ],
}

module.exports = config


    
