import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../src/Header';
import List from '../src/List';
import axios from 'axios'
import { main } from './api/tokens'

export default function Index({initialData}) {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Header/>
        <List initialData={initialData} />
      </Box>
    </Container>
  );
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts
  const initialData  = await main()
  console.log(initialData);
  return {
    props: {
      initialData
    },
  }
}
