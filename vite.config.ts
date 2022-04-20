import { UserConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'
import { PluginTrapAuth } from '@traptitech/vite-plugin-trap-auth'

const config: UserConfig = {
  server: {
    proxy: {
      '/api': {
        target: 'https://anke-to-dev.trapti.tech',
        changeOrigin: true,
        ws: false
      }
    }
  },
  resolve: {
    alias: {
      '/@': path.join(__dirname, 'src/')
    }
  },
  plugins: [VuePlugin(), PluginTrapAuth()]
}

export default config
