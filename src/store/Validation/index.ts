import { createSlice } from '@reduxjs/toolkit';

export type Validation = {
  iban: string;
  valid: boolean;
  dateTime: string;
};

type InitialStateType = {
  validations: Validation[];
};

const initialState: InitialStateType = {
  validations: [],
};

const slice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    updateValidations: (
      state,
      { payload: validation }: { payload: Validation },
    ) => {
      state.validations = [validation, ...state.validations];
    },
  },
});
export const { updateValidations } = slice.actions;
export default slice.reducer;
