import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../src/Header';
import List from '../src/List';

export default function Index() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Header/>
        <List/>
      </Box>
    </Container>
  );
}
