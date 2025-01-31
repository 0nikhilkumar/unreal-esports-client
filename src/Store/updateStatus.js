import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isStatus : false
};


export const updateStatus= createSlice({
   initialState,
   reducers:{
        setStatus(state) => {
            state.isStatus = true
        }
   }
});

export const { updateStatus } = authSlice.actions;
export default updateStatus.reducer;