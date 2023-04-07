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
import { achievementService } from "../../../service/master-service/achievement-service";
import * as Icons from '../../../assests/icons/icons'
import { toast } from "material-react-toastify";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const initialvalues = {
  id: "",
  achievementName: "",
};

function EditManageAchievementData() {
  const [user, setUser] = useState(initialvalues);
  const { id } = useParams();
  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    // getUsers();
    await achievementService.getAchievementById(id).then((response: any) => {
      if (response.data.isError) {
      } else {
       
        setUser(response?.data);
      }
    });
  };

  const navigate = useNavigate();
  const onValueChange = (e: any) => {
    
    setUser({ ...user, [e.target.name]: e.target.value });
   
  };

  const addEditAchievementDetails = async () => {
    await achievementService.updateAchievement(user).then((response: any) => {
      if (response.data.isError) {
      } else{
        toast.success('Achievement updated successfully.');
        navigate("/manageachievement");}
    });
    // await editUser(user, id);
    navigate("/manageachievement");
  };

  const cancelAchievementDetails = async () => {
    navigate("/manageachievement");
  };

  return (
    <>
      <Grid container spacing={2} direction="row"
        justifyContent="center"
        alignItems="center">
        <Grid item xs={12} md={6}>
          <Item elevation={0}>
            <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
              Edit Achievement
            </Typography>
            <Box sx={{mt: 2}}>
              <TextField
                fullWidth
                margin="normal"
                id="user-name"
                onChange={(e) => onValueChange(e)}
                name="achievementName"
                label="Achievement Name"
                value={user.achievementName}
                variant="outlined"
              />
              <Typography variant="overline" fontWeight={500} align="left" display="block" sx={{ mt: 2 }}>
                Upload  Achievement
              </Typography>
              <Stack direction='row' alignItems="center" justifyContent="space-between" spacing={2} sx={{ mt: 1 }}>
                <Box>
                  <Button variant="outlined" component="label" startIcon={<Icons.Upload />}>
                    Upload
                    <input hidden accept="image/*" multiple type="file" />
                  </Button>
                </Box>
                <Typography variant="overline" fontWeight={500} display="block" >
                  OR
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Add Url"
                    variant="outlined"
                  />
                </Box>
              </Stack>
              <Stack spacing={2} direction="row"
                justifyContent="flex-end"
                alignItems="center" sx={{ mt: 3 }}>
                <Button onClick={() => cancelAchievementDetails()} variant="outlined" color="primary">Cancel</Button>
                <Button type="submit" variant="contained" color='primary' onClick={() => addEditAchievementDetails()}>Submit</Button>

              </Stack>

            </Box>

          </Item>
        </Grid>

      </Grid>
      {/* <Grid
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
              Edit Achievement
            </Typography>

            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                id="user-name"
                onChange={(e) => onValueChange(e)}
                name="achievementName"
                label="Achievement Name"
                value={user.achievementName}
                variant="standard"
              />

              <Stack
                spacing={2}
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                sx={{ mt: 3 }}
              >
                <Button
                  onClick={() => addEditAchievementDetails()}
                  variant="contained"
                  color="primary"

                >
                  Update
                </Button>
                <Button
                  onClick={() => cancelAchievementDetails()}
                  variant="contained"
                  color="primary"

                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Item>
        </Grid>
      </Grid> */}
    </>
  );
}

export default EditManageAchievementData;
