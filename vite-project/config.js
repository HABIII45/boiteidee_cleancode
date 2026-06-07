export default {
  server: {
    proxy: {
      '/api/openrouter': {
        target: 'https://openrouter.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/openrouter', '/api/v1')
      }
    }
  }
}