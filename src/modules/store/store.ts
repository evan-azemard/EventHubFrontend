import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import type { Dependencies } from "./dependencies";
import { authReducer } from "../auth/core/slice/auth.slice";
import { loginUIReducer } from "../login/core/slice/loginUI.slice";
import { registerUIReducer } from "../register/core/slice/registerUI.slice";
import { profileUIReducer } from "../profile/core/slice/profileUI.slice";

const reducers = combineReducers({
    auth: authReducer,
    loginUI: loginUIReducer,
    registerUI: registerUIReducer,
    profileUI: profileUIReducer,
})

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<typeof reducers>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

export const createStore = (config: {
    dependencies: Dependencies
}) => {
    const store = configureStore({
        reducer: reducers,
        devTools: true,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({
                thunk: {
                    extraArgument: config.dependencies
                }
            })
        }
    })
    return store;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();

