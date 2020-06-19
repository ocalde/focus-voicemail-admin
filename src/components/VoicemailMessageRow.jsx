import React from 'react';
import { TableRow, TableCell, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { formatDuration } from '../utils';
import { setStatusAsync, selectMessageUpdating } from '../slices/messagesSlice';
import { selectVoicemail } from '../slices/configSlice';

const VoicemailMessageRow = ({ media_id, folder: status, to, from, length: duration }) => {
  const dispatch = useDispatch();
  const updating = useSelector(selectMessageUpdating);
  const voicemail = useSelector(selectVoicemail);

  const handleChange = (event) => {
    const value = event.target.value;
    dispatch(setStatusAsync({ voicemailBox: voicemail, media_id, status: value }));
  };

    return (
            <TableRow>
              <TableCell align="center">
              <Select native value={status} disabled={media_id === updating}
                onChange={handleChange}>
                <option aria-label="None" value="" />
                <option value={'new'}>New</option>
                <option value={'saved'}>Saved</option>
                <option value={'deleted'}>Deleted</option>
              </Select>
              </TableCell>
              <TableCell align="right">{to}</TableCell>
              <TableCell align="right">{from}</TableCell>
              <TableCell align="right">{formatDuration(duration)}</TableCell>
            </TableRow>
    );
}

export default VoicemailMessageRow;