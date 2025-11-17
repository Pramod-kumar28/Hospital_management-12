import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  users: [],
  loading: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    setUsers: (state, action) => {
      state.users = action.payload
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    }
  }
})

export const { setUser, setUsers, updateUser } = userSlice.actions
export default userSlice.reducer