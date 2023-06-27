import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils.js'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((x) => x._id === item._id)

            if(existItem) { 
                state.cartItems = state.cartItems.map((x) => x._id === existItem._id ? item : x) // return the item or it'll be just whatever the item is that we're looping through
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload) // the ID that is to be passed to this remove from cart function is going to be in the action's payload
            // so now state.cartItems will have all the items except the one the use wanna delete

            return updateCart(state)
        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer