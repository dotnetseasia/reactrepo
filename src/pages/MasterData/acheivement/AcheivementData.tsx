import { useState } from 'react';
// import { FormControl, FormGroup, InputLabel, Input } from '@mui/material';
// import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Icon, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate, Navigate } from 'react-router-dom';
import { achievementService } from '../../../service/master-service/achievement-service';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as Icons from '../../../assests/icons/icons'
import { toast } from 'material-react-toastify';
import { UploadFile } from '@mui/icons-material';
import theme from '../../../theme/theme';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


interface Files {
    type: string;
    file: Blob;
}

function AchievementData() {
    const [errorMessage, setErrorMessage] = useState('');

    const [skill, setSkill] = useState('achievementName')
    const [name, setName] = useState("");
    const navigate = useNavigate();
    // const onValueChange = (e:any) =>  {
    //     console.log(e.target.name ,e.target.value)
    //     setUser({...values.name, [e.target.name]: e.target.value })
    //     console.log(user);
    // }




    const [selectedFiles, setSelectedFiles] = useState<Files[]>([])
    const [fileHook, setFileHook] = useState<any>(null);
    const [formValues, setFormValues] = useState([{ name: "" }]);
    const [fileUrlHook, setFileUrlHook] = useState<any>(null)

    async function handleChange1(e: any) {
        setFileHook(e.target.files[0]);
        setFileUrlHook(URL.createObjectURL(e.target.files[0]));
        var filese_array = [...selectedFiles];
        filese_array = [...selectedFiles, { type: "Test", file: e.target.files[0] }];
        setSelectedFiles(filese_array);
       
    }

    let removeFormFields = (i: any) => {
        var filese_array = [...selectedFiles];
        filese_array.splice(i, 1);
        setSelectedFiles(filese_array);
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
    };



    const addAchievementDataDetails = async (values: any) => {
        try {
            await achievementService.createAchievement(values)
                .then((response: any) => {
                    if (response.data.isError) {

                    }
                    else {
                        toast.success('Achievement added successfully.');
                        navigate('/manageachievement')
                    }
                });
        }
        catch (ex: any) {
          
            ex.data.Error.map((err: any, idx: any) => {
                toast.warning(err);
            });
        }
    }



    const cancelbutton = async () => {
        navigate("/manageachievement");
    };

    const fieldValidationSchema = Yup.object().shape({
        achievementName: Yup
            .string()
            .max(55, 'Achievement can only contain 55 Alphabets').matches(/^([A-Za-z\s]*)$/g,
                'Achievement can only contain alphabets.')
            .required('Achievement is required'),

    })


    return (
        <Formik
            initialValues={{
                achievementName: '',

            }}
            validationSchema={fieldValidationSchema}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting,

            }) => {
                try {
                    setErrorMessage("");
                    await addAchievementDataDetails(values);
                } catch (err: any) {
                    console.error(err);
                    err = JSON.parse(JSON.stringify(err));
                    if (err.status == 400) {
                       
                        {
                            err.data.Error.map((error: any, idx: any) => (
                                setErrorMessage(error)
                            ))
                        }
                    }
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
                        <Grid item xs={12} md={6}>
                            <Item elevation={0}>
                                <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
                                    Add Achievement
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        error={Boolean(touched.achievementName && errors.achievementName)}
                                        fullWidth
                                        helperText={touched.achievementName && errors.achievementName}
                                        label="Enter your Achievement"
                                        margin="normal"
                                        name="achievementName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.achievementName}
                                        variant="outlined"
                                    />
                                    <Typography variant="overline" fontWeight={500} align="left" display="block" sx={{ mt: 2 }}>
                                        Upload  Achievement
                                    </Typography>
                                    <Stack direction='row' alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>

                                        <Box >
                                            <Button variant="outlined" component="label" startIcon={<Icons.Upload />}>
                                                Upload
                                                <input hidden id={"file_"} name={"file_"} onChange={handleChange1} accept="image/*" multiple type="file" />
                                            </Button>
                                        </Box>

                                        <Stack key={"attachment_" + 0} direction="row" spacing={3} sx={{ borderBottom: '1px solid', borderColor: theme.palette.grey[200], py: 2 }}>

                                            {selectedFiles.length > 0 ? (
                                                <>
                                                    <Button
                                                        style={{
                                                            borderRadius: 15,
                                                            backgroundColor: "#21b6ae",
                                                            padding: "10px 15px",
                                                            fontSize: "12px"
                                                        }}
                                                        variant="contained"
                                                    >File Attached</Button>  <Button key={"btnRemove_" + 0} endIcon={< Icons.Delete />} sx={{ my: 2 }} color="error" onClick={() => removeFormFields(0)}>Remove </Button>
                                                </>
                                            ) : null}
                                        </Stack>


                                        <Typography variant="overline" fontWeight={500} display="block" >
                                            OR
                                        </Typography>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <TextField
                                                fullWidth
                                                id="outlined-basic"
                                                label="Add Url"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Stack>
                                    <Stack spacing={2} direction="row"
                                        justifyContent="flex-end"
                                        alignItems="center" sx={{ mt: 3 }}>
                                        <Button onClick={() => cancelbutton()} variant="outlined" color="primary">Cancel</Button>
                                        <Button type="submit" variant="contained" color='primary'>Submit</Button>


                                    </Stack>

                                </Box>

                            </Item>
                        </Grid>

                    </Grid>

                    {/* </> */}
                </form>
            )}
        </Formik>
    );
}

export default AchievementData;