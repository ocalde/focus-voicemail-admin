import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Table, TableBody, TableHead, TableRow, TableCell, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VoicemailMessageRow from './VoicemailMessageRow';
import { populateAsync, selectMessages, selectError, selectNotification, populate } from '../slices/messagesSlice';
import { selectVoicemail, setVoicemail } from '../slices/configSlice';
import SimpleSnackbar from './SimpleSnackbar';

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 1000,
        marginTop: '1em'
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
    const voicemail = useSelector(selectVoicemail);
    const error = useSelector(selectError);
    const notification = useSelector(selectNotification);
    
    const dispatch = useDispatch();
    let history = useHistory();

    const selectAnotherVoicemail = () => {
        dispatch(setVoicemail(null));
        dispatch(populate([]));
        history.push("/");
    }

    useEffect(() => {
        dispatch(populateAsync(voicemail));
    }, []);

    const classes = useStyles();

    const messagesTable = () => [
        <Typography key="k1" align="center" variant="h5">Voicemail messages</Typography>,
        <Table key="k2" className={classes.table} stickyHeader size="small" aria-label="a dense table">
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
    ];

    const noRecordsFound = () => (
        <div>There are no voicemail messages</div>
    );

    return (
        <Paper className={classes.layout}>
            <Button variant="contained" size="small" color="primary" onClick={() => dispatch(populateAsync())}>Refresh</Button>
            &nbsp;&nbsp;
            <Button variant="contained" size="small" onClick={selectAnotherVoicemail}>Voicemails</Button>
            {(messages && messages.length > 0) ? messagesTable() : noRecordsFound()}
            <SimpleSnackbar open={notification ? true : false } message={notification} isError={error} />
        </Paper>
    );
}

export default VoicemailMessages;