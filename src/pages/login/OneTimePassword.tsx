import * as React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assests/images/login-background-img.png";
import { Link } from "react-router-dom";
import logoImage from "../../assests/images/logo.svg";
import { styled } from "@mui/material/styles";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import theme from "../../theme/theme";
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
import { MuiOtpInput } from "mui-one-time-password-input";
import {
  forgotPasswordService,
  recoverUsernameService,
} from "../../service/user-service/login-management";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "material-react-toastify";

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
  alignItems: "flex-end",
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

const styles = {
  facingIssue: {
    color: theme.palette.grey[900],
    textDecoration: "none",
    fontWeight: 400,
  },
  forgotPassword: {
    fontSize: 20,
    fontWeight: 300,
    color: theme.palette.grey[900],
  },
  signin: {
    color: theme.palette.grey[900],
    textDecoration: "underline",
    fontWeight: 300,
    "&:hover": {
      color: theme.palette.primary.main,
      backgroundColor: "transparent",
    },
  },
};

export default function OneTimePassword(props: {
  handleClick: () => void;
  obj: any;
  IsforgotPassword: boolean;
  IsRecoverUser: boolean;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");

  const [previousvalue, setPreviousvalue] = useState(props.obj);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [resendButtonDisable, setResendButtonDisable] = useState(false);
  const [resendOtpState, setResendOtpState] = useState(false);
  const handleChange = (newValue: string) => {
    if (newValue.length > 0) {
      setErrorMessage("");
    }
    setValue(newValue);
  };

  const handleComplete = (finalValue: string) => {
    fetch("...");
  };

  const proceedOtpVerification = async () => {
    try {
      if (value == "") {
        setErrorMessage("OTP is required");
        return false;
      }
      if (props.IsforgotPassword) {
        let data = { otp: value.toString(), emailId: previousvalue.email };

        await forgotPasswordService
          .verifyOTP(data)
          .then(async (response: any) => {
            if (response.data.isError) {
              toast.error(response.data.Error);
            } else {
              previousvalue.isEmail = false;
              previousvalue.email = data.emailId;
              previousvalue.isOTP = true;
              previousvalue.OTP = data.otp;
              previousvalue.isReset = false;
              await setPreviousvalue(previousvalue);
              await props.handleClick();
            }
          });
      }
      if (props.IsRecoverUser) {
        let data = { otp: value.toString(), emailId: previousvalue.email };
        await recoverUsernameService
          .verifyUserRecoverOTP(data)
          .then(async (response: any) => {
            if (response.data.isError) {
              toast.error(response.data.Error);
            } else {
              previousvalue.isEmail = false;
              previousvalue.email = data.emailId;
              previousvalue.isOTP = true;
              previousvalue.OTP = data.otp;
              previousvalue.isMessage = false;
              await setPreviousvalue(previousvalue);
              await props.handleClick();
            }
          });
      }
    } catch (err: any) {
      console.error(err);
      err = JSON.parse(JSON.stringify(err));
      if (err.status == 400) {
     
        {
          err.data.Error.map((error: any, idx: any) =>
            // toast.error(error)
            toast.error(error, {
              onOpen: () => setButtonDisable(true),

              onClose: () => setButtonDisable(false),
            })
          );
        }
      }
    }
  };
  const resendOTP = async () => {
    try {
      setErrorMessage("");
      if (props.IsforgotPassword) {
        let data = {
          username: previousvalue.username,
          emailId: previousvalue.email,
        };
        await forgotPasswordService
          .resedOTP(data)
          .then(async (response: any) => {
           
            if (response.data.isError) {
              //   toast.error(response.data.Error);
              toast.error(response.data.Error, {
                onOpen: () => setResendButtonDisable(true),

                onClose: () => setResendButtonDisable(false),
              });
            }
            if (response.data) {
              // toast.success(response.data.toString());
              toast.success(response.data.toString(), {
                onOpen: () => setResendButtonDisable(true),
                onClose: () => setResendButtonDisable(false),
              });
            } else {
              previousvalue.isEmail = true;
              previousvalue.email = data.emailId;
              previousvalue.username = data.username;
              previousvalue.isOTP = false;
              previousvalue.OTP = "";
              previousvalue.isReset = false;
              await setPreviousvalue(previousvalue);
              await props.handleClick();
              // toast.success(response.data.toString());
            }
          });
      }
      if (props.IsRecoverUser) {
        let data = { emailId: previousvalue.email };
        await recoverUsernameService
          .recoverUsername(data)
          .then(async (response: any) => {
            
            if (response.data.isError) {
              //   toast.error(response.data.Error);
              toast.error(response.data.Error, {
                onOpen: () => setResendButtonDisable(true),

                onClose: () => setResendButtonDisable(false),
              });
            } else {
             
              previousvalue.isEmail = true;
              previousvalue.email = data.emailId;
              previousvalue.username = "";
              previousvalue.isOTP = false;
              previousvalue.OTP = "";
              previousvalue.isMessage = false;
              toast.success(response.data.toString());
              await setPreviousvalue(previousvalue);
              await props.handleClick();
            }
          });
      }
    } catch (err: any) {
      console.error(err);
      err = JSON.parse(JSON.stringify(err));
      if (err.status == 400) {
       
        {
          err.data.Error.map((error: any, idx: any) =>
            // toast.error(error)
            toast.error(error, {
              onOpen: () => setResendButtonDisable(true),

              onClose: () => setResendButtonDisable(false),
            })
          );
        }
      }
    }
  };
  const goBack = async () => {
    navigate("/login");
  };

  return (
    <>
      <Grid container spacing={2} component="main">
        <Grid
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
            <Typography
              align="left"
              variant="h6"
              component="h2"
              fontWeight={300}
              gutterBottom
              sx={{ fontSize: 30 }}
            >
              A System Which Provides
            </Typography>
            <Typography
              align="left"
              variant="h2"
              component="h1"
              fontWeight={600}
              gutterBottom
            >
              Real Time Productivity
            </Typography>
          </CssBox>
        </Grid>
        <Grid item sm={12} md={6} component={Paper} elevation={0} square>
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
              gutterBottom
              sx={{ fontSize: 40, color: theme.palette.primary.dark }}
            >
              One time password
            </Typography>
            <Typography
              align="left"
              component="h4"
              fontWeight={300}
              gutterBottom
            >
              Enter your OTP.
            </Typography>
            <FieldWrapper sx={{ mt: 3, mb: 2, maxWidth: 320 }}>
              <MuiOtpInput
                value={value}
                onChange={handleChange}
                onComplete={handleComplete}
                length={4}
                display="flex"
                gap={5}
                validateChar={(character: string, index: number) => true}
              />
            </FieldWrapper>
            {errorMessage && (
              <p style={{ color: "red" }} className="error">
                {" "}
                {errorMessage}{" "}
              </p>
            )}
            <Stack spacing={2} direction="row" justifyContent="flex-start">
              <Button
                disabled={resendButtonDisable}
                onClick={() => resendOTP()}
                sx={{ p: 0 }}
              >
                <Typography variant="body1" sx={styles.signin}>
                  Resend OTP
                </Typography>
              </Button>
            </Stack>
            <Stack
              spacing={2}
              direction="row"
              justifyContent="flex-end"
              sx={{ mt: 3 }}
            >
              <Button variant="outlined" onClick={() => goBack()}>
                Cancel
              </Button>
              <Button
                disabled={buttonDisable}
                onClick={() => proceedOtpVerification()}
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Submit
              </Button>
            </Stack>
          </Warpper>
          <Typography
            align="center"
            component="h4"
            fontWeight={300}
            gutterBottom
          >
            {new Date().getFullYear()} Seasia All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
