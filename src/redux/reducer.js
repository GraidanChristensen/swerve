const initialState = {
    id: null
}

//action
const GET_ADMIN = 'GET_ADMIN';
const CLEAR_ADMIN = 'CLEAR_ADMIN';

//action builders
export const getAdmin = (id) => {
    return{
        type: GET_ADMIN,
        payload: {id}
    }
}

export const clearAdmin = () => {
    return{
        type: CLEAR_ADMIN,
        payload: {
            id: ""
        }
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ADMIN:
            return{
                id: action.payload.id
            }
        default: return state
    }
}