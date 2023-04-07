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
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chip, { ChipProps } from '@mui/material/Chip';
import * as Icons from '../../assests/icons/icons';


const StatusChip = styled(Chip)<ChipProps>(({ theme }) => ({
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    fontWeight: 400,
    fontSize: 14,

}));

interface Posts {
    id: number;
    name: string;
}

function ManageBadgesData() {

    const [badges] = useState<Posts[]>([]);

    useEffect(() => {
        getBadgesDetails();
    }, [])

    const getBadgesDetails = async () => {
    }

    const deleteBadgesData = async (id: any) => {
    }

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {

        setAnchorEl(null);
    };

    return (
        <>
            <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} alignItems="center">

                    <Avatar sx={{ width: 52, height: 52 }}>H</Avatar>
                    <Stack spacing={0}>
                        <Typography variant="subtitle1" component="h5"  >
                            Badges Master Data
                        </Typography>
                        <Typography variant="h5" noWrap component="div" sx={{ fontWeight: 600 }}>
                            Manage Badges Data
                        </Typography>
                    </Stack>
                </Stack>
            </Paper>
            <TableContainer component={Paper} elevation={0} >
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

                        {
                            badges.map(badges =>

                            (
                                <>
                                  

                                    <TableRow

                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell align="left">{badges.id}</TableCell>
                                        <TableCell align="left">{badges.name}</TableCell>
                                        <TableCell align="left">

                                            <StatusChip label={<span><Icons.CircleFilled /> Active</span>} />
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
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={(_, reason) => {
                                                    if (reason !== "backdropClick") {
                                                        handleClose();
                                                    }
                                                }}
                                                elevation={0}
                                            >

                                                <MenuItem><Link to={`/editmanage-badges/${badges.id}`} onClick={handleClose}>Edit</Link> </MenuItem>
                                                <MenuItem onClick={handleClose}>Delete</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>

                                        </TableCell>
                                        <TableCell align="left">
                                            <Link to={`/editmanage-badges/${badges.id}`} onClick={handleClose}>Edit</Link>

                                        </TableCell>
                                        <TableCell align="left">
                                            <button onClick={() => deleteBadgesData(badges.id)}>Delete</button>

                                        </TableCell>
                                    </TableRow>
                                </>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ManageBadgesData;