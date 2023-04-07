import React from 'react';
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip, { ChipProps } from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import StyledTableCell from '../../components/styledComponent/CustomTableCell'
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import theme from '../../theme/theme';
import * as Icons from '../../assests/icons/icons';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search';
import TablePagination from '@mui/material/TablePagination';
import InputBase from '@mui/material/InputBase';
import SearchBar from '../../components/styledComponent/SearchBar';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Modal from '@mui/material/Modal';
import ClearIcon from '@mui/icons-material/Clear';
const dummy = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];
const options = [
    'All Departments',
    'UI/UX Department',
    'FrontEnd',
    'Lorem Ipsum',
];
const optionsStatus = [
    'Active',
    'De-Active',
    'Null', ,
];

const styleCross = {
    position: 'absolute' as 'absolute',
    right: '-20px'
};


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 600,
};

const StatusChip = styled(Chip)<ChipProps>(({ theme }) => ({
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    fontWeight: 400,
    fontSize: 14,

}));

export default function DepartmentHead() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const open = Boolean(anchorEl);


    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    const [aanchorEl, statussetAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedstatusIndex, setStatusSelectedIndex] = React.useState(1);
    const stopen = Boolean(aanchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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



    const [openModal, setModalOpen] = React.useState(false);
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const [openManModal, setModalManOpen] = React.useState(false);
    const handleManModalOpen = () => setModalManOpen(true);
    const handleManModalClose = () => setModalManOpen(false);

    const [page, setPage] = React.useState(2);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <>
            <Paper elevation={0} sx={{ p: 3, pb: 0 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        Department Head
                    </Typography>
                    <Stack direction="row" spacing={2}>


                        <SearchBar />
                        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleManModalOpen}>
                            Add Project
                        </Button>
                    </Stack>
                </Stack>


                <Divider />

                <TableContainer sx={{ mt: 1 }} >
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Sr. No</StyledTableCell>
                                <StyledTableCell align="left">Department</StyledTableCell>
                                <StyledTableCell align="left">Names</StyledTableCell>
                                <StyledTableCell align="left">Email Id</StyledTableCell>
                                <StyledTableCell align="right">Created On</StyledTableCell>
                                <StyledTableCell align="right">Created By</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>

                            <TableRow

                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell component="th" scope="row">
                                    01
                                </StyledTableCell>
                                <StyledTableCell align="left">Designing</StyledTableCell>
                                <StyledTableCell align="left">
                                    <Box sx={{ fontWeight: 300 }}>Abhishek Vasudev</Box>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    avasudev@seasiainfotech.com
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    12 May, 2022
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    Admin
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                                        <IconButton aria-label="edit" size="medium">
                                            <Icons.Edit />
                                        </IconButton>
                                        <IconButton aria-label="edit">
                                            <Icons.View />
                                        </IconButton>
                                        <IconButton aria-label="edit" onClick={handleModalOpen}>
                                            <Icons.Delete />
                                        </IconButton>
                                    </Stack>
                                </StyledTableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[ 10, 15, 20, 25]}
                    component="div"
                    count={1}
                    rowsPerPage={1}
                    page={1}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper variant="outlined" sx={{ p: 4 }}>
                        <Typography id="modal-modal-title" align="center" variant="h6" component="h2" sx={{ fontWeight: 700 }}>
                            Delete Role
                        </Typography>
                        <Typography id="modal-modal-description" align="center" sx={{ mt: 2 }}>
                            If the Role is assigned to any user, it
                            cannot be deleted. If the Role is not
                            assigned to any user,  it will be deleted.
                            Continue?
                        </Typography>

                        <Stack direction="row" spacing={2}
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 3 }}
                        >
                            <Button variant="outlined" onClick={handleModalClose}>Cancel</Button>
                            <Button variant="contained">Confirm</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>


            <Modal
                open={openManModal}
                onClose={handleManModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Paper variant="outlined" sx={{ p: 4, mb: 2 }}>
                        <Stack direction="row" spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{ position: 'relative' }}

                        >

                            <IconButton aria-label="delete" color="primary" sx={styleCross} onClick={handleManModalClose}>
                                <ClearIcon />
                            </IconButton>

                        </Stack>
                        <Typography id="modal-modal-title" align="left" variant="h6" component="h2" sx={{ fontWeight: 700, mb: 4 }}>
                            Add Head of the department
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField id="outlined-basic" label="Department" variant="outlined" fullWidth />
                            <TextField id="outlined-basic"
                                select
                                label="Select User"
                                variant="outlined"
                                fullWidth
                            >
                                {dummy.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        </Stack>
                        <Stack direction="row" spacing={2}
                            justifyContent="flex-end"
                            alignItems="center"
                            sx={{ mt: 3 }}
                        >

                            <Button variant="contained">Confirm</Button>
                        </Stack>
                    </Paper>
                </Box>
            </Modal>
        </>
    );
}