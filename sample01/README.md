# html-webpack-plugin で複数の HTML ファイルを出力するサンプル その１

## `src`ディレクトリ内のファイルと出力されるファイルに関して

このサンプルのエントリーポイントと、html-webpack-plugin のテンプレートは以下のようになります。

```
.src
├── html
│   ├── about.html
│   ├── index.html
│   └── posts.html
└── js
    ├── about.js
    ├── index.js
    └── posts.js
```

ビルドを実行して`public`に出力される HTML は、それぞれ以下の JavaScript を読み込んでいます。

- `about.html`から出力される HTML は`about.js`から出力されるバンドルを読み込んでいる。
- `index.html`から出力される HTML は`index.js`から出力されるバンドルを読み込んでいる。
- `posts.html`から出力される HTML は`posts.js`から出力されるバンドルを読み込んでいる。

## 動作環境

- Node.js: v12.18.1
- npm: v6.14.5

## セットアップ

このディレクトリ上で以下のコマンドを実行してください。

```shell
npm ci
```

## 使い方

以下のコマンドを実行すれば、webpack が実行されてバンドルされたファイルが出力されます。

```shell
npm run build
```
