import React, { useEffect } from 'react';
import Button from "@mui/material/Button";
import * as Icons from "../assests/icons/icons";
import { toast } from "material-react-toastify";
import theme from "../theme/theme";
import {
    Autocomplete,
    Box, Divider, Grid, ListItemButton, Paper, Table, TableBody, TableCell,
    TableContainer, TableHead, TablePagination, TableRow, TextField, Typography,
} from "@mui/material";
import { useSelector } from 'react-redux';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/material/Menu';
import { userdashboardservices } from '../service/userdashboard-service';
import ro from 'date-fns/esm/locale/ro/index.js';
import moment from 'moment';
import { brownieemployeeservice } from '../service/master-service/brownieEmployee-service';
import { id } from 'date-fns/locale';
import NotFound from '../components/styledComponent/NotFound';
const options = [
    'Show some love to Seasia Connect',
    'Show all notification content',
    'Hide sensitive notification content',
    'Hide all notification content',
];


const styles = {
    // NotificatioTitle: {
    //     // fontWeight: 500,
    //     // fontSize: '20px',
    //     // lineHeight: ' 23px',
    //     // color: theme.palette.primary.dark,
    //     // marginLeft: '15px',
    // },
    cardStyleProject: {
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: "16px",
        color: "#232360",
        marginBottom: "5px",
    },
    cardStyleCompany: {
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "18px",
        color: "#232360",
        marginBottom: "5px",
    },
    cardStyleTask: {
        fontWeight: 300,
        fontSize: "16px",
        lineHeight: "18px",
        color: "#616161",
    },
    taskTitle: {
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "23px",
        color: "#232360",

    },
    //     bRadius: {
    //         borderRadius: '16px',
    //         border: '1px solid #EEEEEE',
    //         cursor:"pointer",
    //         "&:hover":{
    //             backgroundColor:"#fbfbfb"
    //         }

    //     },
    //     selected:{
    //    backgroundColor:"#fbfbfb"
    //     },
    tableTH: {
        borderBottom: 'transparent',
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "18px",
        color: "#232360",
        borderTop: '1px solid #EEEEEE;',

    },
    table: {
        marginTop: '10px',
    },
    calenderTitle: {
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "23px",
        color: "#232360",
    },
    timeOne: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
        color: "#616161",
    },
    mettingOne: {
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "24px",
        color: " #212121",
    },
    mettingTwo: {
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: "16px",
        color: "#616161",
    },
    timeTwo: {
        fontWeight: 300,
        fontSize: "14px",
        lineHeight: "16px",
        color: "#000000",
        marginTop: '3px',
    },
    listNone: {
        listStyle: 'none',
        marginBottom: '18px',
    },
    bRight: {
        borderLeft: '5px solid #1DA7FF'
    },
    bNone: {
        borderRadius: '0',
    },
    borderNone: {
        border: 'none'
    },
    brownieBox: {
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "16px",
        color: "#232360",
    },
    brownieOuter: {
        marginTop: '16px',
        borderRadius: '16px',
        border: '1px solid #EEEEEE',

    },
    p15: {
        paddingBottom: '15px',
    },
    point: {
        fontWeight: 700,
        fontSize: "16px",
        lineHeight: "18px",
        color: "#424242",
    }
}
interface Iproject {
    projectId: string;
    projectName: string;
}

function createData(
    name: string,
    sprintName: string,
    task: number
) {
    return { name, sprintName, task };
}

const rows = [
    createData('Frozen yoghurt', "Sprint 1", 4),
    createData('Ice cream sandwich', "Sprint 2", 10),
    createData('Eclair', "Sprint 1", 4),
    createData('Cupcake', "Sprint 2", 2),
    createData('Gingerbread', "Sprint 1", 8),
];


function taskDetails(
    taskSummary: string,
    status: number,
    estimatedHours: number,
    timeTaken: string,
    stats: number
) {
    return { taskSummary, status, estimatedHours, timeTaken, stats };
}

const taskRows = [
    taskDetails('APi Issue ', 1, 4, "5", 24),
    taskDetails('Image not found', 2, 15, "05", 85),
    taskDetails('Testing', 3, 6, "2", 100),

];

export default function UserDashboard() {
    const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);

    const [user, setUser] = React.useState<any>([]);
    const [selectedProjectId, setSelectedProjectId] = React.useState("");
    const [projectList, setProjectList] = React.useState<Iproject[]>([]);
    const [taskList, setTaskList] = React.useState<any>([]);
    const projectData = { projectId: "0", projectName: "Select Project" };
    const [brownie, setBrownie] = React.useState<any>([]);



    const [selectedIndex, setSelectedIndex] = React.useState<any>(null);
    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        index: number,
    ) => {
        setSelectedIndex(index);

    };

    ////////Pagination Programming
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
        setSelectedIndex(null);
    };
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    ////////over

    useEffect(() => {
        getProjectDetails();
        getPointDetails();
    }, [])

    const getProjectDetails = async () => {
        await userdashboardservices.getUserDetails(_authUser.id).then((response: any) => {
            if (response.data.isError) {
            } else {
                let data = [];
                data.push(projectData);
                response.data.map((dep: any) => {
                    data.push(dep);
                })
                setUser(response?.data);
                setProjectList(data)
            }
        });
    };

    const getPointDetails = async () => {
        var input = {
            pointType: 1,
        };
        await brownieemployeeservice
            .getAllRewardPointWithStatus(input)
            .then((response: any) => {
                if (response.data.isError) {
                } else {
                    setBrownie(response.data)
                }
            });
    };

    const total = brownie.reduce((sum: any, item: any) => sum + item.pointAssigned, 0);

    const getUserDatabyId = async (id: any, userId: any) => {
        var req = {
            projectId: id,
            userId: _authUser.id,

        }
        await userdashboardservices.getDataById(req).then((response: any) => {
            if (response.data.isError) {
            } else {
                setTaskList(response.data)
            }
        });
    };

    const calculateData = (estimatedHours: any, timeTaken: any)=> {
     return timeTaken != null ?(parseInt(estimatedHours || 0) /  parseInt(timeTaken) )* 100 : 0;
    };


    return (
        <>
        {/* <Chat /> */}
            {/* <Box sx={styles.NotificatioTitle}>
            <h1>Welcome ddd {_authUser.employeeInfo.currentUserName}</h1>
     </Box> */}
            <Paper elevation={0} sx={{ p: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} lg={9}>

                        <Grid container spacing={2}>
                            {user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item: any, index: any) => (
                                    <Grid item lg={3}>
                                        <ListItemButton
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                            dense
                                            sx={{
                                                borderRadius: "16px", p: 0, border: "1px solid #EEEEEE", "&.Mui-selected": {
                                                    backgroundColor: "#E1E9F2",
                                                }
                                            }}
                                        >
                                            <Box sx={[{ p: 3 }]} onClick={(e) => { getUserDatabyId(item?.projectId, id); setSelectedProjectId(item?.projectId); }}>
                                                <Typography sx={styles.cardStyleProject} variant="h2" component="h2" >
                                                    Project
                                                </Typography>
                                                <Typography sx={[styles.cardStyleProject, { fontWeight: "bold" }]} variant="h2" component="h2">
                                                    {item?.projectName}
                                                </Typography>
                                                <Typography sx={styles.cardStyleCompany} variant="h3" component="h2">
                                                    {item?.name}
                                                </Typography>
                                                <Typography sx={styles.cardStyleTask} variant="h3" component="h2">
                                                    {item?.sprintName}, {item?.numberOfTask} Task
                                                </Typography>
                                            </Box>
                                        </ListItemButton>
                                    </Grid>
                                ))}
                        </Grid>
                        {(user.length > 4 &&
                            <TablePagination
                                labelRowsPerPage="Cards per page"
                                rowsPerPageOptions={[4]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />)}


                        <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mt: 3 }}>
                            <Typography sx={styles.taskTitle}>
                                Task List
                            </Typography>
                            <Box sx={{ minWidth: 120 }}>
                                <Autocomplete
                                    value={projectList?.find(
                                        (option) => option.projectId == selectedProjectId
                                    ) ?? projectData}
                                    fullWidth
                                    id="selectedAssigneId"
                                    options={projectList}
                                    getOptionLabel={(option) => option.projectName}
                                    onChange={async (event, value) => {
                                        setSelectedIndex(null);
                                        setSelectedProjectId(value?.projectId ?? "");
                                        await getUserDatabyId(value?.projectId, _authUser.id ?? "");
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            autoFocus
                                            id="selectedAssigneId"
                                            variant="outlined"
                                            size="small"
                                            name="IssueAssigneeId"
                                            sx={{ width: '22ch' }}
                                            value={selectedProjectId}
                                        />
                                    )} />
                            </Box>
                        </Stack>

                        {taskList && taskList.length > 0 ? (
                            <TableContainer component={Paper} elevation={0}>
                                <Table sx={[{ minWidth: 650 }, styles.table]} aria-label="simple table" size='small'>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Sr No.</TableCell>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Task Summary</TableCell>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Status</TableCell>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Estimated Hour's</TableCell>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Time Taken</TableCell>
                                            <TableCell sx={[styles.tableTH, { p: 2 }]}>Stats</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {taskList.map((item: any, idx: any) => (
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" sx={{ p: 2 }}>
                                                    {idx + 1}
                                                </TableCell >
                                                <TableCell sx={{ p: 2 }}>{item?.taskSummary}</TableCell>
                                                <TableCell sx={{ p: 2 }}>
                                                    {(item?.status == "Sprint Backlog" && <Chip variant="todo" label="Sprint Backlog" />)}
                                                    {(item?.status == "In Progress" && <Chip variant="progress" label="In Progress" />)}
                                                    {(item?.status == "QA Failed" && <Chip variant='hold' label="Qa Failed" />)}
                                                </TableCell>
                                                <TableCell sx={{ p: 2 }}>{item?.estimatedHours ?? 0} Hrs</TableCell>
                                                {/* <TableCell sx={{ p: 2 }}>  {`${moment(item?.timeTaken).format("h:mm a")}`} Hrs</TableCell> */}
                                                <TableCell sx={{ p: 2 }}>  {item?.timeTaken ?? 0} Hrs</TableCell>
                                                <TableCell sx={{ p: 2 }}>{calculateData(item?.timeTaken, item.estimatedHours).toFixed(2)}% complete
                                                    <LinearProgress variant="determinate" value={calculateData(item?.timeTaken, item?.estimatedHours)}
                                                        color={ calculateData(item?.timeTaken, item.estimatedHours) >= 99 ? "error" : "success"} />
                                                </TableCell>
                                                {/* <TableCell sx={{ p: 2 }}>{((parseInt(item?.timeTaken != null ? item.timeTaken : 0)
                                                 / parseInt(item?.estimatedHours != null ? item.estimatedHours : 0)) * 100).toFixed(2)}% complete
                                                    <LinearProgress variant="determinate" value={(parseInt(item?.timeTaken != null ? item.timeTaken : 0) 
                                                    / parseInt(item?.estimatedHours != null ? item.estimatedHours : 0)) * 100}
                                                        color={(parseInt(item?.timeTaken) / parseInt(item?.estimatedHours)) * 100 >= 99 ? "error" : "success"} />
                                                </TableCell> */}
                                            </TableRow>))}

                                    </TableBody>
                                </Table>
                            </TableContainer>) : (<NotFound NotfoundText="No Task Found" />)}
                    </Grid>
                    <Grid item xs={12} lg={3}>
                        {/* <Box >
                            <Typography sx={styles.calenderTitle} variant="h3" component="h2">
                                Today’s Calendar
                            </Typography>
                            <Box component='ul' sx={{ p: 0 }}>
                                <Paper component='li' elevation={0} sx={[styles.listNone, styles.bRight, styles.bNone]}>
                                    <Stack direction="row" justifyContent='space-between' sx={{ p: 3 }}>
                                        <Box >
                                            <Typography sx={styles.timeOne} variant="h3" component="h2">
                                                11:00AM
                                            </Typography>
                                            <Typography sx={styles.timeTwo} variant="h3" component="h2">
                                                30min
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={styles.mettingOne} variant="h3" component="h2">
                                                Meeting With a client
                                            </Typography>
                                            <Typography sx={styles.mettingTwo} variant="h3" component="h2">
                                                On Teams
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                                <Paper component='li' elevation={0} sx={[styles.listNone, styles.bRight, styles.bNone]}>
                                    <Stack direction="row" justifyContent='space-between' sx={{ p: 3 }}>
                                        <Box component='div'>
                                            <Typography sx={styles.timeOne} variant="h3" component="h2">
                                                11:00AM
                                            </Typography>
                                            <Typography sx={styles.timeTwo} variant="h3" component="h2">
                                                30min
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={styles.mettingOne} variant="h3" component="h2">
                                                Meeting With a client
                                            </Typography>
                                            <Typography sx={styles.mettingTwo} variant="h3" component="h2">
                                                On Teams
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                                <Paper component='li' elevation={0} sx={[styles.listNone, styles.bRight, styles.bNone]}>
                                    <Stack direction="row" justifyContent='space-between' sx={{ p: 3 }}>
                                        <Box component='div'>
                                            <Typography sx={styles.timeOne} variant="h3" component="h2">
                                                11:00AM
                                            </Typography>
                                            <Typography sx={styles.timeTwo} variant="h3" component="h2">
                                                30min
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <Typography sx={styles.mettingOne} variant="h3" component="h2">
                                                Meeting With a client
                                            </Typography>
                                            <Typography sx={styles.mettingTwo} variant="h3" component="h2">
                                                On Teams
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </Paper>
                            </Box>
                        </Box> */}
                        <Box>
                            <Typography variant="h2" component="h2" sx={styles.calenderTitle}>
                                Brownie Points
                            </Typography>
                            <Paper variant='outlined' sx={[{ p: 2 }, styles.brownieOuter]}>
                                <Stack direction='row' justifyContent='space-between' sx={styles.p15}>
                                    <Typography variant="h3" component="h2" sx={styles.brownieBox}>
                                        Total Brownie Points
                                    </Typography>
                                    <Typography variant="h3" component="h2" sx={styles.point}>
                                        {total}
                                    </Typography>
                                </Stack>



                                <Box>
                                    <TableContainer component={Paper} elevation={0}>
                                        <Table aria-label="simple table" size='small' border={0}>
                                            <TableHead >
                                                <TableRow>
                                                    <TableCell sx={[styles.tableTH, { p: 1 }]}>Date</TableCell>
                                                    <TableCell sx={[styles.tableTH, { p: 1 }]}>Points Earned</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>

                                                {brownie.slice(0, 5).map((item1: any) => (
                                                    <><TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell component="th" scope="row" sx={[{ p: 1 }, styles.borderNone]}>
                                                            {`${moment(item1?.allocatedPointDate).format("DDMMM, YYYY")}`}</TableCell>
                                                        <TableCell sx={[{ p: 1 }, styles.borderNone]}>{item1?.pointAssigned}</TableCell>
                                                    </TableRow></>))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
}
