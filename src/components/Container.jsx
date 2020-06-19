import React from 'react';
import { Typography } from '@material-ui/core';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import VoicemailMessages from './VoicemailMessages';
  import Voicemails from './Voicemails';

const Container = () => {
    return (
        <Router>
            <div>
                <Typography align="center" variant="h4">Voicemail Back office</Typography>
                <br />
                <Switch>
                    <Route exact path="/"><Voicemails /></Route>
                    <Route path="/messages"><VoicemailMessages /></Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Container;