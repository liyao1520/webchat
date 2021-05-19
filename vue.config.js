module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        //在Vue的手脚架3里面，内部已经默认配置了`'@':'src'`
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4000",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //这里理解成用'/api'代替target里面的地址,比如我要调用'http://127.0.0.1:4000/user/add'，直接写'/api/user/add'即可
        },
      },
      "/socket.io": {
        target: "http://127.0.0.1:4000",
        ws: true,
        changeOrigin: true,
      },
      "/sockjs-node": {
        target: "http://127.0.0.1:4000",
        ws: false,
        changeOrigin: true,
      },
    },
  },
};
