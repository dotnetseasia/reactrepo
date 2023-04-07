import { useState, useEffect } from "react";
// import { FormControl, FormGroup, InputLabel, Input } from '@mui/material';
// import Typography from '@mui/material/Typography';
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import { technicalSkillService } from "../../../service/master-service/technical-skill-service";
import { toast } from "material-react-toastify";
import * as Yup from 'yup';
import { Formik } from "formik";
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

function EditManageTechnicalSkillData() {
  const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);
  const [user, setUser] = useState(initialvalues);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if(_permission.action_ManageSkillListing_Edit_Access !== true ){
      navigate("/dashboard");
    }
    getUsersData();
  }, []);

  const getUsersData = async () => {
    // getUsers();

    await technicalSkillService.getSkillsById(id).then((response: any) => {
      if (response.data.isError) {
      } else setUser(response?.data);
    });
  };

  const onValueChange = (e: any) => {
   
    setUser({ ...user, [e.target.name]: e.target.value.replace(/\s{2,}$/g, "").trimStart() });
    
  };
 
  const addEditTechnicalSkillDetails = async () => {
    // await editUser(user, id);
    try {
      await technicalSkillService.updateSkill(user).then((response: any) => {
        if (response.data.isError) {
        } else toast.success("Skill Update successfully.");
        navigate("/manage-technicalskill");
      });
    } catch (ex: any) {
      if (ex.status == 400) {
        console.error("ex:", ex);
        // ex.data.Error.map((error: any, idx: any) => {
        //     toast.error(error);
        // })
        ex.data.Error.map((error: any, idx: any) =>
          // toast.error(error)
          toast.error(error, {
            onOpen: () => setButtonDisable(true),

            onClose: () => setButtonDisable(false),
          })
        );
      }
    }
  };

  const cancelbutton = async () => {
    navigate("/manage-technicalskill");
  };
  const fieldValidationSchema = Yup.object().shape({
    name: Yup
      .string()
      .max(20, 'Skill can only contain 20 Alphabets').matches(/^([A-Za-z\s\#\-\.]*)$/g,
      'Skill can only contain alphabets and Special Character,(-).')
      .required('Skill Name is required'),
  })


  return (
    <Formik
      initialValues={{
        name: user.name,
      }}
      enableReinitialize
      //  validation programming

      validationSchema={fieldValidationSchema}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setErrorMessage("");
          await addEditTechnicalSkillDetails();
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
                   Edit Skill
                </Typography>

                <Box sx={{ mt: 3 }}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                    fullWidth
                    id="user-name"
                    onChange={(e) => onValueChange(e)}
                    onBlur={handleBlur}
                    name="name"
                    label="Skill Name"
                    value={user.name}
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

export default EditManageTechnicalSkillData;
