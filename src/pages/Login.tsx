import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgImage from "../assests/images/login-background-img.png";
import logoImage from "../assests/images/logo.svg";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import * as Yup from "yup";
import { login } from "../service/auth-service";
import InputAdornment from "@mui/material/InputAdornment";
import * as Icons from "../assests/icons/icons";
import Stack from "@mui/material/Stack";
import theme from "../theme/theme";
import { ToastContainer, toast } from "material-react-toastify";
import { AppConstants } from "../config/AppConstants";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginLeftsection from "../pages/login/LoginLeftsection";
import  secureLocalStorage  from  "react-secure-storage";
import { useDispatch, useSelector } from 'react-redux'
import { FillUser, EmptyUser } from '../store/authUser';
import { addMenu, EmptyMenu } from '../store/menu';
import { roleManagementServive } from "../service/role-management-service";
import { useCookies } from 'react-cookie';
import dayjs from "dayjs";
import MenuJson from "../assests/manu.json";


const Warpper = styled(Box)((props) => ({
  display: "flex",
  justifyContent: "center",
  height: "calc(100vh -  30px)",
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
const styles = {
  facingIssue: {
    color: theme.palette.grey[900],
    textDecoration: "none",
    fontWeight: 400,
  },
};

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

interface State {
  showPassword: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showPassword, serPasswordVisiblity] = useState(false);
  const [cookies, setCookie,removeCookie] = useCookies(['AuthCookie']);
  // const [values, setValues] = React.useState<State>({
  //   showPassword: false,
  // });
 
  //ADMIN USER
  const dispatch = useDispatch();
  async function submitLogin(values: any) {
    await login(values)
      .then(async(response: any) => {
        if (response.data.isError) {
          toast.error("Invalid Credentials");
        } else {
          dispatch(EmptyUser());
          dispatch(FillUser(response.data));
          secureLocalStorage.setItem("session", response.data);
          secureLocalStorage.setItem("authToken", response.data.token);
          if(isRememberMe){
            setCookie("AuthCookie",JSON.stringify({token:response.data.token}),{expires:dayjs().add(14,'day').toDate()});
          }
          else{
            removeCookie("AuthCookie");
          }

          var data = MenuJson.listModuleMaster;
            let sortedData = data.sort((a: any, b: any) => (a.displayOrder < b.displayOrder) ? -1 : 1);
            secureLocalStorage.setItem("authUserMenu", sortedData);
            dispatch(EmptyMenu());
            sortedData.map((menu: any) => {
              dispatch(addMenu(menu));
              //const updateMenuPermissionService = new UpdateMenuPermissionService(menu);
            })

          if (response.data.typeOfUser == AppConstants.UserType.Admin) {
            navigate("/dashboard");
          } else if (
            response.data.typeOfUser == AppConstants.UserType.Manager
          ) {
            navigate("/dashboard");
            // navigate("/project-management");
          } if (
            response.data.typeOfUser == AppConstants.UserType.User
          ) {
            navigate("/userdashboard");
          }else {
            navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        if (error.data.Error.length > 0)
          toast.error(error.data.Error[0], {
            onOpen: () => setButtonDisable(true),

            onClose: () => setButtonDisable(false),
          });

        return error;
      });
  }

  const fieldValidationSchema = Yup.object().shape({
    //userName: Yup.string().max(20).required("Username is required"),
    userName: Yup.string()
      .max(20, "User name can only contain 20 Alphabets")
      .required("Username is required")
      .matches(
        /^[0-9A-Za-z\s]+$/,
        "User name  can only contain alpha-numeric."
      ),
    password: Yup.string().max(50).required("Password is required"),
  });

  // const handleChange =
  // (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  const handleClickShowPassword = () => {
    serPasswordVisiblity(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Formik
      initialValues={{
        userName: userName || "",
        password: password || "",
      }}
      enableReinitialize
      validationSchema={fieldValidationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setErrorMessage("");
          await submitLogin(values);
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
          <Grid container   component="main">
            < LoginLeftsection />
            <Grid item sm={12} md={6} component={Paper} elevation={0} square sx={{pb:{xs:3, sm:0.5}}}>
              <Warpper
                sx={{
                  [theme.breakpoints.down("xl")]: {
                    px: 12,
                  },
                  [theme.breakpoints.up("xl")]: {
                    px: 8,
                  },
                  [theme.breakpoints.down("md")]: {
                    px: 4,
                  },
                
                }}
              >
                <Typography
                  align="left"
                  component="h3"
                  fontWeight={600}
                  sx={{
                    fontSize: 40,
                    color: theme.palette.primary.dark,
                    mb: 1,
                    mt:{xs:3, sm:0.5}
                  }}
                >
                  Login
                </Typography>
                <Typography
                  align="left"
                  component="h4"
                  fontWeight={300}
                  gutterBottom
                >
                  Hey, Enter your details to sign in to your account
                </Typography>
                <FieldWrapper sx={{ mt: 3, mb: 3 }}>
                  <TextField
                    error={Boolean(touched.userName && errors.userName)}
                    fullWidth
                    helperText={touched.userName && errors.userName}
                    // label="User Name"
                    placeholder="Username"
                    margin="dense"
                    name="userName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.userName}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icons.UserName />
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldWrapper>
                <FieldWrapper>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    // label="Password"
                    placeholder="Password"
                    margin="dense"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange("password")}
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Icons.PasswordKey />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FieldWrapper>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 1 }}
                >
                  <Grid item>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isRememberMe}
                            onClick={(e) => {
                              setIsRememberMe(!isRememberMe);
                            }}
                          />
                        }
                        label={
                          <Typography
                            variant="body1"
                            sx={{ color: theme.palette.grey[900] }}
                          >
                            Remember Me
                          </Typography>
                        }
                      />
                    </FormGroup>
                  </Grid>
                  <Grid item>
                    <Box
                      component={Link}
                      to="/facing-issue"
                      sx={styles.facingIssue}
                    >
                      Facing issue during login?
                    </Box>
                  </Grid>
                </Grid>
                {errorMessage && (
                  <p style={{ color: "red" }} className="error">
                    {" "}
                    {errorMessage}{" "}
                  </p>
                )}
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  {/* {JSON.stringify(Login, null, 2)} */}
                  {/* <ToastContainer /> */}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 4.5, mb: 2 }}
                    disabled={buttonDisable}
                  >
                    Login
                  </Button>
                </Stack>
              </Warpper>
              <Typography
                align="center"
                component="h4"
                fontWeight={300}
                gutterBottom
                sx={{ color: "#6B6B6B" }}
              >
                {new Date().getFullYear()} Seasia All Rights Reserved
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
