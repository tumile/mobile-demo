import { NEW_MESSAGE, NEW_ROOM, LOAD_MESSAGES, LOAD_ROOMS } from "lib/constants"

export default (state = [], action) => {
    switch (action.type) {
        case LOAD_ROOMS:
            return action.rooms
        case NEW_ROOM:
            return [action.room, ...state]
        case NEW_MESSAGE:
            const index = state.findIndex(item => item._id === action.roomId)
            let room = state[index]
            room = { ...room, messages: [action.message, ...room.messages] }
            return [room, ...state.slice(0, index), ...state.slice(index + 1)]
        case LOAD_MESSAGES:
            return state.map(item =>
                item._id === action.roomId
                    ? {
                          ...item,
                          messages: action.messages
                      }
                    : item
            )
        default:
            return state
    }
}
