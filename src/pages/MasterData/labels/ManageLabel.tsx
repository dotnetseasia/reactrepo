import React from "react";
import StyledTableRow from '@mui/material/TableRow';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import * as Icons from '../../../assests/icons/icons';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { labelService } from "../../../service/master-service/label-services";
import { Box, Breadcrumbs, Chip, ChipProps, Divider, Modal, Tooltip } from "@mui/material";
import SearchBar from "../../../components/styledComponent/SearchBar";
import AddIcon from '@mui/icons-material/Add';
import StyledTableCell from "../../../components/styledComponent/CustomTableCell";
import TablePagination from '@mui/material/TablePagination';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toast } from "material-react-toastify";
import NotFound from "../../../components/styledComponent/NotFound";
import { masterDataService } from "../../../service/master-service/master-data-service";
import AppConstants from "../../../config/AppConstants";
import { TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { useSelector } from "react-redux";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
};


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

interface Desig {
  id: string;
  name: string;
  srNo: string;
}

function createData(

  id: string, name: string, srNo: string): Desig {
  return { name, id, srNo };
}

function ManageLabelData() {
  const navigate = useNavigate();
  const [actionAllowed, setAllowdAction] = React.useState<any>([]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [users, setUsers] = useState<Desig[]>([]);
  const [searchTerm, setsearchTerm] = useState("");
  const _permission = useSelector((state: any) => state.MasterPermissionApp.MasterPermission);


  const isValidUser = async () => {
    await masterDataService.GetActionbypageId(AppConstants.ScreenInfo.Master_Configuration.Manage_Labels.pageId)
      .then((response: any) => {
        if (response.data.isError) {
          navigate("/login");
        }
        else {
          var data = response?.data;
          var screenInfo = masterDataService.isAuthorizeUser(data, AppConstants.ScreenInfo.Master_Configuration.Manage_Labels);
          var allowedAction = {
            add: masterDataService.isActionAlowed(screenInfo, AppConstants.ScreenInfo.Master_Configuration.Manage_Labels.actionIds.add),
            edit: masterDataService.isActionAlowed(screenInfo, AppConstants.ScreenInfo.Master_Configuration.Manage_Labels.actionIds.edit),
            delete: masterDataService.isActionAlowed(screenInfo, AppConstants.ScreenInfo.Master_Configuration.Manage_Labels.actionIds.delete),
          }
          setAllowdAction(allowedAction);
        }
      }).catch((error) => {
        navigate(AppConstants.Redirection.Unauthorize_Access);
      });;
  }


  /////search programming  
  var labelSearch = { id: "", name: "All Channel" };
  const [labelHook, setlabelHook] = useState(labelSearch);
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
    //isValidUser();
    if(_permission.page_ManageLabels_Access !== true ){
      navigate("/dashboard");
    }
    getLabelDetails();
  }, []);

  const getLabelDetails = async () => {
    var input = {
      "status": "",
      "search": ""
    };
    await labelService.getLabel(input).then((response: any) => {
      if (response.data.isError) {
      } else {
        setUsers(response?.data);
      }
    });
  };

  //////Delete functionality

  const deleteLabelData = async (id: any) => {
    setOpend(true);
    setCurrentId(id);
  };

  const [opend, setOpend] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(false);

  const DeleteLabel = async () => {
    try {
      await labelService.deleteLabel(currentId).then((response: any) => {
        if (response.data.isError) {
        } else {
          toast.success("Label Deleted Successfully");
          handleClose();
          getLabelDetails();
        }
      });
    }
    catch (ex: any) {

      ex.data.Error.map((err: any, idx: any) => {
        toast.warning(err);
      });
    }
  }
  const handleClose = () => {
    setOpend(false);

  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };


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

  const triggerSearch = async (newValue: string) => {
    getSearchDetails(newValue);
    setPage(0);
  }

  /// search programming
  const getSearchDetails = async (newValue: string) => {

    let values = {
      department: labelHook.id,
      status: statusDataHook,
      search: newValue,
      take: 50,
      skip: 0
    }
    await labelService.getSearch(values)
      .then((response: any) => {

        if (response.data.isError) {

        }
        else {
          setUsers(response?.data);
          if (response.data.length == 0) {
            // setNoUser(true);
          }

        }
      });
  }

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

  type Order = 'asc' | 'desc';

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
  ): (
    a: { [key in Key]: string | string },
    b: { [key in Key]: string | string },
  ) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
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
    id: keyof Desig;
    label: string;
    numeric: boolean;
  }

  const headCells: readonly HeadCell[] = [

    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Labels',
    },


  ];


  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Desig>('srNo');

  interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Desig) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

  function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler =
      (property: keyof Desig) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell
          >
            Status
          </TableCell>
          <TableCell
          >
            Action
          </TableCell>
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
    property: keyof Desig,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
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
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const [noUser, setNoUser] = useState(false);


  ///////page change and dropdown programming over 



  const handleChangeRowsPerPage1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
        <Link color="inherit" to="/">
          Dashboard
        </Link>
        <Typography color="text.primary">Master Setup</Typography>
        <Typography color="text.primary">All Labels</Typography>
      </Breadcrumbs>
      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Stack 
         direction={{ xs: 'column', sm: 'row' }}
        spacing={2} 
        justifyContent={{xs:'flex-start', sm:"space-between"}} alignItems={{xs:"flex-start", sm:"center"}}
        sx={{ pb: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            All Labels
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <SearchBar setSearchValue={setSearchValue} callBackFunction={triggerSearch} />

          {/* {(actionAllowed.add && */}
          {_permission.action_ManageLabelsListing_Add_Access && (
            <Button variant="contained" size="large" component={Link} to='/add-label' color="primary" startIcon={<AddIcon />}>
              Add Label
            </Button>
          )}
          {/* )} */}

        </Stack>

        <Divider />
        <TableContainer sx={{ mt: 1 }}>
          <Table aria-label="simple table" size="small">

            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(users, getComparator(order, orderBy))
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
                        <Chip variant='approved' label='Active' color="default" />
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
                        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                          {/* {(actionAllowed.edit && */}
                          {_permission.action_ManageLabelsListing_Edit_Access && (
                            <Tooltip title="Edit">
                            <IconButton aria-label="edit" component={Link} to={`/edit-label/${row.id}`} size="medium">
                              <Icons.Edit />
                            </IconButton></Tooltip>
                          )}
                          {/* )} */}
                          {/* {(actionAllowed.view &&
                                                                        <IconButton aria-label="view" component={Link} to={`/project/edit-project/${row.id}`}>
                                                                            <Icons.View />
                                                                        </IconButton>
                                                                    )} */}
                          {/* {(actionAllowed.delete && */}
                          {_permission.action_ManageLabelsListing_Delete_Access && (
                            <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => deleteLabelData(row.id)}>
                              <Icons.Delete />
                            </IconButton></Tooltip>
                          )}
                          {/* )} */}
                        </Stack>
                      </StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>

              )}
            </TableBody>
          </Table>
          {users.length == 0 &&
            (<NotFound NotfoundText="No Result Found" />
            )}
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        open={opend}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Paper variant="outlined" sx={{ p: 4 }}>
            <Typography
              id="modal-modal-title"
              align="center"
              variant="h6"
              component="h2"
              sx={{ fontWeight: 700 }}
            >
              Delete Label
            </Typography>
            <Typography
              id="modal-modal-description"
              align="center"
              sx={{ mt: 2 }}
            >
              If the Label is assigned to any user, it cannot be deleted. If the
              Label is not assigned to any user, it will be deleted. Continue?
            </Typography>

            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 3 }}
            >
              <Button variant="outlined" onClick={handleClose}>Cancel</Button>
              <Button variant="contained" onClick={DeleteLabel}>Confirm</Button>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}

export default ManageLabelData;
