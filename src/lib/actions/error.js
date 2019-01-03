import { ADD_ERROR, REMOVE_ERROR } from "lib/constants"

export const addError = error => {
    console.log(error)

    return {
        type: ADD_ERROR,
        error
    }
}

export const removeError = () => ({
    type: REMOVE_ERROR
})
