const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

if (process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true") {
  const { withStorybook } = require("@storybook/react-native/metro/withStorybook");

  module.exports = withStorybook(config, {
    enabled: true,
  });
} else {
  module.exports = config;
}
