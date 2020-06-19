import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { populateAsync, selectVoicemails } from '../slices/voicemailsSlice';
import { setVoicemail } from '../slices/configSlice';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    table: {
        maxWidth: 300,
    },
    layout: {
        width: 300,
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(300 + theme.spacing(2) * 2)]: {
            width: 300,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
}));

const VoicemailMessages = () => {
    const voicemails = useSelector(selectVoicemails);
    const dispatch = useDispatch();
    let history = useHistory();

    const selectVoicemail = (voicemailId) => {
        dispatch(setVoicemail(voicemailId));
        history.push("/messages");
    }

    useEffect(() => {
        dispatch(populateAsync());
    }, []);

    const classes = useStyles();

    if (voicemails && voicemails.length > 0) {
        return (
            <Paper className={classes.layout}>
                <Typography align="center" variant="h5">Voicemail boxes</Typography>
                <List component="nav" aria-label="main mailbox folders">
                    {voicemails.map(voicemail => (
                        <ListItem key={voicemail.id} button onClick={() => selectVoicemail(voicemail.id)}>
                            <ListItemText primary={voicemail.name} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        );
    } else {
        return (<span>There are no voicemail boxes</span>);
    }
}

export default VoicemailMessages;