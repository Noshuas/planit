module.exports = {
  presets: [
    '@babel/preset-react',
  ],
  overrides: [
    {
      include: ['./node_modules'],
      plugins: [
        [
          'babel-plugin-transform-require-ignore',
          {
            extensions: ['.css'],
          },
        ],
      ],
    },
  ],
};
