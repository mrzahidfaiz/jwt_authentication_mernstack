import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: '',
    name: '',
    email: '',
    auth: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser (state, action) {
            const {_id, name, email, auth} = action.payload;

            state._id = _id
            state.name = name
            state.email = email
            state.auth = auth
        },
        resetUser (state) {
            state._id = ''
            state.name = ''
            state.email = ''
            state.auth = false
        }
    }

})

export const { setUser, resetUser } = userSlice.actions;

export default userSlice.reducer;