import * as React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assests/images/login-background-img.png";
import logoImage from "../../assests/images/logo.svg";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../../service/auth-service";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import * as Icons from "../../assests/icons/icons";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Stack from "@mui/material/Stack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { changePasswordService } from "../../service/auth-service";
import { useState } from "react";
import { toast } from "material-react-toastify";
import theme from "../../theme/theme";
import LoginLeftsection from "./LoginLeftsection";
import { useSelector } from "react-redux";
const Warpper = styled(Box)((props) => ({
  display: "flex",
  justifyContent: "center",
  height: "calc(100vh -  200px)",
  flexDirection: "column",
  maxWidth: 600,
  margin: "0 auto",
  [props.theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    height: "auto",
  },
}));

const FieldWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const LogoWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
  color: "#fff",
  padding: "15px 50px 0 50px",
  [theme.breakpoints.down("sm")]: {
    marginBottom: "1rem",
    padding: "15px 20px 0 20px",

    "& img": {
      margin: "auto",
    },
  },
}));

const CssBox = styled(Box)((props) => ({
  display: "flex",
  height: "calc(100vh - 88px)",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
  color: "#fff",
  padding: "15px 50px 0 110px",
  [props.theme.breakpoints.down("md")]: {
    height: "auto",
    padding: "15px 20px 0 20px",
  },
}));

export default function ChangePassword() {
  const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);
  var userId =_authUser.id;
  setTimeout(() => {
    if (!userId) {
      navigate("/login");
    }
  }, 1000);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  async function handleChange(values: any) {
    // try {
    await changePasswordService
      .changePassword(values)
      .then(async (response: any) => {
        if (response.data.isError) {
          toast.error(response.data.Error);
        } else {
          navigate("/login");
        }
      });
    //  }
    // catch (ex: any) {

    //     toast.warning("Error while updatign data, check console.");
    // }
  }
  const goBack = async () => {
    navigate("/dashboard");
  };
  return (
    <Formik
      initialValues={{
        id: userId,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        // .max(55, 'Achievement can only contain 55 Alphabets').matches(/^([A-Za-z\s]*)$/g,
        //         'Achievement can only contain alphabets.')
        id: Yup.string().required("UserId is required"),
        // oldPassword: Yup.string().required("Old password is required"),
        // newPassword: Yup.string().required("New Password is required"),
        // confirmPassword: Yup.string()
        //   .required("Confirm Password is required")
        //   .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
        oldPassword: Yup.string()
          .min(8, "Old Password must not be less than 8 characters")
          .max(55, "Old Password Should be contain only contain 25 Alphabets")
          // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])/, {
          //   message:
          //     "Old Password must be at least one uppercase, one lowercase, one special character and one number.",
          // })
          // .matches(
          //   /^([A-Za-z\s]*)$/g,
          //   "Old Password can only contain both alphabets & numeric."
          // )
          .required("Old password is required"),
        newPassword: Yup.string()
          .min(8, "New Password must not be less than 8 characters")
          .max(55, "New Password Should be contain only contain 25 Alphabets")
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=])/, {
            message:
              "New Password must be at least one uppercase, one lowercase, one special character and one number.",
          })
          .required("New Password is required"),
        confirmPassword: Yup.string()
          .min(8, "Confirm Password must not be less than 8 characters")
          .max(
            55,
            "Confirm Password Should be contain only contain 25 Alphabets"
          )
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&+=])/, {
            message:
              "Confirm Password must be at least one uppercase, one lowercase, one special character and one number.",
          })
          .required("Confirm Password is required")
          .oneOf([Yup.ref("newPassword"), null], "Confirm password does not match with the new password."),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setErrorMessage("");
          await handleChange(values);
        } catch (err: any) {
          console.error(err);
          err = JSON.parse(JSON.stringify(err));
          if (err.status == 400) {

            {
              err.data.Error.map((error: any, idx: any) => toast.error(error));
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
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Paper elevation={0} sx={{ p: 2, pb: 3, position: "relative" }}>
            <Typography
              align="left"
              component="h3"
              fontWeight={600}
              gutterBottom
              sx={{ fontSize: 21 }}
            >
              Change Password?
            </Typography>
            <Typography

              align="left"
              variant="subtitle2"
              component="h1"
              sx={{ mt: 2, color: theme.palette.grey[400] }}
            >
              Note: 1. Password must not be less than 8 characters.<br></br>
              2. Must have one special character and a number.
            </Typography>
            <Box sx={{ mx: "auto", mt: 2, maxWidth: "460px" }}>
              <Grid container direction="column" spacing={2}>

                <Grid item sm={12} md={6}>
                  <TextField
                    error={Boolean(touched.oldPassword && errors.oldPassword)}
                    fullWidth
                    helperText={touched.oldPassword && errors.oldPassword}
                    label="Old Password"
                    margin="normal"
                    name="oldPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.oldPassword}
                    variant="outlined"
                    inputProps={{ minLength: 8 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icons.PasswordKey />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    error={Boolean(touched.newPassword && errors.newPassword)}
                    fullWidth
                    helperText={touched.newPassword && errors.newPassword}
                    label="New Password"
                    margin="normal"
                    name="newPassword"
                    onBlur={handleBlur}
                    inputProps={{ minLength: 8 }}
                    onChange={handleChange}
                    type="password"
                    value={values.newPassword}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icons.PasswordKey />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item sm={12} md={6}>
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm Password"
                    margin="normal"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    inputProps={{ minLength: 8 }}
                    value={values.confirmPassword}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icons.PasswordKey />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {/* <Grid item>
                  {errorMessage && (
                    <p style={{ color: "red" }} className="error">
                      {" "}
                      {errorMessage}{" "}
                    </p>
                  )}
                </Grid> */}

                <Grid item sx={{textAlign:'right'}}> 
                  <Button variant="outlined" onClick={() => goBack()}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    sx={{ml:1.5}}

                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </form>
      )
      }
    </Formik >
  );
}
