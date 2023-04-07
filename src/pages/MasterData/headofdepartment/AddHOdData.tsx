import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { MenuItem, Typography } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { hodServices } from '../../../service/master-service/hod-service';
import { Formik, getIn } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import React from 'react';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    
}));


interface HOD {
    id: string;
    name: string;
}

interface Department {
    id: string;
    name: string;
}





function AddHodData() {

//     const navigate = useNavigate();
    
//     const addHodDetails = async (values : any) => {
//         await hodServices.createHod(values)
//             .then((response: any) => {
//                 if (response.data.isError) {

//                 }
//                 else
//                     navigate('/editmanage-project')
//             });
//     }

   
//     var departmentData = { id: "", name: "All Departments" };
//     const [departmentDataHook, setDepartmentDataHook] = useState(departmentData);
//     const [departments, setDepartments] = useState<Department[]>([])
//     const [departmentIndex, setDepartmentIndex] = React.useState(1);
//     var hodData = { id: "", name: "All Roles" };
//     const [hodDataHook, sethodDataHook] = useState(hodData);
//     // const [roles, setRoles] = useState<Roles[]>([])
//     // const [name, setName] =useState(userDataHook.employeeInfo.userName??"");
  

//     const [employeeDetail, setEmployeeDetail] = useState({
//         emailId: "",
//         name:"",
//         department: departmentDataHook.id,
//     })

//    const getDepartments = async () => {
//         let prm = { module: 1 ,status:"active"};
//         await hodServices.getDropdownData(prm)
//             .then((response: any) => {
//                 if (response.data.isError) {
//                     setDepartments([hodData]);
//                 }
//                 else {
//                     setDepartments(response.data);
//                 }
//             });
//     }

//     const handleDepartmentItemClick = async (
//         event: React.MouseEvent<HTMLElement>,
//         index: number,
//     ) => {
//         setDepartmentDataHook(departments[index]);
//     };


//     // // React.useEffect
//     // const handleInputChange = (e: any) => {
//     //     const { name, value } = e.target;
//     //     console.log("tes", name, value)
//     //     setEmployeeDetail((prevState) => ({
//     //         ...prevState,
//     //         [name]: value
//     //     }))

//     // }

//     useEffect(() => {
//         getDepartments();
//     }, [])


//     return (
//         <Formik
//             initialValues={{
//                 name: '',
//                 department:'',
//                 emailid:'',
//                 // createdon:'',
//                 // createdby:''
//             }}
//             validationSchema={Yup.object().shape({
//                 name: Yup.string().max(255).required('Name is required'),
//                 department: Yup.string().max(255).required('Department is required'),
//                 emailid: Yup.string().max(255).required('EmailId is required'),
//                 // createdon: Yup.string().max(255).required('Created On is required'),
//                 // createdby: Yup.string().max(255).required('Created By required')
//             })}
//             onSubmit={async (values, {
             
//             }) => {
//                 try {
//                     await addHodDetails(values);
//                 } catch (err) {
//                     console.error(err);
//                 }
//             }}
//         >
//             {({
//                 errors,
//                 handleBlur,
//                 handleChange,
//                 handleSubmit,
//                 isSubmitting,
//                 touched,
//                 // values
//             }) => (
//                 <form
//                     noValidate
//                     onSubmit={handleSubmit}>
//                     <Grid container spacing={2} direction="row"
//                         justifyContent="center"
//                         alignItems="center">
//                         <Grid item xs={6} md={6}>
//                             <Item elevation={0}>
//                                 <Typography variant="h6" align="left" noWrap component="div" sx={{ fontWeight: 500 }}>
//                                     Add HOD Status
//                                 </Typography>
//                                 <Box sx={{ mt: 3 }}>

//                                     <TextField
//                                         error={Boolean(touched.name && errors.name)}
//                                         fullWidth
//                                         helperText={touched.name && errors.name}
//                                         label="Name"
//                                         margin="normal"
//                                         name="name"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         type="text"
//                                         value={values.name}
//                                         variant="standard"
//                                     />

//                                     <TextField id="outlined-basic"
//                                     sx={{ mt: 3 }}
//                                         select
//                                         error={Boolean(
//                                             getIn(touched, 'departmentId') &&
//                                             getIn(errors, 'departmentId')
//                                         )}
//                                         helperText={
//                                             getIn(touched, 'departmentId') &&
//                                             getIn(errors, 'departmentId')
//                                         }
//                                         required
//                                         name="departmentId"
//                                         label="Department"
//                                         variant="outlined"
//                                         fullWidth
                                        
//                                     >
//                                         {departments.map((option, index) => (
//                                             <MenuItem key={option.name}
//                                                 value={option.name}
//                                                 onClick={(event) => {
//                                                     (values.department = departments[index].id);
                                                   
//                                                 }}
//                                             >
//                                                 {option.name}
//                                             </MenuItem>
//                                         ))}
//                                     </TextField> 

//                                     <TextField
//                                         error={Boolean(touched.emailid && errors.emailid)}
//                                         fullWidth
//                                         helperText={touched.emailid && errors.emailid}
//                                         label="Email Id"
//                                         margin="normal"
//                                         name="emailid"
//                                         onBlur={handleBlur}
//                                         onChange={handleChange}
//                                         type="text"
//                                         value={values.emailid}
//                                         variant="standard"
//                                     />
                                     
//                                     <Stack spacing={2} direction="row"
//                                         justifyContent="flex-end"
//                                         alignItems="center" >
//                                         <Button type="submit" variant="contained" color='primary' sx={{ mt: 3 }}>Submit</Button>
//                                     </Stack>

//                                 </Box>
//                             </Item>
//                         </Grid>
//                     </Grid>
//                 </form>
//             )}
//         </Formik>
//     );
}

export default AddHodData;