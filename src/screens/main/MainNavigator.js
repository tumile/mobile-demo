import { createAppContainer, createStackNavigator } from "react-navigation"
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs"
import colors from "res/colors"
import ProfileScreen from "./profile/ProfileScreen"
import CreateRoomScreen from "./rooms/CreateRoomScreen"
import RoomListScreen from "./rooms/RoomListScreen"
import RoomScreen from "./rooms/RoomScreen"
import WalletScreen from "./wallet/WalletScreen"

const MainTabs = createMaterialBottomTabNavigator(
    {
        Wallet: WalletScreen,
        RoomList: RoomListScreen,
        Profile: ProfileScreen
    },
    {
        shifting: true,
        initialRouteName: "Wallet",
        activeColor: colors.primary,
        inactiveColor: colors.gray,
        barStyle: { backgroundColor: "white" }
    }
)

export default createAppContainer(
    createStackNavigator(
        {
            Room: RoomScreen,
            CreateRoom: CreateRoomScreen,
            Main: {
                screen: MainTabs,
                navigationOptions: {
                    header: null
                }
            }
        },
        {
            initialRouteName: "Main"
        }
    )
)
