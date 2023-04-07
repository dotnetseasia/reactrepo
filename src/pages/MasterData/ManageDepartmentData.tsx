import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import theme from '../../theme/theme';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

const currencies = [
    {
        value: 'USD',
        label: 'All Departments',
    },
    {
        value: 'EUR',
        label: 'Design Departments',
    },
    {
        value: 'BTC',
        label: 'Dot Net Departments',
    },
    {
        value: 'JPY',
        label: 'Front-End Departments',
    },
];

const status = [
    {
        value: 'USD',
        label: 'Active',
    },
    {
        value: 'EUR',
        label: 'De-Active',
    }

];

const StatusButtonActive = styled(Button)({
    backgroundColor: '#E7FFF0',
    borderColor: '#E7FFF0',
    color: '#2DD36F',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#1F944E',
        borderColor: '#1F944E',
        boxShadow: 'none',
        color: "#fff",
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});
const StatusButtonDeactive = styled(Button)({
    backgroundColor: '#FBDADE',
    borderColor: '#FBDADE',
    color: '#A5303F',
    boxShadow: 'none',
    '&:hover': {
        backgroundColor: '#A5303F',
        borderColor: '#A5303F',
        boxShadow: 'none',
        color: "#fff",
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: 'none',
    },
});

interface Posts {
    id: number;
    name: string;
}

function ManageDepatmentData() {

    const [departments] = useState<Posts[]>([]);

    useEffect(() => {
        getDepartmentDetails();
    }, [])

    const getDepartmentDetails = async () => {
    }

    const deleteDepertmentData = async (id: any) => {
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };

    const [currency, setCurrency] = React.useState('EUR');
    return (
        <>

            <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">

                    <Avatar sx={{ width: 52, height: 52 }}>H</Avatar>
                    <Stack spacing={0}>
                        <Typography variant="subtitle1" component="h5"  >
                            Department Master Data
                        </Typography>
                        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
                            Manage Department Data
                        </Typography>
                    </Stack>
                </Stack>

                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            size="small"
                            value={currency}
                        >
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>

                    <Stack direction="row" >
                        <Paper
                            component="form"
                            elevation={0}
                            sx={{ width: '350px', border: '1px solid', borderColor: theme.palette.grey[200], display: 'flex', alignItems: 'center', p: 0.5 }}
                        >     <SearchIcon sx={{ opacity: 0.4 }} />
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Paper>

                    </Stack>
                </Stack>
            </Paper>
            <TableContainer component={Paper} elevation={0} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Sr. No</TableCell>
                            <TableCell align="left">Department</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>

                        {
                            departments.map(x => (
                                <>
                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="left">{x.id}</TableCell>
                                        <TableCell align="left">{x.name}</TableCell>
                                        <TableCell align="left">  <StatusButtonActive variant="contained" size="small" startIcon={<FiberManualRecordIcon />}>Active</StatusButtonActive>
                                            <StatusButtonDeactive variant="contained" size="small" startIcon={<FiberManualRecordIcon />}>De-Active</StatusButtonDeactive>
                                        </TableCell>

                                        <TableCell align="right">

                                            <IconButton aria-label="delete" id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}>
                                                <MoreHorizIcon />
                                            </IconButton>

                                            <Menu
                                                key={x.id}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={(_, reason) => {
                                                    if (reason !== "backdropClick") {
                                                        handleClose();
                                                    }
                                                }}
                                                elevation={0}
                                            >

                                                <MenuItem><Link to={`/editmanage-department/${x.id}`} onClick={() => {
                                                }}>Edit</Link> </MenuItem>
                                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>

                                        </TableCell>
                                        <TableCell align="left">
                                            <Link to={`/editmanage-department/${x.id}`}  >Edit</Link>

                                        </TableCell>
                                        <TableCell align="left">
                                            <button onClick={() => deleteDepertmentData(x.id)}>Delete</button>

                                        </TableCell>
                                    </TableRow>
                                </>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ManageDepatmentData;