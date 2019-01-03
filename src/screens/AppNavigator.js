import { createAppContainer, createSwitchNavigator } from "react-navigation"
import MainNavigator from "./main/MainNavigator"
import LoadingScreen from "./auth/LoadingScreen"
import AuthNavigator from "./auth/AuthNavigator"

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            Main: MainNavigator,
            Auth: AuthNavigator
        },
        {
            initialRouteName: "Loading"
        }
    )
)
