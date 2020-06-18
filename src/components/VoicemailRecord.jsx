import React from 'react';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


const VoicemailRecord = ({ status, to, from, duration }) => {

    return (
            <TableRow key={duration}>
              <TableCell align="right">{status}</TableCell>
              <TableCell align="right">{to}</TableCell>
              <TableCell align="right">{from}</TableCell>
              <TableCell align="right">{duration}</TableCell>
            </TableRow>
    );
}

export default VoicemailRecord;