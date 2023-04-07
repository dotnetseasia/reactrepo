import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import { toast } from "material-react-toastify";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { labelService } from "../../../service/master-service/label-services";
import { string } from "yup/lib/locale";
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
function EditLabelData() {
    const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);
    const navigate = useNavigate();
    const [label, setLabel] = useState(initialvalues);
    const [errorMessage, setErrorMessage] = useState("");
    const [buttonDisable, setButtonDisable] = useState(false);


  const { id } = useParams();
  useEffect(() => {
    if(_permission.action_ManageLabelsListing_Edit_Access !== true ){
      navigate("/dashboard");
    }
    getLabelData();
  }, []);

  const getLabelData = async () => {
    // getUsers();
    await labelService.getLabelById(id).then((response: any) => {
      if (response.data.isError) {
      } else setLabel(response?.data);
        
      
    });
    
  };
  //   const onValueChange = (e: any) => {
  //     console.log(e.target.name, e.target.value);
  //     setUser({ ...designation, [e.target.name]: e.target.value });
  //     console.log(designation);
  //   };

  const onValueChange = (e: any) => {
    setLabel({ ...label, [e.target.name]: e.target.value.replace(/\s{2,}$/g, "").trimStart() });
  };
  const addEditLabelDetails = async () => {
      await labelService.updateLabel(label)
      .then((response: any) => {
        if (response.data.isError) {

        }
        else{
          toast.success('Label Updated successfully') 
          navigate("/manage-label")
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
    navigate("/manage-label");
  };

  
  /////Validation programming
  const fieldValidationSchema = Yup.object().shape({
    name: Yup.string()
      .max(50,'Label Name can only contain 50 Alphabets').matches(/^([A-Za-z\s\-]*)$/g, 
      'Label can only contain alphabets,(-).')
      .required("Label Name is required"),
  });
  /////over

  return (
    <Formik
      initialValues={{
        name: label.name
      }}
      enableReinitialize

      validationSchema={fieldValidationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setErrorMessage("");
          await addEditLabelDetails();
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
                  Edit Label
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    helperText={touched.name && errors.name}
                    label="Label Name"
                    margin="normal"
                    name="name"
                    onBlur={handleBlur}
                    //   onChange={handleChange}
                    // type="text"
                    value={label.name}
                    onChange={(e) => onValueChange(e)}
                    variant="outlined"
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
                     Update
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

export default EditLabelData;
