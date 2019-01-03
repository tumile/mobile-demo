import {
    ADD_MESSAGE,
    ADD_ROOM,
    NEW_MESSAGE,
    NEW_ROOM,
    LOAD_MESSAGES,
    LOAD_ROOMS
} from "lib/constants"
import { addError } from "./error"
import { resetSearch } from "./userSearch"

export const newRoom = room => ({
    type: NEW_ROOM,
    room
})

export const newMessage = (roomId, message) => ({
    type: NEW_MESSAGE,
    roomId,
    message
})

export const addRoom = () => {
    return (dispatch, getState, { emit }) => {
        return new Promise((resolve, reject) => {
            const {
                user: { userId },
                userSearch: { selected }
            } = getState()
            const room = {
                members: [
                    userId,
                    ...selected.reduce((acc, cur) => [...acc, cur._id], [])
                ]
            }
            emit(ADD_ROOM, room, function(error) {
                dispatch(resetSearch())
                if (error) {
                    dispatch(addError(error))
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }
}

export const addMessage = (roomId, content) => {
    return (dispatch, _, { emit }) => {
        return new Promise((resolve, reject) => {
            emit(ADD_MESSAGE, { roomId, content }, function(error) {
                if (error) {
                    dispatch(addError(error))
                    reject()
                } else {
                    resolve()
                }
            })
        })
    }
}

export const loadRooms = () => {
    return (dispatch, getState, { fetch }) => {
        const {
            user: { userId }
        } = getState()
        return fetch(`/users/${userId}/rooms`, "get")
            .then(({ rooms }) => {
                dispatch({
                    type: LOAD_ROOMS,
                    rooms
                })
            })
            .catch(error => {
                dispatch(addError(error))
            })
    }
}

export const loadMessages = roomId => {
    return (dispatch, getState, { fetch }) => {
        const {
            user: { userId }
        } = getState()
        return fetch(`/users/${userId}/rooms/${roomId}`, "get")
            .then(({ messages }) => {
                dispatch({
                    type: LOAD_MESSAGES,
                    roomId,
                    messages
                })
            })
            .catch(error => {
                dispatch(addError(error))
            })
    }
}
