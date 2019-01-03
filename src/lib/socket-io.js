import { NEW_MESSAGE, NEW_ROOM, ROUTE } from "lib/constants"
import io from "socket.io-client"
import { newMessage, newRoom } from "./actions/rooms"
import store from "./store"

let socket = null

export default (emit = (type, data, callback) => {
    if (socket) socket.emit(type, data, callback)
})

export const setupSocket = token => {
    if (token) {
        socket = io(ROUTE, {
            path: "/sockets",
            query: {
                token
            }
        })

        socket.on(NEW_ROOM, room => {
            store.dispatch(newRoom(room))
        })

        socket.on(NEW_MESSAGE, ({ roomId, message }) => {
            store.dispatch(newMessage(roomId, message))
        })
    } else socket = null
}
