import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipeDataState: [],
};

export const recipeDataSlice = createSlice({
  name: 'recipeDataState',
  initialState,
  reducers: {
    setRecipeDataState: (state, action) => {
      state.recipeDataState = action.payload;
    },
  },
});

export const { setRecipeDataState } = recipeDataSlice.actions;

export default recipeDataSlice.reducer;
