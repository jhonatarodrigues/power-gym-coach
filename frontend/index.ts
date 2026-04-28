import "react-native-gesture-handler";

import { registerRootComponent } from "expo";

import App from "./App";
import StorybookUIRoot from "./.rnstorybook";

const RootComponent =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true" ? StorybookUIRoot : App;

registerRootComponent(RootComponent);
