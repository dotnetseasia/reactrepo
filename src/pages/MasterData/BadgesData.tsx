import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialvalues = {
    name:''
}

function BadgesData() {

const [badges, setBadges] = useState(initialvalues)
const onValueChange = (e:any) =>  {
   
    setBadges({...badges, [e.target.name]: e.target.value })
    
}

const addBadgesDetails = async () => {

}

    return (
      <>
        <Grid container spacing={2} direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6} md={6}>
                    <Item elevation={0}>
                        <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
                            Add Master Badges Data
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <TextField fullWidth id="user-name" onChange={(e) => onValueChange(e)} name="name" label="Badges Name" variant="standard" />
                            <Stack spacing={2} direction="row"
                                justifyContent="flex-end"
                                alignItems="center" >
                                <Button onClick={() => addBadgesDetails()} variant="contained" color='primary' sx={{ mt: 3 }}>Submit</Button>
                            </Stack>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
      </>
    );
  }

export default BadgesData;