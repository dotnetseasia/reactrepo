import React from "react";
import * as Icons from '../../../assests/icons/icons';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { achievementService } from "../../../service/master-service/achievement-service";
// import StyledTableCell from "../../../components/styledComponent/CustomTableCell";
import StyledTableCell from '@mui/material/TableCell';
import Chip, { ChipProps } from '@mui/material/Chip';
import StyledTableRow from '@mui/material/TableRow';
import { Box, Breadcrumbs, Divider } from "@mui/material";
import SearchBar from "../../../components/styledComponent/SearchBar";
import AddIcon from '@mui/icons-material/Add';
import TablePagination from '@mui/material/TablePagination';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toast } from "material-react-toastify";


const StatusButtonActive = styled(Button)({
  backgroundColor: "#E7FFF0",
  borderColor: "#E7FFF0",
  color: "#2DD36F",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#1F944E",
    borderColor: "#1F944E",
    boxShadow: "none",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});
const StatusButtonDeactive = styled(Button)({
  backgroundColor: "#FBDADE",
  borderColor: "#FBDADE",
  color: "#A5303F",
  boxShadow: "none",
  "&:hover": {
    backgroundColor: "#A5303F",
    borderColor: "#A5303F",
    boxShadow: "none",
    color: "#fff",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "none",
  },
});

const StatusChip = styled(Chip)<ChipProps>(({ theme }) => ({
  color: theme.palette.success.dark,
  backgroundColor: theme.palette.success.light,
  fontWeight: 400,
  fontSize: 14,

}));

interface Acheive {
  id: number;
  achievementName: string;
}

function ManageAcheivementData() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = useState<Acheive[]>([]);


  var channelSearch = { id: "", name: "All Channel" };
  const [channelHook, setChannelHook] = useState(channelSearch); 
  const [statusDataHook, setStatusDataHook] = useState("Active");
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    getAchievementDetails();
  }, []);

  const getAchievementDetails = async () => {
    var input = {
      "status": "",
      "search": ""
    };
    await achievementService.getAchievement(input).then((response: any) => {
      if (response.data.isError) {
      } else {
        setUsers(response?.data);
      }
    });
  };

  const deleteAchievement = async (id: any) => {
    const confirmBox = window.confirm(
      "Do you really want to delete this ?"
    )
    if (confirmBox === true) {
      await achievementService.deleteAchievement(id)
        .then((response: any) => {
          if (response.data.isError) {

          }
          else {
            toast.success("Achievement Deleted successfully.")
            getAchievementDetails();
          }
        });
    }

  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /////Dropdown
  const optionsStatus = [
    'Active',
    'De-Active',
    'Null', ,
  ];



  const [aanchorEl, statussetAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedstatusIndex, setStatusSelectedIndex] = React.useState(1);
  const stopen = Boolean(aanchorEl);
  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    statussetAnchorEl(event.currentTarget);
  };

  const statushandleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
  ) => {
    setStatusSelectedIndex(index);
    setAnchorEl(null);
  };
  const statushandleClose = () => {
    statussetAnchorEl(null);
  };


  /////searchbar functionality

  const getSearchDetails = async (newValue: string) => {
  
    let  values = {
        department: channelHook.id,
        status: statusDataHook,
        search: newValue,
        take: 50,
        skip: 0
    }
    await achievementService.getSearch(values)
        .then((response: any) => {
           
            if (response.data.isError) {

            }
            else {
              setUsers(response?.data);
                if(response.data.length==0){
                    // setNoUser(true);
                    toast.warning('No result found');
                }
            }
        });
}


  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link color="inherit" to="/">
          Master Data
        </Link>
        <Typography color="text.primary">Manage Achievement</Typography>
      </Breadcrumbs>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            All Achievement
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Button
              fullWidth
              aria-controls={stopen ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={stopen ? 'true' : undefined}
              onClick={handleClickDropdown}
              sx={{ justifyContent: 'space-between' }}
              variant='selectSmall'
            >
              {optionsStatus[selectedstatusIndex]} <ArrowDropDownIcon />
            </Button>
            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={aanchorEl}
              open={stopen}
              onClose={statushandleClose}
            >

              {optionsStatus.map((optionsStatus, index) => (
                <MenuItem
                  key={optionsStatus}
                  // disabled={index === 0}
                  selected={index === selectedstatusIndex}
                  onClick={(event) => statushandleMenuItemClick(event, index)}
                >
                  {optionsStatus}
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SearchBar  setSearchValue={setSearchValue}  callBackFunction={getSearchDetails} />
          <Button variant="contained" size="large" component={Link} to='/add-achievement' color="primary" startIcon={<AddIcon />}>
            Add Achievements
          </Button>
        </Stack>

        <Divider />

        {/* <Paper elevation={0} sx={{ p: 3, mb: 3 }}> */}
        {/* <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 52, height: 52 }}>H</Avatar>
          <Stack spacing={0}>
            <Typography variant="subtitle1" component="h5">
              Achievement Master Data
            </Typography>
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: 600 }}
            >
              Manage Achievement Data
            </Typography>
          </Stack>
        </Stack> */}

        <TableContainer component={Paper} elevation={0}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                {/* <StyledTableCell align="left">Sr. No</StyledTableCell> */}
                <StyledTableCell align="left">Achievement</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {users
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, idx) => (
                  // users.map((user, idx) =>
                  <>
                   

                    <StyledTableRow key={idx + 1}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                      {/* <StyledTableCell align="left" >{idx + 1}</StyledTableCell> */}
                      <StyledTableCell align="left">{user.achievementName}</StyledTableCell>
                      <StyledTableCell align="left">
                        <StatusChip label={<span><Icons.CircleFilled /> Active</span>} />
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                          <IconButton aria-label="edit" size="medium" component={Link} to={`/editachievement/${user.id}`}>
                            <Icons.Edit />
                          </IconButton>
                          {/* <IconButton aria-label="edit">
                            <Icons.View />
                          </IconButton> */}
                          <IconButton aria-label="delete" onClick={() => deleteAchievement(user.id)} >
                            <Icons.Delete />
                          </IconButton>
                        </Stack>
                      </StyledTableCell>

                    </StyledTableRow>
                  </>))
              }
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25, 30]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}

export default ManageAcheivementData;
