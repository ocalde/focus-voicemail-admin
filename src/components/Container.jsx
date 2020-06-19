import React from 'react';
import VoicemailMessages from './VoicemailMessages';
import { Typography } from '@material-ui/core';

const Container = () => {
    return (
        <div>
            <Typography align="center" variant="h4">Voicemail Log</Typography>
            <br />
            <VoicemailMessages />
        </div>
    );
}

export default Container;