import * as React from "react";
import { useNavigate } from "react-router-dom"
import bgImage from "../../assests/images/login-background-img.png";
import { Link } from "react-router-dom"
import logoImage from "../../assests/images/logo.svg";
import { styled } from '@mui/material/styles';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import FormGroup from '@mui/material/FormGroup';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
import theme from '../../theme/theme'
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
const styles = {
    facingIssue: {
        color: theme.palette.grey[900],
        textDecoration: 'none',
        fontWeight: 400,
    },
    forgotPassword: {
        fontSize: 20,
        fontWeight: 300,
        color: theme.palette.grey[900],

    },
    signin: {
        color: theme.palette.grey[900],
        textDecoration: 'underline',
        fontWeight: 300,
    },
}
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

export default function LogType() {
    return (
        <>
            <Grid container component="main" >
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
                        <Typography align="left" component='h3' fontWeight={600} gutterBottom sx={{ fontSize: 40, color: theme.palette.primary.dark, }} >
                            Facing issue during login?
                        </Typography>
                        <Typography align="left" component='h4' fontWeight={300} gutterBottom >
                            Did you forgot your password or Username?
                        </Typography>
                        <List>
                            <ListItem disablePadding
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments" >
                                        <Icons.angleicon />
                                    </IconButton>
                                }  >
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: '37px' }}>
                                        <Icons.PasswordKey />
                                    </ListItemIcon>
                                    <ListItem component={Link} sx={styles.forgotPassword} to="/forgot-password" >Forgot Password?</ListItem>
                                </ListItemButton>
                            </ListItem>

                            <Divider />
                            <ListItem disablePadding
                                secondaryAction={
                                    <IconButton edge="end" aria-label="comments">
                                        <Icons.angleicon />

                                    </IconButton>
                                }>
                                <ListItemButton>
                                    <ListItemIcon sx={{ minWidth: '37px' }}>
                                        <Icons.UserName />
                                    </ListItemIcon>
                                    <ListItem component={Link} sx={styles.forgotPassword}
                                        to="/recover-username" >Recover Username?</ListItem>
                                </ListItemButton>
                            </ListItem>
                        </List>

                        <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>

                            <Box component={Link} to='/login' sx={styles.signin}>
                                Return to sign in
                            </Box>

                        </Stack>
                    </Warpper>
                    <Typography align="center" component='h4' fontWeight={300} gutterBottom >
                        {new Date().getFullYear()} Seasia All Rights Reserved
                    </Typography>

                </Grid>
            </Grid>
        </>
    );
}