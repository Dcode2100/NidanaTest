module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            ignoreDiagnostics: true
          }
        },
        exclude: /node_modules/
      }
    ]
  }
};