import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { documentlistServices } from '../../../service/master-service/documentlist-services';
import { Formik } from 'formik';
import * as Yup from 'yup';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
}));


function AddDocumentList() {
    const navigate = useNavigate();
    
    const addDocumentDetails = async (values : any) => {
        await documentlistServices.createDocument(values)
            .then((response: any) => {
                if (response.data.isError) {

                }
                else
                    navigate('/editmanage-channel')
            });
    }

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string().max(255).required('Name is required')
            })}
            onSubmit={async (values, {
             
            }) => {
                try {
                    await addDocumentDetails(values);
                } catch (err) {
                    console.error(err);
                }
            }}
        >
            {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}>
                    <Grid container spacing={2} direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={12} md={4}>
                            <Item elevation={0}>
                                <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
                                    Add Master Document List Data
                                </Typography>
                                <Box sx={{ mt: 3 }}>
                                    <TextField
                                        error={Boolean(touched.name && errors.name)}
                                        fullWidth
                                        helperText={touched.name && errors.name}
                                        label="Name"
                                        margin="normal"
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.name}
                                        variant="outlined"
                                    />

                                    <Stack spacing={2} direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center" >
                                        <Button type="submit" variant="contained" color='primary' sx={{ mt: 3 }}>Submit</Button>
                                    </Stack>

                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
    );
}

export default AddDocumentList;