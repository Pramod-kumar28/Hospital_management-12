import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stats: {
    totalPatients: 0,
    todayAppointments: 0,
    pendingTasks: 0,
    revenue: 0
  },
  recentActivities: [],
  loading: false
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload
    },
    setRecentActivities: (state, action) => {
      state.recentActivities = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { setStats, setRecentActivities, setLoading } = dashboardSlice.actions
export default dashboardSlice.reducer