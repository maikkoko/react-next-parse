require('babel-register')({
  babelrc: false,
  presets: [
    [
      'env',
      {
        targets: {
          node: '8',
        },
      },
    ],
  ],
});
require('./server');
