import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Formik } from "formik";
import * as Yup from "yup";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AddBadges() {
  return (
    <Formik
      initialValues={{
        badgeName: "",
        fileUpload: "",
      }}
      validationSchema={Yup.object().shape({
        badgeName: Yup.string().max(255).required("Badges Name is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // method to be called here
        } catch (err) {
          console.error(err);
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
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6} md={6}>
                <Item elevation={0}>
                  <Typography
                    variant="h6"
                    align="left"
                    noWrap
                    component="div"
                    sx={{ fontWeight: 500 }}
                  >
                    Add Badges
                  </Typography>
                  <Divider />
                  <Box sx={{ mt: 3 }}>
                    {/* <TextField fullWidth id="badgesName" label="Badges Name" variant="standard" /> */}
                    <TextField
                      error={Boolean(touched.badgeName && errors.badgeName)}
                      fullWidth
                      helperText={touched.badgeName && errors.badgeName}
                      label="Badge Name"
                      margin="normal"
                      name="badgeName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.badgeName}
                      variant="outlined"
                    />
                    <label className="btn btn-default">
                      <input type="file" />
                    </label>
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent="flex-end"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3 }}
                      >
                        Submit
                      </Button>
                    </Stack>
                  </Box>
                </Item>
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
