import { UserConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'

const config: UserConfig = {
  alias: {
    '/@': path.resolve(__dirname, 'src').replace(/\\/g, '/')
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://anke-to-dev.trapti.tech',
        changeOrigin: true,
        ws: false
      }
    }
  },
  plugins: [VuePlugin()]
}

export default config
