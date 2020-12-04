const initialState = {
    id: null,
    cart_id: null
}

//action
const GET_ADMIN = 'GET_ADMIN';
const CLEAR_ADMIN = 'CLEAR_ADMIN';

const GET_CART='GET_CART';
const CLEAR_CART = 'CLEAR_CART';

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
            id: null
        }
    }
}

export const getCart = (cart_id)=>{
    return{
        type: GET_CART,
        payload: {cart_id}
    }
}

export const clearCart = () => {
    return{
        type: CLEAR_CART,
        payload: {
            cart_id: null
        }
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_ADMIN:
            return{
                id: action.payload.id
            }
        case CLEAR_ADMIN:
            return{
                id: action.payload.id
            }
        case GET_CART:
            return{
                cart_id: action.payload.cart_id
            }
        case CLEAR_CART:
            return{
                cart_id: action.payload.cart_id
            }
        default: return state
    }
}