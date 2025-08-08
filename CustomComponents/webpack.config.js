const path = require('path');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: path.resolve(__dirname, 'InputWithHistory.formio.entry.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'InputWithHistory.formio.bundle.js',
    library: { name: 'InputWithHistoryBundle', type: 'umd' },
    globalObject: 'this',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, 'tsconfig.formio.json'),
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    formiojs: 'Formio',
  },
  devtool: false,
};