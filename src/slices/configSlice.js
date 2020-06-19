import { createSlice } from '@reduxjs/toolkit';

export const configSlice = createSlice({
  name: 'config', 
  initialState: {
    voicemailId: null
  },
  reducers: {
    setVoicemail: (state, action) => {
      console.log(action);
      state.voicemailId = action.payload;
    },
  },
});

export const { setVoicemail } = configSlice.actions;

export const selectVoicemail = state => state.config.voicemailId;

export default configSlice.reducer;
