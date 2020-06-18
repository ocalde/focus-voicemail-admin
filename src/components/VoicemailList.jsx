import React, { useEffect, useState } from 'react';
import VoicemailMessage from './VoicemailRecord';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/core/styles';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import utils from './../utils';
import { Paper } from '@material-ui/core';
import { Button } from '@material-ui/core';

  const useStyles = makeStyles((theme) => ({
    table: {
     maxWidth: 1000,
    },
    layout: {
      width: 1000,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(1000 + theme.spacing(2) * 2)]: {
        width: 1000,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  }));

  

const VoicemailList = () => {
    const [ messages, setMessages ] = useState([]);

    const fetchMessages = async () => {
      try {
        const messages = await utils.fetchVoicemailMessages();
        const payload = await messages.data;
        setMessages(payload);
      } catch(e) {
        console.log(e);
      }
    };

    useEffect(() => {
      fetchMessages();
    }, []);

    const classes = useStyles();

    if(messages && messages.length > 0) {
      return (
          <Paper className={classes.layout}>
              <Button variant="contained" color="primary" onClick={() => fetchMessages()}>Refresh</Button>
              <br /><br />
              <Table className={classes.table} stickyHeader size="small" aria-label="a dense table">
              <TableHead>
                  <TableRow>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">To</TableCell>
                      <TableCell align="center">From</TableCell>
                      <TableCell align="center">Duration</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {messages.map(message => <VoicemailMessage key={message.call_id} {...message} />)}
              </TableBody>
              </Table>
            </Paper>
      );
    } else {
      return (<span>There are no voicemail messages</span>);
    }
}

export default VoicemailList;