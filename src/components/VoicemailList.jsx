import React from 'react';
import VoicemailRecord from './VoicemailRecord';
import dummyData from './dummyData';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';

  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });

const VoicemailList = () => {

    const classes = useStyles();

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
                {dummyData.map(record => <VoicemailRecord {...record} />)}
            </TableBody>
            </Table>
        </TableContainer>
    );
}

export default VoicemailList;