import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import AddEmployee from '../assests/iconComponents/AddEmployee'
import AddProject from '../assests/iconComponents/AddProject'
import AddRole from '../assests/iconComponents/AddRole'
import Typography from '@mui/material/Typography';
import { Link, useNavigate, } from "react-router-dom";
import Box from '@mui/material/Box';
import theme from '../theme/darkTheme';
import ItemPaper from '../components/styledComponent/ItemPaper';
import * as Icons from '../assests/icons/icons';
import { toast } from 'material-react-toastify';
import { AppConstants } from '../config/AppConstants'
import NotFound from "../components/styledComponent/NotFound";
import { useSelector } from 'react-redux';


// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
//     ...theme.typography.body2,
//     margin: '0.02rem',
//     padding: theme.spacing(10),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//     borderRadius: 0,
//     transition: '0.3s all ease',
//     '&:hover': {
//         backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     }
// }));

const LongText = (props: {
    content?: any;
    limit?: any;
}) => {
    const [showAll, setShowAll] = useState(false);

    const showMore = () => setShowAll(true);
    const showLess = () => setShowAll(false);
    if (props.content.length <= props.limit) {
        // there is nothing more to show
        return <div>{props.content}</div>
    }
    if (showAll) {
        // We show the extended text and a link to reduce it
        return <Box sx={{ whiteSpace: "break-spaces" }}>
            {props.content}

            <Box onClick={showLess}>less...</Box>
        </Box>
    }
    // In the final case, we show a text with ellipsis and a `Read more` button
    const toShow = props.content ? props.content.substring(0, props.limit) : "";
    return <Box sx={{ whiteSpace: "break-spaces", color: "#616161", fontSize: "14px", lineHeight: "26px", fontWeight: "300", mt: 2 }}>
        {toShow} ...

        {/* <Box   onClick={showMore}></Box>  */}
    </Box>
}
const styles = {
    link: {
        color: theme.palette.grey[900],
        margin: 0,
        marginLeft: theme.spacing(2),
        '&:hover': {
            color: theme.palette.primary.dark
        }

    }
}


const reportManagement = async () => {
    toast.warn('Coming Soon')
};

const leaveManagement = async () => {
    toast.warn('Coming Soon')
};


export default function Dashboard() {
    const [currentLoggedInRole, setLoggedInRole] = useState('');
    const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);
    const [userName, setUsername] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        if (_authUser.typeOfUser == AppConstants.UserType.User)
         {
            navigate("/userdashboard");
          }
        if (_authUser.typeOfUser) {
            let curreUserRole = _authUser.typeOfUser;
            curreUserRole = curreUserRole ? curreUserRole : '';
            setLoggedInRole(curreUserRole);
        }
        const currentLoggedInUserName = _authUser.employeeInfo.currentUserName;
        setUsername(currentLoggedInUserName);

    }, []);
    return (
        <>
            {currentLoggedInRole != AppConstants.UserType.Admin && (
                <Stack direction="row"
                    justifyContent="flex-start"
                    alignItems="center" >
                    <Typography>
                        Welcome {userName}
                    </Typography>
                </Stack>
            )}
            {currentLoggedInRole == AppConstants.UserType.Admin ? (
                <Stack direction="row"
                    justifyContent="flex-start"
                    alignItems="center" >
                    <Grid container spacing={2} alignItems="stretch">

                        <Grid item xs={12} md={4} xl={3}>
                            <ItemPaper elevation={0}>
                                <Box component={Link} to='/project/projectlist' sx={{ textDecoration: 'none' }}>
                                    <Stack direction='row' alignItems='center'>
                                        <Icons.AddProject />
                                        <Typography variant="h6" sx={styles.link}>
                                            Project management
                                        </Typography>

                                    </Stack>

                                </Box>

                                <LongText content="As an admin you can create a new project, assign a project owner,allocate resources from your team and ask resources from other departments, see board and follow agile methodology. You can view complete milestones and sprints details of the project.Accept and reject offline hours posted by an employee." limit={100} />

                                <Box component={Link}
                                    to='/project/projectlist'
                                    sx={{ textDecoration: "none", color: theme.palette.primary.main, mt: 1, display:"block" }}
                                >
                                    View More
                                </Box>
                            </ItemPaper>
                        </Grid>
                        <Grid item xs={12} md={4} xl={3}>
                            <ItemPaper elevation={0}>
                                <Box component={Link} to='/role-management/add-new-role' sx={{ textDecoration: 'none' }}>
                                    <Stack direction='row' alignItems='center'>
                                        <Icons.AddRole />
                                        <Typography variant="h6" sx={styles.link}>
                                            Add Role
                                        </Typography>
                                    </Stack>


                                </Box>

                                <LongText content='As an admin, in this section you create a new role, copy from an existing role, view list of all the roles added, perform CRED and provide screen based permissions to that role.' limit={100} />

                                <Box component={Link}
                                    to='/role-management/add-new-role'
                                    sx={{ textDecoration: "none", color: theme.palette.primary.main, mt: 1, display:"block"  }}
                                >
                                    View More
                                </Box>
                            </ItemPaper>
                        </Grid>

                        <Grid item xs={12} md={4} xl={3}>
                            <ItemPaper elevation={0}>
                                <Box component={Link} to='/users/add-user' sx={{ textDecoration: 'none' }}>
                                    <Stack direction='row' alignItems='center'>
                                        <Icons.AddUser />
                                        <Typography variant="h6" sx={styles.link}>
                                            Add User
                                        </Typography>
                                    </Stack>

                                </Box>

                                <LongText content="As an admin, you can add a user by filling all the related details like user employee details, past experience, personal details, skill sets, achievements & certifications that the user has done.
                                    Leave management- As an admin you can set up leaves for the organization like the total number of casual leaves, sick leave, earned leaves to be provided to an employee." limit={100} />

                                <Box component={Link}
                                    to='/users/add-user'
                                    sx={{ textDecoration: "none", color: theme.palette.primary.main,  mt: 1, display:"block"  }}
                                >
                                    View More
                                </Box>
                            </ItemPaper>
                        </Grid>
                        <Grid item xs={12} md={4} xl={3}>
                            <ItemPaper elevation={0}>
                                <Box component={Link} to='/leave-Management' sx={{ textDecoration: 'none' }}>
                                    <Stack direction='row' alignItems='center'>
                                        <Icons.LeaveManagement />
                                        <Typography variant="h6" sx={styles.link}>
                                            Leave Management
                                        </Typography>
                                    </Stack>

                                </Box>
                                <Typography variant="body1">

                                </Typography>
                                <LongText content=" As an admin you can set up leaves for the organization like the total number of casual leaves, sick leave, earned leaves to be provided to an employee." limit={100} />

                                <Box component={Link}
                                    to='/leave-Management'
                                    sx={{ textDecoration: "none", color: theme.palette.primary.main, mt: 1, display:"block"  }}
                                >
                                    View More
                                </Box>
                            </ItemPaper>
                        </Grid>
                        <Grid item xs={12} md={4} xl={3}>
                            <ItemPaper elevation={0}>
                                <Box component={Link} to='/report-management' sx={{ textDecoration: 'none' }}>
                                    <Stack direction='row' alignItems='center'>
                                        <Icons.ReportManagement />
                                        <Typography variant="h6" sx={styles.link}>
                                            Report Management
                                        </Typography>
                                    </Stack>

                                </Box>


                                <LongText content="As an admin, you can view all the reports related to project management, daily attendance, milestones reports,etc." limit={100} />
                                <Box component={Link}
                                    to='/report-management'
                                    sx={{ textDecoration: "none", color: theme.palette.primary.main, mt: 1, display:"block" }}
                                >
                                    View More
                                </Box>
                            </ItemPaper>
                        </Grid>
                    </Grid>
                </Stack>
            ) : (<NotFound NotfoundText="Work In Progress" />)}

{/* <Chat /> */}
        </>
    );
}