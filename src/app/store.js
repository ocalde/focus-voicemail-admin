import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from '../slices/messagesSlice';
import configSlice from '../slices/configSlice';
import voicemailsSlice from '../slices/voicemailsSlice';

export default configureStore({
  reducer: {
    messages: messagesSlice,
    config: configSlice,
    voicemails: voicemailsSlice
  },
});
