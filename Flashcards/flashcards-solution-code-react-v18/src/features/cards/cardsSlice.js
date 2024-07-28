import { createSlice } from "@reduxjs/toolkit";

export const cardsSlice = createSlice({
  name: "cards",
  initialState: {
    cards: {}
  },
  reducers: {
    addCard: (state, action) => {
      const { id } = action.payload;
      state.cards[id] = action.payload;
      //The selected code state.cards[id] = action.payload; 
      //adds a card to the cards object in the state. It does 
      //this by using the id from action.payload as the key and
      //setting the corresponding value to the entire action.payload 
      //object. This updates cards with new card details.
    }
  }
});

//This function adds a new card to the state. It takes state 
//and action as parameters. The card’s id is extracted from action.payload 
//and used as a key to store action.payload in the state.cards object. This 
//way, a new card is added or an existing one is updated in the state.

export const { addCard } = cardsSlice.actions;
export const selectCardById = (id) => (state) => state.cards.cards[id];
//The selected code defines a function selectCardById that takes an id as 
//an argument. This function returns another function that accepts state 
//and retrieves a card from state.cards.cards using the provided id. 
//This helps to easily access specific cards by their id.
export default cardsSlice.reducer;
