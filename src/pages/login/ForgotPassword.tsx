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
import { forgotPasswordService } from "../../service/user-service/login-management";
import { json } from "stream/consumers";
import { useState } from "react";
import ForgotPassword_input from "./Forgotpassword_input";
import OneTimePassword from "./OneTimePassword";
import ResetPassword from "./ResetPassword";
import { toast } from 'material-react-toastify';


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


export default function ForgotPassword() {
    const navigate = useNavigate();
    async function nextForgot(values: any) {
        //  try{
        await forgotPasswordService.verifyUser_and_generate_otp(values)
            .then((response: any) => {
                if (response.data.isError) {
                    toast.error(response.data.Error);
                }
                else {
                    navigate('/otp', { state: { ...values } });
                }
            });
        //  }
        // catch(ex:any){
        //     console.log("ex:",ex);  
        //     toast.warning("Error while updatign data, check console.");
        // }
    }
    const goBack = async () => {
        navigate('/login');
    }

    const verifyUser_and_generate_otp = async (values: any) => {
    }

    const [showEmail, setShowEmail] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [showReset, setShowReset] = useState(false);


    let state = { isEmail: false, email: "", username: "", isOTP: false, OTP: "", isReset: false }
    const [previousvalue, setPreviousvalue] = React.useState(state)
    const handleClick = () => {
        state = previousvalue;
        if (!state.isEmail && !state.isOTP && !state.isReset) {
            setShowEmail(true); setShowOTP(false); setShowReset(false);
        }
        if (state.isEmail) {
            setShowEmail(false); setShowOTP(true); setShowReset(false);
        }
        if (state.isOTP) {
            setShowEmail(false); setShowOTP(false); setShowReset(true);
        }
        if (state.isReset) {
            setShowEmail(true); setShowOTP(false); setShowReset(false);
        }
    };

    return (
        <>
            {showEmail && <ForgotPassword_input handleClick={handleClick} obj={previousvalue} IsEmail={true} IsMessage={false} />}
            {showReset && <ResetPassword handleClick={handleClick} obj={previousvalue} />}
            {showOTP && <OneTimePassword handleClick={handleClick} obj={previousvalue} IsforgotPassword={true} IsRecoverUser={false} />}
        </>
    );
}