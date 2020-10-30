// 1. imports
import { useSelector, useDispatch } from "react-redux"
import api, { AuthService } from '../../utils/request'

// 2. action definitions
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_PENDING = 'auth/LOGIN_PENDING'
const LOGOUT = 'auth/LOGOUT'

// 3. initial state
const initialState = {
    example: '',
    // on load get if user is authenticated
    isAuthenticated: AuthService.isAuthenticated(),
    pending: false,
}

// 4. reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
        return {...state, pending: true}
    case LOGIN_SUCCESS:
        return {...state, isAuthenticated: true, pending: false}
    case LOGOUT:
        return {...state, isAuthenticated: false, pending: false}
    default:
        return state
  }
}

function loginUser(email, password) {
    return dispatch => {
        return api.login(email, password)
        .then(resp => {
            dispatch({
                type: LOGIN_SUCCESS,
            })
        })
    }
}

function logoutUser() {
    return dispatch => {
        return api.logout().then(resp => {
            dispatch({
                type: LOGOUT,
            })
        })
    }
}

function signupUser(email, password) {
    return dispatch => {
        return api.signup(email, password).then(resp => {
            dispatch({
                type: LOGOUT,
            })
        })
    }
}

// 6. custom hook
export function useAuth() {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(appState => appState.authState.isAuthenticated)
  const login = (email, password) => dispatch(loginUser(email, password))
  const signup = (email, password) => dispatch(signupUser(email, password))
  const logout = () => dispatch(logoutUser())
  const testProtected = () => api.get('/dashboard')

  return { login, logout, signup, isAuthenticated, testProtected }
}

//