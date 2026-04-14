module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "uniwind" }],
      "uniwind/babel",
    ],
    plugins: ["react-native-reanimated/plugin"],
  };
};
