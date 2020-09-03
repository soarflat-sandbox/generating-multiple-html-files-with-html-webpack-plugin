# html-webpack-plugin で複数の HTML ファイルを出力するサンプル その２

## `src`ディレクトリ内のファイルと出力されるファイルに関して

このサンプルのエントリーポイントと、html-webpack-plugin のテンプレートは以下のようになります。

```
.src
├── html
│   ├── about
│   │   └── index.html
│   ├── index.html
│   └── posts
│       ├── index.html
│       └── popular
│           └── index.html
└── js
    ├── about
    │   └── index.js
    ├── index.js
    └── posts
        ├── index.js
        └── popular.js
```

ビルドを実行して`public`に出力される HTML は、それぞれ以下の JavaScript を読み込んでいます。

- `about/inex.html`から出力される HTML は`about/index.js`から出力されるバンドルを読み込んでいる。
- `index.html`から出力される HTML は`index.js`から出力されるバンドルを読み込んでいる。
- `posts/index.html`から出力される HTML は`posts/index.js`から出力されるバンドルを読み込んでいる。
- `posts/popular/index.html`から出力される HTML は`posts/index.js`と`posts/popular.js`から出力されるバンドルを読み込んでいる。

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
