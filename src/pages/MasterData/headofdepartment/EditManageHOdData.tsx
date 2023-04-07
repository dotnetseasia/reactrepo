import { useState,useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate, useParams } from 'react-router-dom';
import { hodServices } from '../../../service/master-service/hod-service';
import { toast } from 'material-react-toastify';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialvalues = {
    id:'',
    name:'',
    department:'',
    emailid:'',
    createdon:'',
    createdby:'',
}

function EditManageHodData() {

const [hod, setHod] = useState(initialvalues)
const { id } = useParams();
useEffect(() => {
    getHOdData();
   },[])

   const getHOdData = async () => {

    await hodServices.getHodById(id)
    .then((response: any) => {
        if (response.data.isError) {

        }
        else
            setHod(response?.data);
    });
}

const navigate = useNavigate();
const onValueChange = (e:any) =>  {
    
    setHod({...hod, [e.target.name.department.emailid.createdon.createdby]: e.target.value })
}

const addEditHodDetails = async () => {
    
    await hodServices.updateHod(hod)
    .then((response: any) => {
        if (response.data.isError) {

        }
        else{
            toast.success("Head of Department updated successfully.");
            navigate('/editmanage-hod')
        }
           
    });

   navigate('/editmanage-hod')
}
const cancelHodDetails = async () => {
    navigate('/editmanage-hod')
}

    return (
      <>
        <Grid container spacing={2} direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={6} md={6}>
                    <Item elevation={0}>
                        <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
                            Edit Hod Data
                        </Typography>
                        
                        <Box sx={{ mt: 3 }}>
                            <TextField fullWidth id="hod-name" onChange={(e) => onValueChange(e)} name="name" label="hod Name" value={hod.name} variant="standard" />
                            <TextField fullWidth id="hod-department" onChange={(e) => onValueChange(e)} name="department" label="hod Department" value={hod.department} variant="standard" />
                            <TextField fullWidth id="hod-emailid" onChange={(e) => onValueChange(e)} name="emailid" label="hod Email Id" value={hod.emailid} variant="standard" />
                            {/* <TextField fullWidth id="hod-createdon" onChange={(e) => onValueChange(e)} name="createdon" label="hod Created On" value={hod.createdon} variant="standard" />
                            <TextField fullWidth id="hod-createdby" onChange={(e) => onValueChange(e)} name="createdby" label="hod Created By" value={hod.createdby} variant="standard" /> */}

                            <Stack spacing={2} direction="row"
                                justifyContent="flex-end"
                                alignItems="center"  sx={{ mt: 3 }}>
                                <Button onClick={() => addEditHodDetails()} variant="contained" color='primary'>Update</Button> 
                                <Button onClick={() => cancelHodDetails()} variant="contained" color='primary'>Cancel</Button>
                            </Stack>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
      </>
    );
  }

export default EditManageHodData;