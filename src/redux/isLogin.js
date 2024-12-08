import { createSlice } from "@reduxjs/toolkit";
import { getItem } from "../core/services/common/storage.services";

export const isLoginSlice = createSlice({
    name: "islogin",
    initialState: Boolean(getItem("Token1")),
    reducers: {
        setIslogin: (state, action) => state.isLogin = action.payload,
    }
});

export const {setIslogin} = isLoginSlice.actions;

export default isLoginSlice.reducer
