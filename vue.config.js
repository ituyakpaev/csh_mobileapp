const path = require("path");
const ENV = process.env.NODE_ENV;
const TEST = ENV === 'test';
const DEV = ENV === 'development';
const PROD = ENV === 'production';
const MOBILE = process.env.VUE_APP_MOBILE;

const PATH = {
  src: path.resolve(__dirname, DEV || TEST ? '/testing/' : '/lk/'),
  dist: PROD ? path.resolve(__dirname, 'public') : path.resolve(__dirname, 'public')
}

module.exports = {
  publicPath: MOBILE ? "./" : DEV || TEST ? '/testing/' : '/lk/',

  css: {
    //requireModuleExtension: false,
    loaderOptions: {
      sass: {
        data: `@import "@/assets/css/_variables.scss";`
      }
    },
  },

  devServer: {
    hot: true,
    publicPath: DEV || TEST ? '/testing/' : '/lk/',
    contentBase: `${PATH.src}`,
    // contentBase: PATH.dist,
    // compress: true,
    // inline: true,
    open: true,
    // historyApiFallback: true
  },

  configureWebpack: {
    plugins: [
      /*new my({
        'isTest': JSON.stringify(TEST),
        'isDev': JSON.stringify(DEV),
        'isProd': JSON.stringify(PROD),
        'apiUrl': '',
        'process.env': {
          NODE_ENV: JSON.stringify(ENV)
        }
      })*/
    ]
  },

  pluginOptions: {
    //cordovaPath: 'dist'
  }
}
