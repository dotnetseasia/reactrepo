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
const styles = {
    headingsColor: {
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
        width: 200,
        '& img': {
            margin: 'auto',
            maxWidth: "100%"
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

export default function () {
    return (
        <>
            <Grid
                item
                xs
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
                    pb:1
                }}
            >
                <LogoWrapper>
                    <img src={logoImage} alt="" />
                </LogoWrapper>
                <CssBox>
                    <Typography align="left" component='h2' fontWeight={300} gutterBottom
                        sx={{
                            fontSize: "30px",
                            lineHeight: 1,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "21px",
                            },


                        }}>
                        A System Which Provides
                    </Typography>
                    <Typography align="left" component='h1' fontWeight={600} gutterBottom
                        sx={{
                            fontSize: "60px",
                            lineHeight: 1,
                            [theme.breakpoints.down('sm')]: {
                                fontSize: "30px",
                            },


                        }}
                    >
                        Real Time Productivity
                    </Typography>
                </CssBox>
            </Grid>
        </>

    );
}