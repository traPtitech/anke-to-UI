import { UserConfig } from 'vite'
import path from 'path'
import VuePlugin from '@vitejs/plugin-vue'
import { PluginTrapAuth } from '@traptitech/vite-plugin-trap-auth'
import dns from 'node:dns'

dns.setDefaultResultOrder('ipv4first')

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
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "sass:math";
          @import "/@/style/_main.scss";
        `
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
