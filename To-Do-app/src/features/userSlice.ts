import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../app/store"

export const userSlice = createSlice({
    name: "user",
    initialState: { user: null, username: null, loggedIn: false },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.username = action.payload.email
            state.loggedIn = true
        },

        logout: (state, action) => {
            state.user = action.payload.email
            state.loggedIn = false
        }
    }
})

export const { login, logout } = userSlice.actions
export const selectUser = (state: RootState) => state.user
export default userSlice.reducer








