import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { formatDuration } from './../utils'; 

const VoicemailMessage = ({ folder: status, to, from, length: duration }) => {

    return (
            <TableRow>
              <TableCell align="center">{status}</TableCell>
              <TableCell align="right">{to}</TableCell>
              <TableCell align="right">{from}</TableCell>
              <TableCell align="right">{formatDuration(duration)}</TableCell>
            </TableRow>
    );
}

export default VoicemailMessage;