import React from 'react';
import VoicemailList from './VoicemailList';
import { Typography } from '@material-ui/core';

const Container = () => {
    return (
        <div>
            <Typography variant="h4">Voicemail Log</Typography>
            <VoicemailList />
        </div>
    );
}

export default Container;