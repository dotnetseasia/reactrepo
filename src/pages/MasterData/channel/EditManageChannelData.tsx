import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import {channelServices} from '../../../service/master-service/channel-services';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { toast } from 'material-react-toastify';
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const initialvalues = {
  id: "",
  name: "",
};

function EditManageChannelData() {
  const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);
  const [errorMessage, setErrorMessage] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [channel, setChannel] = useState(initialvalues);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(_permission.action_ManageChannelsListing_Edit_Access !==true ){
      navigate("/dashboard");
    }
    getUsersData();
  }, []);

  const getUsersData = async () => {
    await channelServices.getChannelById(id).then((response: any) => {
      if (response.data.isError) {
      } else setChannel(response?.data);
    });
  };

  const onValueChange = (e: any) => {
   
    setChannel({ ...channel, [e.target.name]: e.target.value.replace(/\s{2,}$/g, "").trimStart() });
  };

const addEditChannelDetails = async () => {
    
    await channelServices.updateChannel(channel)
    .then((response: any) => {
        if (response.data.isError) {
            

        }
        else{
          toast.success('Channel Updated successfully');
          navigate('/editmanage-channel')
        }
            
            
            
    }) .catch((error) => {
      if (error.data.Error.length > 0)
     
        toast.error(error.data.Error[0], {
          onOpen: () => setButtonDisable(true),

          onClose: () => setButtonDisable(false),
        });

      return error;
    });
  };

  const cancelbutton = async () => {
    navigate("/editmanage-channel");
  };

  /////Validation programming
  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string()
    .max(20, 'Channel can only contain 20 Alphabets')
      .matches(/^([A-Za-z\s\-]*)$/g, "Channel can only contain alphabets,(-).")
      .required("Channel Name is required"),
  });
  /////over

  return (
    <Formik
      initialValues={{
        name: channel.name,
      }}
      enableReinitialize
      //  validation programming

      validationSchema={fieldValidationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setErrorMessage("");
          await addEditChannelDetails();
        } catch (ex: any) { 
          if (ex.status == 400) {
            console.error("ex:", ex);
            ex.data.Error.map((error: any, idx: any) => {
              setErrorMessage(error);
              toast.error(error);
            })
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
          {/* validation  over*/}

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={4}>
              <Item elevation={0}>
                <Typography
                  variant="h6"
                  align="left"
                  noWrap
                  component="div"
                  sx={{ fontWeight: 500 }}
                >
                  Edit Channel
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    id="channel-name"
                    onChange={(e) => onValueChange(e)}
                    onBlur={handleBlur}
                    name="name"
                    label="Channel Name"
                    value={channel.name}
                    variant="outlined"
                  />

                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ mt: 3 }}
                  >
                    <Button type="submit" disabled={buttonDisable} variant="contained" color="primary">
                      Update
                    </Button>
                    <Button
                      onClick={() => cancelbutton()}
                      variant="contained"
                      color="primary"
                    >
                      Cancel
                    </Button>
                  </Stack>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
export default EditManageChannelData;
