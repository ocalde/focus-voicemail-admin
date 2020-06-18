import React, { useEffect, useState } from 'react';
import VoicemailMessage from './VoicemailRecord';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import utils from './../utils';

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

  const fetchMessages = async () => {
    try {
      const messages = await utils.fetchVoicemailMessages();
      return messages.data;
    } catch(e) {
      console.log(e);
    }
  };

const VoicemailList = () => {
    const [ messages, setMessages ] = useState([]);
    useEffect(() => {
      fetchMessages().then(data => {
        setMessages(data);
      });
    }, []);

    const classes = useStyles();

    if(messages && messages.length > 0) {
      return (
          <TableContainer component={Paper}>
              <Table className={classes.table} stickyHeader size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>To</TableCell>
                      <TableCell>From</TableCell>
                      <TableCell>Duration</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {messages.map(message => <VoicemailMessage key={message.call_id} {...message} />)}
              </TableBody>
              </Table>
          </TableContainer>
      );
    } else {
      return (<span>There are no voicemail messages</span>);
    }
}

export default VoicemailList;