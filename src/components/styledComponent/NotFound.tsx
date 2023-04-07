import * as React from 'react';
// import { makeStyles } from '@mui/styles';
import theme from '../../theme/theme';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import pablita from '../../assests/images/pablita-page-not-found.png';
import ItemPaper from "../../components/styledComponent/ItemPaper";
import { Typography } from "@mui/material";


interface NotFound {
    NotfoundText: string;
}




export default function NotFound(props: NotFound) {
    // const classes = useStyles();

    return (

        <ItemPaper elevation={0} sx={{ mt: 2, p: 4, height: 'calc(100vh - 250px)', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h5" align="center" component="p" sx={{ fontWeight: 500, color: theme.palette.grey[400] }}>
                <Box> <img src={pablita} /></Box>
                <Box sx={{ mt: 1 }}>{props.NotfoundText}</Box>
            </Typography>
        </ItemPaper>
        // <p >
        //   <Stack direction="row" spacing={2}>
        //     <Box sx={{ mr: 2 }}><svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        //       <ellipse cx="3" cy="3.5" rx="3" ry="3.5" fill="#1DA7FF" />
        //     </svg></Box>    {props.documentInfo}
        //   </Stack>
        // </p>


    );
}













