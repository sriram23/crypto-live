import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
}

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { set } = cryptoSlice.actions
export default cryptoSlice.reducer