import decode from "jwt-decode"
import { setUser } from "lib/actions/user"
import { setAuthHeader } from "lib/fetch"
import { setupSocket } from "lib/socket-io"
import React from "react"
import { ActivityIndicator, AsyncStorage, View } from "react-native"
import { connect } from "react-redux"
import colors from "res/colors"

class LoadingScreen extends React.Component {
    componentDidMount() {
        AsyncStorage.getItem("token").then(token => {
            if (!token) {
                this.props.navigation.navigate("Auth")
            } else {
                setAuthHeader(token)
                setupSocket(token)
                this.props.setUser(decode(token))
                this.props.navigation.navigate("Main")
            }
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        )
    }
}

export default connect(
    () => ({}),
    { setUser }
)(LoadingScreen)
