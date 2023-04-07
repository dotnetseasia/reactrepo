import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, Navigate } from "react-router-dom";
import { designationService } from "../../../service/master-service/designation-service";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "material-react-toastify";
import { masterDataService } from '../../../service/master-service/master-data-service';
import { AppConstants } from '../../../config/AppConstants'
import { useSelector } from "react-redux";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const initialvalues = {
//     name:''
// }

function DesignationsData() {
  const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);
  const [errorMessage, setErrorMessage] = useState("");
  const[buttonDisable, setButtonDisable] = useState(false);
  const [skill, setSkill] = useState("name");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  // const onValueChange = (e:any) =>  {
 
  //     setUser({...values.name, [e.target.name]: e.target.value })
  //     console.log(user);
  // }


  useEffect(() => {
    //isValidUser();
    if(_permission.action_ManageDesignationListing_Add_Access !==true ){
      navigate("/dashboard");
    }
  }, []);
  const isValidUser = async () => {
    await masterDataService.GetActionbypageId(AppConstants.ScreenInfo.Master_Configuration.Manage_Designation.pageId)
      .then((response: any) => {
        if (response.data.isError) {
          navigate(AppConstants.Redirection.Unauthorize_Access);
        }
        else {
          var data = response?.data;
          var screenInfo = masterDataService.isAuthorizeUser(data, AppConstants.ScreenInfo.Master_Configuration.Manage_Designation);
          var isAdd = masterDataService.isActionAlowed(screenInfo, AppConstants.ScreenInfo.Master_Configuration.Manage_Designation.actionIds.add);
          if(!isAdd)
          {
            navigate(AppConstants.Redirection.Unauthorize_Access);
          }
        }
      }).catch((error) => {
        navigate(AppConstants.Redirection.Unauthorize_Access);
      });;
  }
  


  const addDesignationsDetails = async (values: any) => {  
   
      await designationService
        .createDesignations(values)
        .then((response: any) => {
          if (response.data.isError) {
          } else {
            toast.success("Designation  Added successfully.");
            navigate("/manage-designation");
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

  const cancelbutton = async () => {
    navigate("/manage-designation");
  };
 
  const fieldValidationSchema = Yup.object().shape({
    name: Yup
      .string()
      .max(50,'Designation Name can only contain 50 Alphabets').matches(/^[A-Za-z\s\-]+$/,
      'Designation Name  can only contain alphabets.')
      .required('Designation is required'),
  })

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={fieldValidationSchema}
  onSubmit={async (values, {
      setErrors,
      setStatus,
      setSubmitting,
   
  }) => {
      try {
          setErrorMessage("");
          await addDesignationsDetails(values);
      }catch (ex: any) { 
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
      values
  }) => (
      <form
          noValidate
          onSubmit={handleSubmit}>
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
                  Add Designation
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    // onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                    onChange={(e)=>{
                      let value = e.currentTarget.value.replace(/\-{2,}$/g, "").trimStart();
                      values.name= value
                      setName(value)
                    }}
                  />

                  <Stack
                    spacing={2}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{ mt: 3 }}
                  >
                    <Button
                      onClick={() => cancelbutton()}
                      variant="outlined"
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={buttonDisable} variant="contained" color="primary">
                      Submit
                    </Button>
                  </Stack>
                </Box>
              </Item>
            </Grid>
          </Grid>

          {/* </> */}
        </form>
      )}
    </Formik>
  );
}

export default DesignationsData;
