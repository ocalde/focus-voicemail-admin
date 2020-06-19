import { createSlice } from '@reduxjs/toolkit';
import { updateVoicemailStatus, fetchVoicemailMessages } from '../fetchUtils';

export const messagesSlice = createSlice({
  name: 'messages', 
  initialState: {
    data: [],
    updating: null
  },
  reducers: {
    beginUpdate: (state, action) => {
      state.updating = action.payload;
    },
    endUpdate: (state) => {
      state.updating = null;
    },
    populate: (state, action) => {
      state.data = action.payload;
    },
    changeStatus: (state, action) => {
      const messageIndex = state.findIndex(msg => msg.media_id === action.payload.media_id);
      if(messageIndex > -1) {
        const message = { ...state[messageIndex]};
        message.status = action.payload.status;
        state[messageIndex] = message;
      }
    },
  },
});

export const { beginUpdate, endUpdate, populate, changeStatus } = messagesSlice.actions;

export const populateAsync = action => dispatch => {
  fetchVoicemailMessages()
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

export const setStatusAsync = action => dispatch => {
  const { voicemailBox, media_id, status } = action;
  dispatch(beginUpdate(media_id));

  //On-purpose 2 seconds delay to show block on the message being updated at UI level
  setTimeout(() => {
      updateVoicemailStatus(voicemailBox, media_id, status)
      .then(data => {
        dispatch(changeStatus(action));
      })
      .catch(err => {
        //Set error
      })
      .finally(() => {
        dispatch(endUpdate());
        dispatch(populateAsync());
      });
  }, 2000);

};

export const selectMessages = state => state.messages.data;
export const selectMessageUpdating = state => state.messages.updating;

export default messagesSlice.reducer;
