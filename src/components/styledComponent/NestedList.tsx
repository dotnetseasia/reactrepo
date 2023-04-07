import * as React from 'react';
// import { makeStyles } from '@mui/styles';
import theme from '../../theme/theme';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

interface NestedList {
  documentInfo: string;
}

// const useStyles = makeStyles({
//   root: {
//     listStyle: 'none',
//     marginBottom: '0.3rem',
//     color: theme.palette.grey[600],
//     fontWeight: 400,
//     fontSize: 14
//   },
// });


export default function NestedList(props: NestedList) {
  // const classes = useStyles();

  return (
    <p >
      <Stack direction="row" spacing={2}>
        <Box sx={{ mr: 2 }}><svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="3" cy="3.5" rx="3" ry="3.5" fill="#1DA7FF" />
        </svg></Box>    {props.documentInfo}
      </Stack>
    </p>


  );
}
