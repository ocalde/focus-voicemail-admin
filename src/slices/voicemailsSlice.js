import { createSlice } from '@reduxjs/toolkit';
import { fetchVoicemailBoxes } from '../fetchUtils';

export const voicemailsSlice = createSlice({
  name: 'voicemails', 
  initialState: {
    data: []
  },
  reducers: {
    populate: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { populate } = voicemailsSlice.actions;

export const populateAsync = action => dispatch => {
  fetchVoicemailBoxes()
  .then(data => {
    return data.data;
  })
  .then(data => {
    dispatch(populate(data));
  })
  .catch(err => {
    //Set error
  });
};

export const selectVoicemails = state => state.voicemails.data;

export default voicemailsSlice.reducer;
