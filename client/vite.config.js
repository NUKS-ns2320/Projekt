import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

    server: {
    host: '212.101.137.119',
    port: 5175,
  }
  

})
