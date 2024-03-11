const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave : false,
  devServer: {
    server: "http",
    port: "8080",
    host: "127.0.0.1",
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000",
        ws: false,
        changeOrigin: true
      }
    }
  }
})
