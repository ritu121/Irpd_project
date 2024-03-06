import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from "./Header.js"
import { red } from '@mui/material/colors';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import { FaAddressCard } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import logo from '../../assets/logo2.png'
import logo2 from '../../assets/logo3.jpg'

const drawerWidth = 240;

function RootLayout(props) {

  const { window } = props;
  const { children } = props;
  let location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <div className={'flex justify-center'}>
        <img src={logo} alt="logo" className="h-6 w-26 m-5 " />
      </div>

      <Divider />
      <div className=" space-y-4">
        <NavLink to={"/dashboard"} className="link">
          <div
            className={`relative px-4 py-3 mx-2 space-x-4 flex rounded-lg text-black-500 ${location.pathname === '/dashboard' ? 'bg-[#0a1c38] text-white' : ''}`}>
            <IoHome size={23} className="min-w-max" />
            <span>Home</span>
          </div>
        </NavLink>
        <NavLink to={"/newRequest"} className="link ">
          <div className={`px-4 py-3 space-x-4 mx-2 flex rounded-md text-black-500 group ${location.pathname === '/newRequest' ? 'bg-[#0a1c38] text-white' : ''} `}>
            <FaAddressCard size={23} className="min-w-max" />
            <span>New Job Request</span>
          </div>
        </NavLink>
        <NavLink to={"/candidates"} className="link ">
          <div className={`px-4 py-3 space-x-4  mx-2 flex rounded-md text-black-500 group ${location.pathname === '/candidates' ? 'bg-[#0a1c38] text-white' : ''} `}>
            <BsPerson size={23} className="min-w-max" />
            <span>Candidates</span>
          </div>
        </NavLink>
        <NavLink to={"/register_employee"} className="link ">
          <div className={`px-4 py-3 space-x-4  mx-2 flex rounded-md text-black-500 group ${location.pathname === '/register_employee' ? 'bg-[#0a1c38] text-white' : ''} `}>
            <BsPerson size={23} className="min-w-max" />
            <span>Register Employee</span>
          </div>
        </NavLink>
       
      </div>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#0a1c38',
          height: "6rem",
          borderBottomRightRadius: '80px',
          zIndex: 0,
          // justifyContent:'space-between',
          // display: 'flex',
          // flexDirection:'row',
          // alignItems:'center',
          // padding:'2rem'
        }}
      >
       <div className={'flex justify-between items-center'}>
       <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{  display: { sm: 'none' },padding:3 }}
        >
          <MenuIcon />
        </IconButton>
        <div class="ml-5">
        <span><img src={logo2} alt="logo" className="h-12 w-12 " /></span><span className='text-white cursor-pointer text-xl font-medium'>IRPD</span>
        </div>
       <Header/>
       </div>


      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar sx={{marginTop:'2rem'}}/>
        <main>{children}</main>

      </Box>
    </Box>
  );
}

RootLayout.propTypes = {
  window: PropTypes.func,
  children: PropTypes.array,
};

export default RootLayout;
