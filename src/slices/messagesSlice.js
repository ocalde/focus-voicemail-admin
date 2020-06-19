import { createSlice } from '@reduxjs/toolkit';
import { updateVoicemailStatus, fetchVoicemailMessages } from '../fetchUtils';

export const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        updating: null,
        error: false,
        notification: null
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
        setError: (state) => {
            state.error = true;
        },
        clearError: (state) => {
            state.error = false;
        },
        setNotification: (state, action) => {
            state.notification = action.payload;
        },
        clearNotification: (state) => {
            state.notification = null;
        },
        changeStatus: (state, action) => {
            const messageIndex = state.data.findIndex(msg => msg.media_id === action.payload.media_id);
            if (messageIndex > -1) {
                const message = { ...state[messageIndex] };
                message.status = action.payload.status;
                state[messageIndex] = message;
            }
        },
    },
});

export const { beginUpdate, endUpdate, populate, changeStatus, setError, clearError, setNotification, clearNotification } = messagesSlice.actions;

export const populateAsync = action => dispatch => {
    fetchVoicemailMessages(action)
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
                dispatch(setNotification('The voicemail message status was updated successfully.'));
                setTimeout(() => {
                    dispatch(clearNotification());
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                dispatch(setError());
                dispatch(setNotification('There was an error while trying to update the status of message. Try again later.'));
                setTimeout(() => {
                    dispatch(clearNotification());
                    dispatch(clearError());
                }, 2000);
            })
            .finally(() => {
                dispatch(endUpdate());
                dispatch(populateAsync(voicemailBox));
            });
    }, 2000);
};

export const selectMessages = state => state.messages.data;
export const selectError = state => state.messages.error;
export const selectNotification = state => state.messages.notification;
export const selectMessageUpdating = state => state.messages.updating;

export default messagesSlice.reducer;
