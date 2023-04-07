import * as React from "react";
import { useNavigate, Navigate } from "react-router-dom"
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
import { useLocation } from 'react-router-dom';
import { useState } from "react";
import { toast } from 'material-react-toastify';
import theme from '../../theme/theme';
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
    alignItems: 'center',
})

const LogoWrapper = styled(Box)(({ theme }) => ({
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
export default function ResetPassword(props: { handleClick: () => void, obj: any }) {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [previousvalue, setPreviousvalue] = useState(props.obj)
    async function nextResetPassword(values: any) {
       // try{
        
  //  }
    // catch(ex:any){
    //     console.log("ex:",ex);  
    //     toast.warning("Error while updatign data, check console.");
    // }
}
    const goBack = async () => {
        navigate('/login');
    }

    return (
        <Formik
            initialValues={{
                password: '',
                cPassword: '',
                username: previousvalue.username,
                otp: previousvalue.OTP
            }}
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is required'),
                password: Yup.string().required('New Password is required')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/, {
                    message:
                      "New Password must be at least one uppercase, one lowercase, one special character and one number.",
                  }),
                cPassword: Yup.string().required('Confirm Password is required').oneOf([Yup.ref('password'), null], 'Passwords must match.')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/, {
                    message:
                      "New Password must be at least one uppercase, one lowercase, one special character and one number.",
                  }),
            })}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting
            }) => {
                try {
                    setErrorMessage("");
                    await nextResetPassword(values);
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
                    <Grid container   component="main" >
                    <LoginLeftsection />
                        {/* <Grid
                            item
                            sm={12}
                            md={6}
                            sx={{
                                backgroundImage: `url(${bgImage})`,
                                backgroundRepeat: "no-repeat",
                                backgroundColor: (t) =>
                                    t.palette.mode === "light"
                                        ? t.palette.grey[50]
                                        : t.palette.grey[900],
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <LogoWrapper>
                                <img src={logoImage} alt="" />
                            </LogoWrapper>
                            <CssBox>
                                <Typography align="left" variant="h6" component='h2'fontWeight={300} gutterBottom sx={{ fontSize: 30,}}  >
                                    A System Which Provides
                                </Typography>
                                <Typography align="left" variant="h2" component='h1' fontWeight={600} gutterBottom >
                                    Real Time Productivity
                                </Typography>
                            </CssBox>
                        </Grid> */}
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
                                <Typography align="left" component='h3' fontWeight={600} gutterBottom sx={{ fontSize: 40 }}>
                                    Reset Password?
                                </Typography>
                                <Typography align="left" component='h4' fontWeight={300} gutterBottom >
                                    Change your password.
                                </Typography>
                                <FieldWrapper sx={{ mt: 3, mb: 4 }}>
                                    <TextField
                                        error={Boolean(touched.password && errors.password)}
                                        fullWidth
                                        helperText={touched.password && errors.password}
                                        // label="Password"
                                        placeholder=" New Password"
                                        margin="normal"
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.password}
                                        variant="outlined"
                                        inputProps={{ minLength: 8 }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icons.PasswordKey /></InputAdornment>,
                                        }}
                                    />
                                </FieldWrapper>
                                <FieldWrapper>
                                    <TextField
                                        error={Boolean(touched.cPassword && errors.cPassword)}
                                        fullWidth
                                        helperText={touched.cPassword && errors.cPassword}
                                        // label="Confirm Password"
                                        placeholder="Confirm Password"
                                        margin="normal"
                                        name="cPassword"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="password"
                                        value={values.cPassword}
                                        variant="outlined"
                                        inputProps={{ minLength: 8 }}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"><Icons.PasswordKey /></InputAdornment>,
                                        }}
                                    />

                                </FieldWrapper>
                                {errorMessage && (<p style={{ color: "red" }} className="error"> {errorMessage} </p>)}
                                <Typography style={{ color: "red" }} align="left" variant="subtitle2" component='h1' gutterBottom sx={{ mt: 2 }}>
                                    Note: 1. Password must not be less than 8 characters.<br></br>
                                     2. Must have one special character and a number.
                                </Typography>
                                <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                                    <Button variant="outlined" onClick={() => goBack()}>Cancel</Button>
                                    <Button type="submit" color='primary' variant="contained" sx={{ mt: 3 }}>Submit</Button>
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