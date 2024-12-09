module.exports = {
    presets: [
      'module:metro-react-native-babel-preset',
      '@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'
    ],
    plugins: [
      [
        'module-resolver',
        {
          // root: ['./Website'],
          alias: {
            '@': './Website',
          },
        },
      ],
    ],
  };
  