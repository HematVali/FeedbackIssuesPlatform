/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#0D3273",
          
          "secondary": "#00d6ff",
                   
          "accent": "#ff3d00",
                   
          "neutral": "#092657",
                   
          "base-100": "#ffffff",
                   
          "info": "#00ffff",
                   
          "success": "#00e460",
                   
          "warning": "#ec7e00",
                   
          "error": "#ff7b90"
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

