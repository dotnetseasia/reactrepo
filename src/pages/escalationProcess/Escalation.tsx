import React, { useEffect, useState } from 'react';
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate, Navigate, useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemButton from '@mui/material/ListItemButton';
import Stack from '@mui/material/Stack';
import theme from '../../theme/theme';
import ChatMsg from './ChatMsg';
import IconButton from '@mui/material/IconButton';
import * as Icons from "../../assests/icons/icons";
import { escalationService } from '../../service/escalation-service';
import { boolean } from 'yup';
import { toast } from 'material-react-toastify';
import { Formik } from 'formik';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { Tooltip } from '@mui/material';
import SearchBar from '../../components/styledComponent/SearchBar';
import { apiUrl } from '../../service/common-services/apiURL';
import { HubConnection, HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import secureLocalStorage from 'react-secure-storage';


const styles = {
    user: {
        username: {
            fontSize: '18px', fontWeight: 500,
            lineHeight: 1,
            color: theme.palette.primary.dark,
            textTransform: "capitalize"
        },
        userProject: {
            fontSize: '14px', color: theme.palette.grey[600]
        },
        timeStamp: {
            fontSize: '13px',
            color: theme.palette.grey[400]
        }
    },
};
interface EscalationInfo {

    id: string;
    subject: string;
    level: string;
    description: string;
    status: string,
    projectId: string;
    projectName: string;
    clientName: string;
    clientId:string;
    clientUserId:string;
    projectOwnerId:string;
    escalations: [
        {
            comment: string,
            commentDate: string,
            userId: string,
            username: string,
        }
    ]


}


const initialvalues = {
    id: "",
    subject: "",
    level: "",
    description: "",
    username: "",
    status: "",
    projectId: "",
    escalations: [
        {
            comment: "",
            commentDate: "",
            userId: "",
            username: "",
        }
    ]
};

export default function Escalation() {
    const _authUser = useSelector((state: any) => state.AuthUserApp.AuthUser);
    const _permission = useSelector((state: any) => state.EscalationPermissionApp.EscalationPermission);
    const [data, setData] = useState<EscalationInfo>();
    const [id, setId] = useState("");
    const [escalateView, setEscalateView] = useState<EscalationInfo[]>([]);
    const [escalateViewById, setEscalateViewById] = useState<EscalationInfo>();
    const [searchValue, setSearchValue] = useState("");
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const [list, setList] = useState<any>([]);
    let statusValue = "All";
    const [statusDataHook, setStatusDataHook] = useState(statusValue);
    const [escalateData, setEscalateData] = useState(initialvalues);
    const [editId, setEditId] = useState('');
    const [currentEditValue, setEditValue] = useState('');
    const navigate = useNavigate();
    const [page, setPage] = React.useState(0);
    const [profileImage, setProfileImage] = useState<any>(null);
    const [profileImageById, setProfileImageById] = useState<any>(null);

    const senderid = _authUser.id;
    const receiverid = _authUser.id != "6421873aa272dd40b22caa93" ? "6421873aa272dd40b22caa93" : "63fdbe6e8319655d0831e838";
    const [connection, setConnection] = React.useState<null | HubConnection>(null);
    React.useEffect(() => {
        configSocket();

    }, []);
    const configSocket = async () => {
        var options = {
            skipNegotiation: true,
            transport: HttpTransportType.WebSockets,
            accessTokenFactory: () => {
                return secureLocalStorage.getItem('authToken')?.toString()??""
            },
        };
        const connect = new HubConnectionBuilder()
            .withUrl(`${apiUrl.get_HUB_URL()}/notificationhub`,options)
            .withAutomaticReconnect()
            .build();
            setConnection(connect);
    };
    React.useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    connection.on("ReceiveEscalation", (message) => {
                        console.log("message:", message);
                        //getListing();
                        if(message!=null) handleListItemClick(message.escalationId);
                    });
                })
                .catch((error) => console.log(error));
        }
    }, [connection]);
    useEffect(() => {
        if (_permission.module_ManageEscalation_Access !== true) {
            navigate("/dashboard")
        }
        getListing(searchValue);
    }, [escalateViewById])

    const getListing = async (searchValue: string = "") => {
        // var values = {
        //     search: searchValue,
        //     take: 1000,
        //     skip: 0,
        // };
        await escalationService.getListing(searchValue).then((response: any) => {
            if (response.data.isError) {
            } else {
                setEscalateView(response?.data);
                if (response?.data?.profileImagePath) {
                    setProfileImage(
                        apiUrl.getImageURL() +
                        "/" +
                        response?.data?.profileImagePath
                    );
                }

            }
        });
    }


    const [errorMessage, setErrorMessage] = useState(false);

    const updateCommentDetails = async (values: any) => {
        try {
            let otherData = escalateViewById?.escalations;
            otherData?.push({
                comment: values.comment,
                commentDate: new Date().toString(),
                userId: _authUser.id,
                username: ""
            });
            var arr = {
                id: escalateViewById?.id,
                escalations: otherData,
                isCompleteStatus: false
            }
            await escalationService.updateEscalation(arr).then(async(response: any) => {
                if (response.data.isError) {
                } else{
                    var msg={
                        senderId:_authUser.id,
                        receiverId:(escalateViewById?.projectOwnerId===_authUser.id)?(escalateViewById?.clientUserId):(escalateViewById?.projectOwnerId),
                        message:values.comment,
                        escalationId:escalateViewById?.id
                    }
                    if (connection) {
                        await connection.send("SendEscalation", msg).then((response) => {
                            console.log("response",response);
                        })
                        .catch((error) => console.log(error));
                    }
                    getListing();
                }
                   
            });
            getListing();
        } 
        catch (ex: any) {

            ex.data.Error.map((err: any, idx: any) => {
                toast.warning(err);
            });
        }
    };

    const handleListItemClick = async (
        id: any
    ) => {
        await escalationService.getEscalationById(id).then((response: any) => {
            if (response.data.isError) {
            } else {
                var element = document.getElementById("escalationLastMessage");
                 element?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                 var esacalationObj=response?.data;
                setEscalateViewById(esacalationObj);
                if (response?.data?.profileImagePath) {
                    setProfileImageById(
                        apiUrl.getImageURL() +
                        "/" +
                        response?.data?.profileImagePath
                    );
                }
            }

        });
    };
    const triggerSearch = async (newValue: string) => {
        getListing(newValue);
        setPage(0);
    };


    return (
        <Formik
            initialValues={{
                comment: ''
            }}
            // validationSchema={fieldValidationSchema}
            onSubmit={async (values, {
                setErrors,
                setStatus,
                setSubmitting,

            }) => {
                try {
                    // setErrorMessage("");
                    await updateCommentDetails(values);
                    values.comment = "";
                } catch (ex: any) {
                    if (ex.status == 400) {
                        console.error("ex:", ex);
                        ex.data.Error.map((error: any, idx: any) => {
                            setErrorMessage(error);
                            toast.error(error);
                        })
                    }
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
                values
            }) => (
                <form
                    noValidate
                    onSubmit={handleSubmit}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 1 }}>
                        <Link color="inherit" to="/">
                            Escalation
                        </Link>
                        {/* <Typography color="text.primary">My Rewards</Typography> */}
                    </Breadcrumbs>
                    <Paper elevation={0} sx={{ p: 3, pb: 0, height: "calc(100vh - 126px)" }}>
                        <Grid container spacing={2} sx={{ height: "100%" }}>
                            <Grid item xs={12} sm={4} lg={4} sx={{ borderRight: "1px solid #eee" }}>
                                <Box sx={{ pr: 2 }} className="esc-search">
                                    {/* <TextField
                                        placeholder='Search...'
                                        variant='outlined'
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    /> */}
                                    <SearchBar
                                        setSearchValue={setSearchValue}
                                        callBackFunction={triggerSearch}
                                    />

                                    <List sx={{ height: ' calc(100vh - 200px)', overflowY: 'auto',}}>
                                        {escalateView.map((data: any, index: any) => (
                                            <ListItemButton alignItems="center"
                                                selected={data.id === escalateViewById?.id}
                                                onClick={(event) => handleListItemClick(data.id)}>
                                                <ListItemAvatar sx={{ mt: 0, mr: 1.5 }}>
                                                    {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                                                        sx={{ width: '50px', height: '50px' }}
                                                    /> */}
                                                     <Avatar   alt="Remy Sharp"   src={profileImage}
                                                      sx={{ width: '50px', height: '50px' }}
                                                      />
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Stack direction='row' justifyContent='space-between'>
                                                        <Box>
                                                            <Typography sx={[styles.user.username]} >
                                                                {data.clientName}
                                                            </Typography>
                                                            <Typography sx={[styles.user.userProject]}>
                                                                {data.projectName}
                                                            </Typography>
                                                        </Box>
                                                        <Box sx={{ textAlign: 'right' }}>
                                                            {data.escalations != null && data.escalations.length > 0 &&
                                                                <Typography sx={[styles.user.timeStamp]} >
                                                                    {`${moment(data.escalations[data.escalations.length - 1].commentDate).format(
                                                                        "DD  MMM YYYY h:mm"
                                                                    )}`}
                                                                </Typography>}
                                                            {/* <Typography sx={[styles.user.timeStamp]} >
                                                {data.commentDate} */}
                                                            {/* </Typography> */}
                                                        </Box>
                                                    </Stack>
                                                </ListItemText>
                                            </ListItemButton>
                                        ))}
                                    </List>





                                </Box>
                            </Grid>


                            <Grid item xs={12} sm={8} lg={8}>
                                {(escalateViewById != null &&
                                    <Stack justifyContent='flex-start' sx={{ height: '100%', position: 'relative' }}>

                                        <Stack direction='row' justifyContent='space-between' alignItems='center'>


                                            <Stack direction='row' alignItems='center'>

                                                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg"
                                                    sx={{ mr: 1, width: 60, height: 60 }} /> */}
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src={profileImageById}
                                                    sx={{ mr: 1, width: 60, height: 60 }}
                                                />
                                                <ListItemText
                                                    primary={escalateViewById?.clientName}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography


                                                                variant="body2"
                                                                color="text.primary"
                                                            >

                                                            </Typography>
                                                            {escalateViewById?.projectName}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </Stack>

                                            <Box>
                                                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                                    <Stack direction='row' >
                                                        <Typography variant="subtitle1" component="h4">
                                                            {escalateViewById?.subject ? `Subject -: ${escalateViewById?.subject}` : ''}
                                                        </Typography>
                                                        <Box sx={{ ml: 2 }}>
                                                            {(escalateViewById?.status
                                                                == "1" &&
                                                                <Chip variant="review" label="Pending" />
                                                            )}
                                                            {(escalateViewById?.status
                                                                == "2" &&
                                                                <Chip variant="new" label="Open " />
                                                            )}
                                                            {(escalateViewById?.status
                                                                == "3" &&
                                                                <Chip variant="approved" label="Completed" />
                                                            )}

                                                        </Box>
                                                    </Stack>
                                                </Stack>

                                            </Box>

                                        </Stack>
                                        {(escalateViewById?.description != null &&
                                            <Paper sx={{ p: 1, mb: 2, mt: 1 }}>
                                                {escalateViewById?.description ? `Description -: ${escalateViewById?.description}` : ''}
                                            </Paper>
                                        )}


                                        <Box sx={{ height: 'calc(100vh - 350px)', overflowY: 'scroll', padding: '10px' }} >
                                            <Box>

                                                {escalateViewById?.escalations.filter(x => !!x.comment).map((a: any) => (
                                                    <ChatMsg
                                                        side={_authUser.id === a.userId ? 'right' : 'left'}
                                                        avatar={profileImageById}
                                                        messages={[a.comment]}
                                                        date={`${moment(a.commentDate).format(
                                                            "h:mm a"
                                                        )}`}
                                                    />
                                                ))}
                                                <div id="escalationLastMessage"></div>
                                            </Box>
                                        </Box>

                                        <Box sx={{ position: 'absolute', bottom: '0', left: '0', right: 0, width: '100%' }}>

                                            <TextField
                                                //placeholder=''
                                                label="Message"
                                                name="comment"
                                                variant='outlined'
                                                value={values.comment}
                                                onChange={handleChange}
                                                fullWidth
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <Tooltip title="Add Message">
                                                                <IconButton
                                                                    type="submit"
                                                                    onBlur={handleBlur}
                                                                    aria-label="toggle password visibility"
                                                                    onClick={() => updateCommentDetails(id)}
                                                                    //   onMouseDown={handleMouseDownPassword}y
                                                                    edge="end"
                                                                >
                                                                    <Icons.PaperPlane />
                                                                </IconButton></Tooltip>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Box>

                                    </Stack>)}
                            </Grid>

                        </Grid>
                    </Paper>
                </form>
            )}
        </Formik>
    );
}