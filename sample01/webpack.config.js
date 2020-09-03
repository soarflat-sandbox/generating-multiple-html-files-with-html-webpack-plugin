const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const pages = ['index', 'about', 'posts'];

// エントリーポイントに指定するオブジェクトを生成する。
// 今回生成されるオブジェクト（entries）は以下の通り。
// {
//   index: './src/js/index.js',
//   about: './src/js/about.js',
//   posts: './src/js/posts.js',
// }
const entries = pages.reduce((memo, page) => {
  return { ...memo, [page]: `./src/js/${page}.js` };
}, {});

// HtmlWebpackPlugin に設定を生成する。
// 今回生成される設定（htmlWebpackPlugins）は以下の通り。
// [
//   new HtmlWebpackPlugin({
//     template: './src/html/index.html',
//     filename: 'index.html',
//     chunks: ['index'],
//   }),
//   new HtmlWebpackPlugin({
//     template: './src/html/about.html',
//     filename: 'about.html',
//     chunks: ['about'],
//   }),
//   new HtmlWebpackPlugin({
//     template: './src/html/posts.html',
//     filename: 'posts.html',
//     chunks: ['posts'],
//   }),
// ]
const htmlWebpackPlugins = pages.map(page => {
  return new HtmlWebpackPlugin({
    template: `./src/html/${page}.html`,
    filename: `${page}.html`,
    chunks: [page],
  });
});

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name].js',
  },
  plugins: [new CleanWebpackPlugin()].concat(htmlWebpackPlugins),
};
