const path = require('path');
// 引数で指定したパターンにマッチするパス名を取得するモジュール https://github.com/isaacs/node-glob
const glob = require('glob');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcDir = './src/js/';

// エントリーポイントに指定するオブジェクトを生成するための配列を生成する。
// 今回生成される配列（entryFiles）は以下の通り。
// [
//   [ 'about/index.js', './src/js/about/index.js' ],
//   [ 'index.js', './src/js/index.js' ],
//   [ 'posts/index.js', './src/js/posts/index.js' ],
//   [ 'posts/popular.js', './src/js/posts/popular.js' ]
// ]
const entryFiles = glob
  // ./src/js/ 配下の JS ファイルを列挙した配列を取得 -> [ 'about/index.js', 'index.js', 'posts/index.js', 'posts/popular.js' ]
  .sync('**/*.js', { cwd: srcDir })
  // [ 'about/index.js', './src/js/about/index.js' ] のような形式に変換
  .map(file => [file, srcDir + file]);

// エントリーポイントに指定するオブジェクトを生成する。
// 今回生成されるオブジェクト（entries）は以下の通り。
// {
//   'about/index.js': './src/js/about/index.js',
//   'index.js': './src/js/index.js',
//   'posts/index.js': './src/js/posts/index.js',
//   'posts/popular.js': './src/js/posts/popular.js'
// }
const entries = Object.fromEntries(entryFiles);

// HtmlWebpackPlugin の設定を生成する。
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
//     chunks: ['about/index.js'],
//   }),
//   new HtmlWebpackPlugin({
//     template: './src/html/posts/index.html',
//     filename: 'posts/index.html',
//     chunks: ['posts/index.js'],
//   }),
//   new HtmlWebpackPlugin({
//     template: './src/html/posts/popular/index.html',
//     filename: 'posts/popular/index.html',
//     chunks: ['posts/index.js', 'posts/popular.js'],
//   }),
// ]
function generateHtmlWebpackPlugins() {
  const srcDir = './src/html/';
  // htmlFiles には以下の配列が格納される。
  // ['about/index.html', 'index.html', 'posts/index.html', 'posts/popular/index.html']
  const htmlFiles = glob.sync('**/*.html', { cwd: srcDir });
  const htmlWebpackPlugins = htmlFiles.map(htmlFile => {
    return new HtmlWebpackPlugin({
      template: srcDir + htmlFile,
      filename: htmlFile,
      chunks: getChunks(htmlFile),
    });
  });

  return htmlWebpackPlugins;
}

// HTML（テンプレート）に応じた chunks を返す
function getChunks(htmlFile) {
  // posts/popular/index.html にマッチ
  if (RegExp('posts/.+/.+').test(htmlFile)) {
    // posts/popular/index.html から posts/popular を抜き出す
    const chunk = htmlFile.match(/(posts.+)\/index\.html/)[1];
    return ['posts/index.js', `${chunk}.js`];
  }
  // posts/index.html にマッチ
  else if (RegExp('posts').test(htmlFile)) {
    return ['posts/index.js'];
  }
  // about/index.html にマッチ
  else if (RegExp('about').test(htmlFile)) {
    return ['about/index.js'];
  } else {
    return ['index.js'];
  }
}

module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/[name]',
  },
  plugins: [new CleanWebpackPlugin()].concat(generateHtmlWebpackPlugins()),
};
