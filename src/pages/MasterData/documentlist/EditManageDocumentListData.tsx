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
import { documentlistServices } from '../../../service/master-service/documentlist-services';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const initialvalues = {
    id:'',
    name:''
}

function EditManageDocumentListData() {

const [document, setDocument] = useState(initialvalues)
const { id } = useParams();
useEffect(() => {
    getUsersData();
   },[])

   const getUsersData = async () => {

    await documentlistServices.getDocumentById(id)
    .then((response: any) => {
        if (response.data.isError) {

        }
        else
            setDocument(response?.data);
    });
}

const navigate = useNavigate();
const onValueChange = (e:any) =>  {
   
    setDocument({...document, [e.target.name]: e.target.value })
}

const addEditDocumentDetails = async () => {
    
    await documentlistServices.updateDocument(document)
    .then((response: any) => {
        if (response.data.isError) {

        }
        else
            navigate('/editmanage-document')
    });

   navigate('/editmanage-document')
}

const cancelDocumentDetails = async () => {
    navigate('/editmanage-document')
}

    return (
      <>
        <Grid container spacing={2} direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12} md={4}>
                    <Item elevation={0}>
                        <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
                            Edit Master DocumentList Data
                        </Typography>
                        
                        <Box sx={{ mt: 3 }}>
                            <TextField fullWidth id="document-name" onChange={(e) => onValueChange(e)} name="name" label="document Name" value={document.name} variant="standard" />

                            <Stack spacing={2} direction="row"
                                justifyContent="flex-end"
                                alignItems="center"  sx={{ mt: 3 }}>
                                <Button onClick={() => addEditDocumentDetails()} variant="contained" color='primary'>Update</Button>
                                <Button onClick={() => cancelDocumentDetails()} variant="contained" color='primary'>Cancel</Button>
                            </Stack>
                        </Box>
                    </Item>
                </Grid>
            </Grid>
      </>
    );
  }

export default EditManageDocumentListData;