import { UserConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'
import { PluginTrapAuth } from '@traptitech/vite-plugin-trap-auth'

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
  plugins: [VuePlugin(), PluginTrapAuth()]
}

export default config
