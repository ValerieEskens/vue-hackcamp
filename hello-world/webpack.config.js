var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/', // http://foo.com/dist/
    filename: 'build.js' // filename bundler
  },
  module: { // rules for what loaders to use for different types of files
    rules: [
      { // use vue-loader for all .vue files
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader', // file loader is responsible for the final url of these files: combines public path and relative paths of files
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  // these below are not that important
  resolve: { // how should webpack look for files (fe import Vue from 'vue')
    // first look for relative files
    // then modules (-> "module" in package.json)
    alias: {
      // for any module that starts with "vue", look in this file
      'vue$': 'vue/dist/vue.esm.js' // esm = es modules
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: { // get warning if after build, the file is still bigger than 5 gb for example
    hints: false
  },
  devtool: '#eval-source-map' // format of source maps to use
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({ // replace default
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ // minify code
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({ // minifies css
      minimize: true
    })
  ])
}
