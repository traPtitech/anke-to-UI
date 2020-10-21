import { UserConfig } from 'vite'
import path from 'path'

const config: UserConfig = {
  alias: {
    '/@/': path.resolve(__dirname, 'src')
  },
  proxy: {
    '/api': {
      target: 'https://anke-to-dev.trapti.tech',
      changeOrigin: true
    }
  }
}

export default config
