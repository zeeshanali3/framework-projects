import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { store, persistor } from "./root/Common/Store/configureStore"; // Updated import
import App from "./App";
import theme from "./assets/styles/theme/index";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { MantineProvider } from "@mantine/core"; // Import MantineProvider

// Get the store and persistor

const AppContainer = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MUIThemeProvider theme={theme}>
          <MantineProvider theme={{}} withGlobalStyles withNormalizeCSS>
            <App />
          </MantineProvider>
        </MUIThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppContainer;
