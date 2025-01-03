module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-prest-expo"],
    plugins: ["react-native-reanimated/plugin"],
  };
};
