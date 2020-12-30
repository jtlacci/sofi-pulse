import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    borderSpacing: '0 3px !important',
    borderCollapse: 'separate !important',
  },
  red: {
      color: 'red',
  },
  green: {
      color: 'green'
  }
});


export default function BasicTable() {
  const classes = useStyles();

  const [ rows, setRows ] = useState([]);

  useEffect( async () => {
    const { data } = await axios.get('/api/tokens')
    setRows(data);
    console.log(data);
  }, []);

  return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow component={Card}>
            <TableCell align="left">SOFI PULSE</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Chain</TableCell>
            <TableCell align="left">Symbol</TableCell>
            <TableCell align="left">MarketCap</TableCell>
            <TableCell align="right">1 Day %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={row.id} component={Card}>
              <TableCell align="center" component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{'Ethereum'}</TableCell>
              <TableCell align="left">{'$' + row.symbol.toUpperCase()}</TableCell>
              <TableCell align="left">{'$' + Number(row.marketcap).toLocaleString()}</TableCell>
              <TableCell className={(Number(row.dayChange) > 0) ? classes.green : classes.red} align="right">{(row.dayChange?.toFixed(2) || '?') + '%' }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}