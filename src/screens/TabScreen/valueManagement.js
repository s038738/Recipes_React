import { createSlice } from '@reduxjs/toolkit';

const valueManagement = createSlice({
    name: 'value',
    initialState: {value: 0},
    reducers: {
        increaseValue(state) {
            state.value++
        },
        decreaseValue(state) {
            state.value--
        },
    },
})

export const {increaseValue, decreaseValue} = valueManagement.actions;
export default valueManagement.reducer;