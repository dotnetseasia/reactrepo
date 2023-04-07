import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import StyledTableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import StyledTableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hodServices } from "../../../service/master-service/hod-service";
import Chip, { ChipProps } from "@mui/material/Chip";
import * as Icons from "../../../assests/icons/icons";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import SearchBar from "../../../components/styledComponent/SearchBar";
import Box from "@mui/material/Box";
import TablePagination from "@mui/material/TablePagination";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import * as Yup from "yup";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
// import { Transition } from '@react-spring/web';
import {
  Autocomplete,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import { Formik, getIn } from "formik";
import { toast } from "material-react-toastify";
import { departmentService } from "../../../service/master-service/department-service";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotFound from "../../../components/styledComponent/NotFound";
import AppConstants from "../../../config/AppConstants";
import { masterDataService } from "../../../service/master-service/master-data-service";
import { TableSortLabel } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { Error } from "@mui/icons-material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};

const StatusChip = styled(Chip)<ChipProps>(({ theme }) => ({
  color: theme.palette.success.dark,
  backgroundColor: theme.palette.success.light,
  fontWeight: 400,
  fontSize: 14,
}));

interface Skills {
  id: string;
  name: string;
  UserName: string;
  DepartmentId: string;
  department: string;
  hodId: string;
  hodName: string;
  srNo: string;
}

function createData(
  id: string,
  name: string,
  UserName: string,
  DepartmentId: string,
  department: string,
  hodId: string,
  hodName: string,
  srNo: string
): Skills {
  return { name, id, UserName, DepartmentId, department, hodId, hodName, srNo };
}

interface User {
  userId: string;
  userName: string;
  id: string;
  name: string;
  DepartmentId: string;
}

const initialvalues = {
  departmentId: "",
  departmentName: "",
  hodId: "",
};

const optionsStatus = ["Active", "De-Active", "Null", ,];

function ManageHodData() {
  const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);
  const navigate = useNavigate();
  const [actionAllowed, setAllowdAction] = React.useState<any>([]);
  const [searchTerm, setsearchTerm] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [project, setProject] = useState<Skills[]>([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedstatusIndex, setStatusSelectedIndex] = React.useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const statushandleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setStatusSelectedIndex(index);
    setAnchorEl(null);
  };

  const statushandleClose = () => {
    statussetAnchorEl(null);
  };

  const isValidUser = async () => {
    await masterDataService
      .GetActionbypageId(
        AppConstants.ScreenInfo.Master_Configuration.Manage_HOD.pageId
      )
      .then((response: any) => {
        if (response.data.isError) {
          navigate("/login");
        } else {
          var data = response?.data;
          var screenInfo = masterDataService.isAuthorizeUser(
            data,
            AppConstants.ScreenInfo.Master_Configuration.Manage_HOD
          );
          var allowedAction = {
            edit: masterDataService.isActionAlowed(
              screenInfo,
              AppConstants.ScreenInfo.Master_Configuration.Manage_HOD.actionIds
                .edit
            ),
          };
          setAllowdAction(allowedAction);
        }
      })
      .catch((error) => {
        navigate(AppConstants.Redirection.Unauthorize_Access);
      });
  };

  /////search programming
  var headSearch = { id: "", name: "All Channel" };
  const [headHook, setHeadHook] = useState(headSearch);
  const [statusDataHook, setStatusDataHook] = useState("Active");
  const [searchValue, setSearchValue] = useState("");
  const [aanchorEl, statussetAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const stopen = Boolean(aanchorEl);

  //////department data
  const [department, setdepartment] = useState(initialvalues);
  const { id } = useParams();

  // const onValueChange = (e: any) => {
  //     console.log(e.target.name, e.target.value)
  //     // setdepartment({...department, [e.target.name]: e.target.value })
  //     console.log(department, users,);
  // }
  const updateHOD = async (values: any) => {
    try {
      await hodServices.updateHod(values).then((response: any) => {
        if (response.data.isError) {
        } else {
          toast.success("Head of Department updated successfully.");
          getHodDetails();
          setOpen(false);
        }
      });
    } catch (ex: any) {
      ex.data.errors.map((err: any, idx: any) => {
        toast.warning(err);
      });
    }
  };

  // const updateHOD = async (values: any) => {

  //     await hodServices.updateHod(values)
  //         .then((response: any) => {
  //             if (response.data.isError) {

  //             }
  //             else {
  //                 toast.success(" Updated successfully.")
  //                 getHodDetails();

  //             }
  //         });
  // }

  const getDepartmentData = async () => {
    // getUsers();
    await departmentService.getDepartmentById(id).then((response: any) => {
      if (response.data.isError) {
      } else {
        setUser(response?.data);
      }
    });
  };
  /////over

  ///////Dropdown programming

  const handleClickDropdown = (event: React.MouseEvent<HTMLElement>) => {
    statussetAnchorEl(event.currentTarget);
  };

  var UserData = { id: "", name: "All User" };
  const [userDataHook, setUserDataHook] = useState(UserData);
  const [users, setUser] = useState<User[]>([]);
  const [formValues, setFormValues] = useState<any[]>([]);
  const [userIndex, setUsertIndex] = React.useState(1);
  var hodData = {
    id: "",
    name: "All Roles",
    userId: "",
    DepartmentId: "",
    userName: "",
  };
  const [hodDataHook, sethodDataHook] = useState(hodData);

  const [employeeDetail, setEmployeeDetail] = useState({
    name: "",
    userdepartment: userDataHook.id,
  });

  // React.useEffect
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    setEmployeeDetail((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getUsersdrop = async (departmentId: any) => {
    await hodServices.getDropdownData(departmentId).then((response: any) => {
      if (response.data.isError) {
        setUser([hodData]);
      } else {
        setUser(response.data);
      }
    });
  };

  const handleDepartmentItemClick = async (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setUserDataHook(users[index]);
  };

  //////Dropdown over

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // , HodId:any, UserId: string, UserName: any
  const handleClickOpen = (department: Skills) => {
    // console.log(DepartmentId);
    setOpen(true);
    // setProject({ ...project, id: UserId   })
    setdepartment({
      ...department,
      departmentId: department.id,
      departmentName: department.name,
      hodId: department.hodId ?? "",
    });
    getUsersdrop(department.id);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if(_permission.page_ManageHeadOfDepartments_Access !==true ){
      navigate("/dashboard");
    }
   // getDepartmentData();
    //isValidUser();
    //getUsersdrop(id);
    getHodDetails();
  }, []);

  const getHodDetails = async () => {
    var input = {
      status: "",
      search: "",
    };
    await hodServices.getHod(input).then((response: any) => {
      if (response.data.isError) {
      } else {
        setProject(response?.data);
      }
    });
  };

  const triggerSearch = async (newValue: string) => {
    getSearchDetails(newValue);
    setPage(0);
  };
  /// search programming
  const getSearchDetails = async (newValue: string) => {
    let values = {
      project: headHook.id,
      status: statusDataHook,
      search: newValue,
      take: 1000,
      skip: 0,
    };

    await hodServices.getSearch(values).then((response: any) => {
      if (response.data.isError) {
      } else {
        setProject(response?.data);
        if (response.data.length == 0) {
          // setNoUser(true);
        }
      }
    });
  };

  //Sorting

  const [dense, setDense] = React.useState(false);
  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (String(b[orderBy]).toLowerCase() < String(a[orderBy]).toLowerCase()) {
      return -1;
    }
    if (String(b[orderBy]).toLowerCase() > String(a[orderBy]).toLowerCase()) {
      return 1;
    }
    return 0;
  }

  type Order = "asc" | "desc";

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: string | string },
    b: { [key in Key]: string | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  interface HeadCell {
    disablePadding: boolean;
    id: keyof Skills;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [
    {
      id: "name",
      numeric: false,
      disablePadding: false,
      label: "Department",
    },

    {
      id: "hodName",
      numeric: false,
      disablePadding: false,
      label: "Department Head",
    },
  ];

  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Skills>("srNo");

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
      event: React.MouseEvent<unknown>,
      property: keyof Skills
    ) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
      (property: keyof Skills) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell>Status</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
    );
  }

  interface EnhancedTableToolbarProps {
    numSelected: number;
  }

  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Skills
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick1 = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 1 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
  const [noUser, setNoUser] = useState(false);

  ///////page change and dropdown programming over

  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fieldValidationSchema = Yup.object().shape({
    hodId: Yup.string().required("Head of Department is Required."),
    // .test(
    //   "len",
    //   "Phone number must be exactly 10 digits",
    //   (val) => !department.hodId
    // ),
    // durationType: (duration=="Half Day" ? Yup.string().required('Duration half is required'):Yup.string()),
    // reason: Yup.string().required('Reason is required'),
  });

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link color="inherit" to="/">
          Dashboard
        </Link>
        <Typography color="text.primary">Master Setup</Typography>
        <Typography color="text.primary"> Department Head</Typography>
      </Breadcrumbs>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ pb: 3 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Department Head
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Box>
                <Button
                  fullWidth
                  aria-controls={stopen ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={stopen ? "true" : undefined}
                  onClick={handleClickDropdown}
                  sx={{ justifyContent: "space-between" }}
                  variant="selectSmall"
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
                      onClick={(event) =>
                        statushandleMenuItemClick(event, index)
                      }
                    >
                      {optionsStatus}
                    </MenuItem>
                  ))}
                </Menu>
              </Box> */}
          <SearchBar
            setSearchValue={setSearchValue}
            callBackFunction={triggerSearch}
          />
        </Stack>

        <Divider />

        <TableContainer sx={{ mt: 1 }}>
          <Table aria-label="simple table" size="small">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={project.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(project, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick1(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                    
                    >
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">
                        {row.hodName}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Chip
                          variant="approved"
                          label="Active"
                          color="default"
                        />
                        {/* <Chip variant='review' label='Active' color="default" />
                      <Chip variant='submited' label='Active' color="default" />
                      <Chip variant='hold' label='Active' color="default" /> */}
                      </StyledTableCell>

                      {/* <StyledTableCell align="left"> */}
                      {/* {(() => {
                        
                        switch (row.status.toString()) {
                          case "1":
                            return  <StatusChip label={<span><Icons.CircleFilled /> Active</span>}/>;

                          case "0":
                            return  <StatusChip label={<span><Icons.CircleFilled /> In Active</span>}/>;
                          default:
                            return row.status
                        }
                      })()} */}

                      {/* </StyledTableCell> */}
                      <StyledTableCell align="left" width={100}>
                        <Stack
                          direction="row"
                          alignItems="center"
                          justifyContent="flex-end"
                          spacing={2}
                        >
                          {/* {(actionAllowed.edit && */}
                          {_permission.action_ManageHeadOfDepartmentsListing_Edit_Access && (
                            <Tooltip title="Edit">
                            <IconButton
                              aria-label="edit"
                              size="medium"
                              onClick={() => handleClickOpen(row)}
                            >
                              {/* , user.hodId, user.UserName,user.DepartmentId */}
                              <Icons.Edit />
                            </IconButton></Tooltip>
                          )}
                          {/* )} */}
                          {/* {(actionAllowed.view &&
                                                                        <IconButton aria-label="view" component={Link} to={`/project/edit-project/${row.id}`}>
                                                                            <Icons.View />
                                                                        </IconButton>
                                                                    )} */}
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: dense ? 33 : 53,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          {project.length == 0 && <NotFound NotfoundText="No Result Found" />}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25, 30]}
          component="div"
          count={project.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Dialog open={open} fullWidth maxWidth="sm">
        <Formik
          initialValues={{
            departmentId: department.departmentId,
            hodId: department.hodId ?? "",
            //  DepartmentId:'',
          }}
          validationSchema={fieldValidationSchema}
          onSubmit={async (values, {}) => {
            try {
              setErrorMessage("");
              await updateHOD(values);
            } catch (ex: any) {
              ex.data.errors.map((err: any, idx: any) => {
                toast.warning(err);
              });
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
              <DialogTitle>Assign Department Head</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  disabled
                  margin="dense"
                  id="department-name"
                  //onChange={(e) =>values.DepartmentId = e.target.value }
                  name="name"
                  // label="Department Name"
                  type="name"
                  fullWidth
                  value={department.departmentName}
                  variant="outlined"
                />

                {/* <TextField
                  autoFocus
                  sx={{ mt: 3 }}
                  margin="dense"
                  select
                  error={Boolean(
                    getIn(touched, "hodId") && getIn(errors, "hodId")
                  )}
                  helperText={getIn(touched, "hodId") && getIn(errors, "hodId")}
                  required
                  name="hodId"
                  label="Select HOD"
                  variant="outlined"
                  fullWidth
                  value={department.hodId??""}
                >
                  {users.map((option, index) => (
                    <MenuItem
                      key={option.userId}
                      value={option.userId}
                      onClick={(event) => {
                        values.hodId=option.userId;
                        setdepartment({ ...department, hodId: option.userId });
                      }}
                    >
                      {option.userName}
                    </MenuItem>
                  ))}
                </TextField> */}

                <Autocomplete
                  value={
                    users?.find(
                      (option) => option.userId == department.hodId
                    ) ?? null
                  }
                  fullWidth
                  // id="outlined-basic"
                  options={users}
                  getOptionLabel={(option) => option.userName}
                  // getOptionDisabled={(option) =>
                  //   formValues.find(
                  //     (el: any) => el.department.userId === option.userId
                  //   )
                  // }
                  onChange={(event, value) => {
                    values.hodId = value?.userId || "";
                    setdepartment({
                      ...department,
                      hodId: value?.userId || "",
                    });
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="outlined-basic"
                      name="hodId"
                      label="Select HOD"
                      variant="outlined"
                      fullWidth
                      value={department.hodId ?? ""}
                      error={Boolean(
                        getIn(touched, "hodId") && getIn(errors, "hodId")
                      )}
                      helperText={
                        getIn(touched, "hodId") && getIn(errors, "hodId")
                      }
                      required
                      sx={{ mt: 3 }}
                    />
                  )}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} variant="outlined">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
                {/* <Button
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button> */}
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}

export default ManageHodData;
