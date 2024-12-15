import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
    role: null
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const user = action.payload?.user;
            const role = action.payload?.role;
            state.user = user;
            if(user===null){
                state.isAuth = false;
            } 
            else {
                state.isAuth = true;
                state.role = role;
            }
        }
    }
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;