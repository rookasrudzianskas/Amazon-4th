import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [],
};

export const basketSlice = createSlice({
    name: "basket",
    // initial state
    initialState,
    // defining actions in here
    reducers: {
        addToBasket: (state, action) => {
            // here we are adding the products to the state, updating the state
            // keep whatever is in here, and the data which is new in it
            state.items = [...state.items, action.payload];
            console.log(action.payload)
        },
        removeFromBasket: (state, action) => {
            const index = state.items.findIndex(
                (basketItem) => basketItem.id === action.payload.id
            );

            let newBasket = [...state.items];

            if(index >= 0){
                newBasket.splice(index,1);
            }else{
                console.warn(`Can not find the product ${action.payload.id} which is not in the basket`);

            }


            state.items = newBasket;
        },
    },
});


export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
// export const selectTotal = (state) => state.basket.items.reduce((total,item) => total + item.price,0);

export default basketSlice.reducer;