export const setUser = (userData) =>{
    return{
        type: 'LOGIN_SUCCESS',
        payload: userData
    }
}

export const setTrackUrl = (url) => {
    return{
        type: 'TRACK_URL',
        payload: url
    };
};