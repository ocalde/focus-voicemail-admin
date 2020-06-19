import { configureStore } from '@reduxjs/toolkit';
import messagesSlice from '../slices/messagesSlice';

export default configureStore({
  reducer: {
    messages: messagesSlice,
  },
});
