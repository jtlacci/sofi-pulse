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
import useMediaQuery from '@material-ui/core/useMediaQuery';

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


export default function BasicTable({initialData}) {
  const classes = useStyles();
  const isDesktop = useMediaQuery('(min-width:600px)');

  const [ rows, setRows ] = useState(initialData || []);

  useEffect( async () => {
    console.log(initialData);
    const { data } = await axios.get('/api/tokens')
    setRows(data);
  }, []);

  return (
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow component={Card}>
            <TableCell align="center">SOFI PULSE</TableCell>
            <TableCell align="left">Name</TableCell>
            {isDesktop && <TableCell align="left">Chain</TableCell>}
            <TableCell align="left">Symbol</TableCell>
            {isDesktop && <TableCell align="left">MarketCap</TableCell>}
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
              {isDesktop && <TableCell align="left">{'Ethereum'}</TableCell>}
              <TableCell align="left">{'$' + row.symbol?.toUpperCase()}</TableCell>
              {isDesktop && <TableCell align="left">{'$' + Number(row.marketcap).toLocaleString()}</TableCell>}
              <TableCell className={(Number(row.dayChange) > 0) ? classes.green : classes.red} align="right">{(row.dayChange?.toFixed(2) || '?') + '%' }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
  );
}
