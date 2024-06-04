const initialState = {
    user: null,
    trackURL: ''
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return{
                ...state,
                user: action.payload
            };
        
        case 'TRACK_URL':
            return{
                ...state,
                currentURL: action.payload
            };
        
        default:
            return state;
    }
};

export default userReducer