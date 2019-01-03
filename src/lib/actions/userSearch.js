import {
    FIND_USERS,
    SELECT_USER,
    DESELECT_USER,
    RESET_SEARCH
} from "lib/constants"
import fetch from "lib/fetch"
import { addError, removeError } from "./error"

export const resetSearch = () => ({
    type: RESET_SEARCH
})

export const selectUser = user => ({
    type: SELECT_USER,
    user
})

export const deselectUser = user => ({
    type: DESELECT_USER,
    user
})

export const findUsers = searchVal => {
    return (dispatch, getState) => {
        const {
            userSearch: { selected }
        } = getState()
        return fetch("/users/find", "post", { searchVal, selected })
            .then(({ users }) => {
                dispatch(removeError())
                dispatch({
                    type: FIND_USERS,
                    users
                })
            })
            .catch(error => dispatch(addError(error)))
    }
}
