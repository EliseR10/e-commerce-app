import { createSlice } from '@reduxjs/toolkit';

export const CATEGORIES = [
  "housing",
  "food",
  "transportation",
  "utilities",
  "clothing",
  "healthcare",
  "personal",
  "education",
  "entertainment",
];
const initialState = Object.fromEntries(
  CATEGORIES.map((category) => [category, []])
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: initialState,
  reducers: {
    addTransaction: (state, action) => {
      //extract the category from the action's payload
      const { category } = action.payload;
      //add the new transaction to the correct category's transaction list
      if (!state[category]) { /*check if the category key exists in the state object*/
        state[category] = [];/*if it doesn't, it initialize one with an empty array*/
      }
      state[category].push(action.payload);/*push the new transaction into the array of transactions under the specific key*/
    },
    deleteTransaction: (state, action) => {
      const { oldTransaction } = action.payload;
      if (state[category]) { /*check if oldTransaction is in the category*/
        delete state[category]; /*If yes, delete it*/
      }
    }
  }
})

export const selectTransactions = (state) => state.transactions;
export const selectFlattenedTransactions = (state) =>
  Object.values(state.transactions).reduce((a, b) => [...a, ...b], []);

export default transactionsSlice.reducer;
export const { addTransaction, deleteTransaction } = transactionsSlice.action