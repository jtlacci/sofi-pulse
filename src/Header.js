import React from 'react';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#f3f1f2',
  }
})

export default function Header() {

  const { heading } = useStyles();

  return (
      <div className={heading}>
        <Typography className={heading} variant="h2" align='center' component="h1" center gutterBottom>
          SoFi Pulse Index
        </Typography>
        <Typography  variant="h5" align='center' component="h5" center gutterBottom>
          What is SoFi Pulse?
        </Typography>
        <Typography  variant="h5" align='center' component="h5" center gutterBottom>
          SoFi is the social layer to DeFi.
        </Typography>
        <Typography  variant="h5" align='center' component="h5" center gutterBottom>
          Social Tokens, DAO Tokens, and Community Tokens.
        </Typography>
        <br/>
      </div>

  );
}
