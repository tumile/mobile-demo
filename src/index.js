import store from "lib/store"
import React from "react"
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper"
import { Provider as StoreProvider } from "react-redux"
import colors from "res/colors"
import App from "./screens/AppNavigator"

const theme = {
    ...DefaultTheme,
    roundness: 15,
    colors: {
        ...DefaultTheme.colors,
        primary: colors.primary,
        text: colors.text,
        error: colors.error,
        placeholder: colors.gray,
        background: "white"
    }
}

export default () => {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </StoreProvider>
    )
}
