import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import StyledTableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import StyledTableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { documentlistServices } from '../../../service/master-service/documentlist-services';
import Chip, { ChipProps } from '@mui/material/Chip';
import * as Icons from '../../../assests/icons/icons';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SearchBar from '../../../components/styledComponent/SearchBar'
import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';




const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
};


const StatusChip = styled(Chip)<ChipProps>(({ theme }) => ({
    color: theme.palette.success.dark,
    backgroundColor: theme.palette.success.light,
    fontWeight: 400,
    fontSize: 14,

}));



interface Skills {
    id: number;
    name: string;
}

function ManageDocumentListData() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [document, setDocument] = useState<Skills[]>([]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    useEffect(() => {
        getDocumentDetails();
    }, [])

    const getDocumentDetails = async () => {
        await documentlistServices.getDocument()
            .then((response: any) => {
                if (response.data.isError) {

                }
                else {
                    setDocument(response?.data);
                }
            });
    }

    const deleteDocument = async (id: any) => {
        const confirmBox = window.confirm(
            "Do you really want to delete this ?"
        )
        if (confirmBox === true) {
            await documentlistServices.deleteDocument(id)
                .then((response: any) => {
                    if (response.data.isError) {

                    }
                    else {
                        getDocumentDetails();
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
                    Dashboard
                </Link>
                <Typography color="text.primary">Master Data</Typography>
                <Typography color="text.primary">Manage DocumentList</Typography>
            </Breadcrumbs>
            <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" sx={{ pb: 3 }}>
                    <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                        All Document List
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <SearchBar />
                    <Button variant="contained" size="large" component={Link} to='/add-document' color="primary" startIcon={<AddIcon />}>
                        Add Document List
                    </Button>
                </Stack>

                <Divider />

                <TableContainer sx={{ mt: 1 }} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <StyledTableRow>
                                <StyledTableCell align="left">Sr. No</StyledTableCell>
                                <StyledTableCell align="left">Document List</StyledTableCell>
                                <StyledTableCell align="left">Status</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </StyledTableRow>
                        </TableHead>

                        <TableBody>
                            {document
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((user, idx) => (
                                    // users.map((user, idx) =>
                                    <>
                                      
                                    
                                        <StyledTableRow key={idx + 1}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <StyledTableCell align="left" >{idx + 1}</StyledTableCell>
                                            <StyledTableCell align="left">{user.name}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <StatusChip label={<span><Icons.CircleFilled /> Active</span>} />
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
                                                    <IconButton aria-label="edit" size="medium" component={Link} to={`/manage-document/${user.id}`}>
                                                        <Icons.Edit />
                                                    </IconButton>
                                                    <IconButton aria-label="edit">
                                                        <Icons.View />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" onClick={() => deleteDocument(user.id)} >
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
                    count={document.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default ManageDocumentListData;