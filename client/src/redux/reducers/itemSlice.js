const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    categories: [],
};
export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = itemSlice.actions;
export default itemSlice.reducer;
