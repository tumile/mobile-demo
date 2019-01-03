import { applyMiddleware, compose, createStore } from "redux"
import thunk from "redux-thunk"
import fetch from "./fetch"
import rootReducer from "./reducers"
import emit from "./socket-io"

export default createStore(
    rootReducer,
    compose(applyMiddleware(thunk.withExtraArgument({ fetch, emit })))
)
