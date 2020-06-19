import React from 'react';
import { Snackbar } from '@material-ui/core';

export default function SimpleSnackbar({ open, message, isError }) {

  return (
    <div>
      <Snackbar style={{ backgroundColor: isError ? 'red' : 'white' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        message={message}
      />
    </div>
  );
}