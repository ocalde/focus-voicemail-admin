import React from 'react';
import VoicemailList from './VoicemailList';
import { Typography } from '@material-ui/core';

const Container = () => {
    return (
        <div>
            <Typography align="center" variant="h4">Voicemail Log</Typography>
            <br />
            <VoicemailList />
        </div>
    );
}

export default Container;