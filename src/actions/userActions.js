export const setUser = (userData) =>{
    return{
        type: 'LOGIN_SUCCESS',
        payload: userData
    }
}