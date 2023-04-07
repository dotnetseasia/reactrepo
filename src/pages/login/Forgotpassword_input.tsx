import * as React from "react";
import { useNavigate } from "react-router-dom"
import bgImage from "../../assests/images/login-background-img.png";
import logoImage from "../../assests/images/logo.svg";
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { login } from '../../service/auth-service';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import * as Icons from '../../assests/icons/icons';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Stack from '@mui/material/Stack';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import { forgotPasswordService, recoverUsernameService } from "../../service/user-service/login-management";
import { useState } from "react";
import theme from '../../theme/theme'
import { toast } from 'material-react-toastify';
import LoginLeftsection from "./LoginLeftsection";
const Warpper = styled(Box)((props) => ({
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh -  30px)',
    flexDirection: 'column',
    maxWidth: 600,
    margin: '0 auto',
    [props.theme.breakpoints.down("md")]: {
        maxWidth: '100%',
        height: 'auto',
    },
}));

const FieldWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'flex-end',
})
const styles ={
   headingsColor:{
        color: theme.palette.grey[800],
       
    }
}
const LogoWrapper = styled(Box)(({ theme }) => ({
    // const LogoWrapper =  styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
    color: '#fff',
    padding: '15px 50px 0 50px',
    [theme.breakpoints.down("sm")]: {
        marginBottom: '1rem',
        padding: '15px 20px 0 20px',

        '& img': {
            margin: 'auto',
        }
    },

}))

const CssBox = styled(Box)((props) => ({
    display: 'flex',
    height: 'calc(100vh - 88px)',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
    color: '#fff',
    padding: '15px 50px 0 110px',
    [props.theme.breakpoints.down("md")]: {
        height: 'auto',
        padding: '15px 20px 0 20px',
    },
}));

export default function ForgotPassword_input(props:{handleClick:()=> void,obj:any, IsEmail:boolean,IsMessage:boolean}) {
    const navigate = useNavigate();
   const [previousvalue, setPreviousvalue]=useState(props.obj)
   const [errorMessage, setErrorMessage] = useState('');
    async function nextForgot(values: any) { 
     //   try{
        await forgotPasswordService.verifyUser_and_generate_otp(values)
            .then(async(response: any) => {
                if (response.data.isError) {
                    toast.error(response.data.Error);
                }
                else {
                    previousvalue.isEmail = true;
                    previousvalue.email = values.emailId;
                    previousvalue.username = values.username;
                    previousvalue.isOTP = false;
                    previousvalue.OTP = "";
                    previousvalue.isReset = false;
                    await setPreviousvalue(previousvalue);
                    await props.handleClick();
                }
            });
   // }
    // catch(ex:any){
    //     console.log("ex:",ex);  
    //     toast.warning("Error while updatign data, check console.");
    // }
}
    const goBack = async () => {
        navigate('/login');
    }
    const fieldValidationSchema = Yup.object().shape({
        emailId: Yup
          .string()
          .max(50,"Email-id must be at most 50 characters")
          .email("Please enter valid email")
          .required('Email Address is Required'),
        username: Yup.string().max(20,'User name can only contain 20 Alphabets')
        .matches(/^[0-9A-Za-z\s]+$/,'User name can only contain alpha-numeric.')
        .required('User name is Required'),
      })
    return (

        
        <Formik
            initialValues={{
                username: '',
                emailId: ''
                // submit: null
            }}
            validationSchema={fieldValidationSchema}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    setErrorMessage("");
                    await nextForgot(values);
                } catch (err:any) {
                    console.error(err);
                    err=JSON.parse(JSON.stringify(err));
                    if(err.status==400){
                      
                        {err.data.Error.map((error:any,idx:any) => (
                            toast.error(error)
                            ))}
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
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={2} component="main" >
                    <LoginLeftsection />
                       
                        <Grid item sm={12} md={6} component={Paper} elevation={0} square >
                            <Warpper sx={{
                                [theme.breakpoints.down('xl')]: {
                                    px: 12
                                },
                                [theme.breakpoints.up('xl')]: {
                                    px: 8
                                }, [theme.breakpoints.down('md')]: {
                                    px: 4
                                },
                            }}>
                                <Typography align="left" component='h3' fontWeight={600} gutterBottom sx={{ fontSize: 40, color: theme.palette.primary.dark, }}>
                                    Forgot Password?
                                </Typography>
                                <Typography sx={styles.headingsColor} align="left" component='h4' fontWeight={300} gutterBottom >
                                Did you forgot your password?
                                </Typography>
                                <FieldWrapper sx={{ mt: 1, mb: 2 }}>
                                    <TextField
                                        required
                                        error={Boolean(touched.username && errors.username)}
                                        fullWidth
                                        helperText={touched.username && errors.username}
                                        placeholder="Username"
                                        margin="normal"
                                        name="username"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.username}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icons.UserName /></InputAdornment>,
                                        }}
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <TextField
                                    required
                                        error={Boolean(touched.emailId && errors.emailId)}
                                        fullWidth
                                        helperText={touched.emailId && errors.emailId}
                                        // label="Email"
                                        placeholder="Email"
                                        margin="normal"
                                        name="emailId"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="text"
                                        value={values.emailId}
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icons.Email /></InputAdornment>,
                                        }}
                                    />
                                </FieldWrapper>
                                {errorMessage && (<p style={{color:"red"}} className="error"> {errorMessage} </p>)}
                                <Typography align="left" variant="subtitle2" component='h1' fontWeight={300} gutterBottom sx={{ mt: 2 ,color: theme.palette.grey[800] }}>
                                    Note: OTP will be sent to the official email Id.
                                </Typography>
                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <Button variant="outlined" onClick={() => goBack()}>Cancel</Button>
                                    <Button type="submit" color='primary' variant="contained" sx={{ mt: 3 }}>Next</Button>
                                    {/* <Button onClick={() => proceedForgotPassword()} variant="contained" color='primary' sx={{ mt: 3 }}>Submit</Button> */}
                                </Stack>
                            </Warpper>
                            <Typography align="center" component='h4' fontWeight={300} gutterBottom >
                                {new Date().getFullYear()} Seasia All Rights Reserved
                            </Typography>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Formik>
         
    );
}