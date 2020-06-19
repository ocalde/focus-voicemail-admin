import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Table, TableBody, TableHead, TableRow, TableCell } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import VoicemailMessageRow from './VoicemailMessageRow';
import { fetchVoicemailMessages } from '../fetchUtils';
import { populate, selectMessages } from '../slices/messagesSlice';

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

const VoicemailMessages = () => {
    const messages = useSelector(selectMessages);
    const dispatch = useDispatch();
    
    const fetchMessages = async () => {
      try {
        const messages = await fetchVoicemailMessages();
        const payload = await messages.data;
        dispatch(populate(payload));
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
              <Button variant="contained" color="primary" onClick={fetchMessages}>Refresh</Button>
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
                  {messages.map(message => <VoicemailMessageRow key={message.media_id} {...message} />)}
              </TableBody>
              </Table>
            </Paper>
      );
    } else {
      return (<span>There are no voicemail messages</span>);
    }
}

export default VoicemailMessages;