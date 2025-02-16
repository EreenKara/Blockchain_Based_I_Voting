module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    '@babel/plugin-proposal-export-namespace-from',
    ['module:react-native-dotenv'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './Components',
          '@screens': './src/screens',
          '@assets': './assets',
          '@services': './src/services',
          '@navigation': './src/navigation',
          '@styles': './styles',
          '@types': './types',
          '@utility': './src/utility',
          '@shared': './src/shared',
          '@entities': './entities',
          '@icomponents': './src/components',
        },
      },
    ],
  ],
};
