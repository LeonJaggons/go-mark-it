const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    appName: "MarkIt",
    loginVisible: false,
};
export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        toggleLogin: (state) => {
            state.loginVisible = !state.loginVisible;
        },
    },
});

export const {} = appSlice.actions;
export default appSlice.reducer;
