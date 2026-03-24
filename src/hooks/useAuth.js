import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/slices/authSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { isAuthenticated, user, loading, error, token, refreshToken, requiresPasswordChange } = useSelector(
    (state) => state.auth
  )

  const logoutUser = () => {
    dispatch(logout())
  }

  return {
    isAuthenticated,
    user,
    loading,
    error,
    token,
    refreshToken,
    requiresPasswordChange,
    logout: logoutUser,
  }
}
