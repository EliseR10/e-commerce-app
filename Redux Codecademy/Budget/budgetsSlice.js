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
const initialState = CATEGORIES.map((category) => ({
  category: category,
  amount: 0,
}));

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: initialState, 
  reducers: {
    editBudget: (state, action) => {
      const {category, amount} = action.payload
      /*update the state by finding the budget object whose category value matches action.payload.category and changing with the .amount value to action.payload.amount */
      const existingBudget = state.find(budget => budget.category === category);
        if (existingBudget) {
          existingBudget.amount = amount;
        }
    }
  }});

export const selectBudgets = (state) => state.budgets;
export const {editBudget} = budgetSlice.actions;
export default budgetSlice.reducer;
