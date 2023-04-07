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
const styles = {
    facingIssue: {
        color: theme.palette.grey[900],
        textDecoration: 'none',
        fontWeight: 400,
        fontSize: 40,
    }
}
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


export default function RecoverUsername_input(props: { handleClick: () => void, obj: any, IsEmail: boolean, IsMessage: boolean }) {
    const navigate = useNavigate();
    const [previousvalue, setPreviousvalue] = useState(props.obj)
    const [errorMessage, setErrorMessage] = useState('');
    async function nextForgot(values: any) {
        //  try{
        
        //   }
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
            .max(50)
            .email("Please enter valid email")
            .required('Email Address is Required')
    })
    return (

        <Formik
            initialValues={{
                emailId: ''
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
                } catch (err: any) {
                    console.error(err);
                    err = JSON.parse(JSON.stringify(err));
                    if (err.status == 400) {

                        {
                            err.data.Error.map((error: any, idx: any) => (
                                toast.error(error)
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
                    onSubmit={handleSubmit}
                >
                    <Grid container component="main" >
                        <LoginLeftsection />

                        <Grid item sm={12} md={6} component={Paper} elevation={0} square >
                            {props.IsEmail && <Warpper sx={{
                                [theme.breakpoints.down('xl')]: {
                                    px: 12
                                },
                                [theme.breakpoints.up('xl')]: {
                                    px: 8
                                }, [theme.breakpoints.down('md')]: {
                                    px: 4
                                },
                            }}>
                                <Typography align="left" component='h3' fontWeight={600} gutterBottom sx={{ fontSize: 40, color: theme.palette.primary.dark, mb: 1 }}>
                                    Recover Username
                                </Typography>
                                <Typography align="left" component='h4' fontWeight={300} gutterBottom >
                                    Enter your official email id.
                                </Typography>
                                <FieldWrapper>
                                    <TextField
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
                                {errorMessage && (<p style={{ color: "red" }} className="error"> {errorMessage} </p>)}
                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <Button variant="outlined" onClick={() => goBack()}>Cancel</Button>
                                    <Button type="submit" color='primary' variant="contained" sx={{ mt: 3 }}>Next</Button>
                                    {/* <Button onClick={() => proceedForgotPassword()} variant="contained" color='primary' sx={{ mt: 3 }}>Submit</Button> */}
                                </Stack>
                            </Warpper>}
                            {props.IsMessage && <Warpper sx={{ px: 4 }}>
                                <Typography align="left" component='h4' fontWeight={300} gutterBottom >
                                    A username recovery email has been sent to the email address associated with the email id entered.
                                    If you do not receive an email, contact the system admin.
                                </Typography>

                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <Button onClick={() => goBack()} variant="contained" color='primary' sx={{ mt: 3 }}>Okay</Button>
                                </Stack>
                            </Warpper>}
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