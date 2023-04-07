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
import { useState } from 'react';
import RecoverUsername_input from "./Recoverusername_input";
import OneTimePassword from "./OneTimePassword";



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
    padding: '15px 50px 0 50px',
    [props.theme.breakpoints.down("md")]: {
        height: 'auto',
        padding: '15px 20px 0 20px',
    },
}));

export default function RecoverUsername() {
    const [showEmail, setShowEmail] = useState(true);
    const [showOTP, setShowOTP] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    let state = { isEmail: false, email: "", username: "", isOTP: false, OTP: "", isMessage: false }
    const [previousvalue, setPreviousvalue] = React.useState(state)
    const handleClick = () => {
        state = previousvalue;
        if (!state.isEmail && !state.isOTP && !state.isMessage) {
            setShowEmail(true); setShowOTP(false); setShowMessage(false);
        }
        if (state.isEmail) {
            setShowEmail(false); setShowOTP(true); setShowMessage(false);
        }
        if (state.isOTP) {
            setShowEmail(false); setShowOTP(false); setShowMessage(true);
        }
        if (state.isMessage) {
            setShowEmail(true); setShowOTP(false); setShowMessage(false);
        }

    };
    const navigate = useNavigate();
    return (
        <>
            {showEmail && <RecoverUsername_input  handleClick={handleClick} obj={previousvalue} IsEmail={true} IsMessage={false}/>}
            {showMessage && <RecoverUsername_input handleClick={handleClick} obj={previousvalue} IsEmail={false} IsMessage={true}/>}
            {showOTP && <OneTimePassword handleClick={handleClick} obj={previousvalue} IsforgotPassword={false} IsRecoverUser={true}/>}
        </>
    );
}