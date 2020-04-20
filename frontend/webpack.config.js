const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { getIfUtils, removeEmpty } = require('webpack-config-utils')

module.exports = ({ mode }) => {
  const { ifNotProduction } = getIfUtils(mode)

  return {
    mode,
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
    },
    resolve: removeEmpty({
      alias: ifNotProduction({
        'react-dom': '@hot-loader/react-dom',
      }),
    }),
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: './src/html.js' }),
    ],
    devServer: {
      port: 3000,
      host: '0.0.0.0',
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              // cache transpilation results to speed up build
              cacheDirectory: true,
            },
          },
        },
        {
          // Copy specially named files into
          // the root of the /public directory
          test: /favicon(-\d{2}x\d{2}.png|.ico)|safari-pinned-tab.svg|apple-touch-icon.png|logo\d{3}.png|robots.txt$/i,
          use: [
            {
              loader: 'file-loader',
              options: { name: '[name].[ext]' },
            },
          ],
        },
        {
          test: /manifest.json$/i,
          type: 'javascript/auto',
          use: [
            {
              loader: 'file-loader',
              options: { name: '[name].[ext]' },
            },
          ],
        },
        {
          // put any images imported into the /public/images folder
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './images',
              },
            },
          ],
        },
      ],
    },
  }
}
