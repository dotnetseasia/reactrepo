import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Sidebar from './SideNav';
import { width } from '@mui/system';
import theme from "../theme/theme";
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'block',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(2),
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));

const Space = styled('div')(({ theme }) => ({
  display: 'block',
  height: theme.spacing(10)
  // necessary for content to be below app bar
  // ...theme.mixins.toolbar,
}));


const InnerContent = () => {
  // const [open, setOpen] = React.useState((localStorage.getItem('userSidebar') === 'expanded') || false);
  const [open, setOpen] = React.useState(false);


  return <div className='inner-content'>
    <Box sx={{ display: 'flex' }}>

      <Sidebar open={open} setOpen={setOpen} />

      <Box component="main" sx={{
        flexGrow: 1, p: 2, pt: 0, width: open ? 'calc(100vw - 318px)' : 'calc(100vw - 120px)', [theme.breakpoints.down('sm')]: {
          width: '99.9%',
          px:0
        }
      }} >
        <Space />
        <Outlet />
      </Box>
    </Box>

  </div>;
}

export default InnerContent;