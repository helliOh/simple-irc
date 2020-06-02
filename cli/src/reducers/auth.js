export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = () =>({
    type : LOGIN
});

export const logout = () =>({
    type : LOGOUT
});

export const initialState = {
    login : true
};

const reducer = (state=initialState, action) =>{
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
};

export default reducer;