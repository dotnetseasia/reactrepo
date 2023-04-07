import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import SearchBar from '../../../components/styledComponent/SearchBar'
import Box from '@mui/material/Box';

import { badgesService } from '../../../service/master-service/badges-services';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};



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



interface Badge {
    id: number;
    name: string;
}

function ManageBadges() {
    const [users, setUsers] = useState<Badge[]>([]);

    useEffect(() => {
        getUsersDetails();
    }, [])

    const getUsersDetails = async () => {
        await badgesService.getBadges()
            .then((response: any) => {
                if (response.data.isError) {

                }
                else {
                    setUsers(response?.data);
                }
            });
    }

    const deleteUserData = async (id: any) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this ?"
        )
        if (confirmBox === true) {
            await badgesService.deleteBadges(id)
                .then((response: any) => {
                    if (response.data.isError) {

                    }
                    else {
                        getUsersDetails();
                    }
                });
        }

    }
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>

        
            <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                <Link color="inherit" to="/">
                    Master Data
                </Link>
                <Typography color="text.primary">Manage Department</Typography>
            </Breadcrumbs>

            <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
                        All Skills
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <SearchBar />
                    <Button variant="contained" size="large" component={Link} to='/add-technicalskill' color="primary" startIcon={<AddIcon />}>
                        Add Badges
                    </Button>
                </Stack>

            </Paper>
            <Divider />

            <TableContainer sx={{ mt: 1 }} >

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Sr. No</TableCell>
                            <TableCell align="left">Badges</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[0, 1, 2, 3, 4, 5].map((value) => {


                            return (
                                <TableRow

                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="left">01</TableCell>
                                    <TableCell align="left">Badges</TableCell>
                                    <TableCell align="left">  <StatusButtonActive variant="contained" size="small" startIcon={<FiberManualRecordIcon />}>Active</StatusButtonActive>
                                        <StatusButtonDeactive variant="contained" size="small" startIcon={<FiberManualRecordIcon />}>De-Active</StatusButtonDeactive>
                                    </TableCell>
                                    <TableCell align="right">



                                    </TableCell>
                                </TableRow>
                            );
                        })}


                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ManageBadges;