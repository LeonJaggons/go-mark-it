import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./reducers/appSlice";

export default configureStore({
    reducer: {
        app: appReducer,
    },
});
