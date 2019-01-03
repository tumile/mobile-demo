import { loadRooms } from "lib/actions/rooms"
import React from "react"
import { ActivityIndicator, FlatList, TextInput } from "react-native"
import { FAB } from "react-native-paper"
import Entypo from "react-native-vector-icons/Entypo"
import Octicons from "react-native-vector-icons/Octicons"
import { createStackNavigator } from "react-navigation"
import { connect } from "react-redux"
import colors from "res/colors"
import ViewErrorWrapper from "../ViewErrorWrapper"
import RoomListItem from "./RoomListItem"

class RoomListScreen extends React.Component {
    static navigationOptions = {
        headerTitle: (
            <TextInput
                style={{ flex: 1 }}
                placeholder="Search room"
                placeholderTextColor={colors.gray}
            />
        ),
        headerLeft: (
            <Octicons
                style={{ marginLeft: 20 }}
                size={22}
                name="search"
                color={colors.gray}
            />
        )
    }

    state = {
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true }, () =>
            this.props.loadRooms().then(() => this.setState({ loading: false }))
        )
    }

    renderItem = ({ item }) => {
        return (
            <RoomListItem
                {...item}
                userId={this.props.userId}
                navigateRoom={this.navigateRoom}
            />
        )
    }

    navigateRoom = (roomName, roomId) => {
        this.props.navigation.navigate("Room", { roomName, roomId })
    }

    navigateCreate = () => {
        requestAnimationFrame(() =>
            this.props.navigation.navigate("CreateRoom")
        )
    }

    render() {
        return (
            <ViewErrorWrapper>
                {this.state.loading ? <ActivityIndicator size="large" /> : null}
                <FlatList
                    data={this.props.rooms}
                    keyExtractor={({ _id }) => _id}
                    renderItem={this.renderItem}
                    initialNumToRender={7}
                />
                <FAB
                    style={{
                        position: "absolute",
                        margin: 16,
                        right: 0,
                        bottom: 0,
                        backgroundColor: colors.primary
                    }}
                    color="white"
                    icon="add"
                    onPress={this.navigateCreate}
                />
            </ViewErrorWrapper>
        )
    }
}

const RoomListWithHeader = createStackNavigator(
    {
        RoomListWithHeader: connect(
            ({ rooms, user: { userId } }) => ({ rooms, userId }),
            { loadRooms }
        )(RoomListScreen)
    },
    {
        navigationOptions: {
            tabBarLabel: "Rooms",
            tabBarIcon: ({ tintColor }) => (
                <Entypo size={22} name="chat" color={tintColor} />
            )
        }
    }
)

export default RoomListWithHeader
