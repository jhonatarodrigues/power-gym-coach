import type { Preview } from "@storybook/react-native";
import { View } from "react-native";

import { AppThemeProvider } from "../src/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppThemeProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: "#0B0B0B",
            padding: 16,
          }}
        >
          <Story />
        </View>
      </AppThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
