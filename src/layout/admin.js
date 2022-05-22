import { useState, useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';

import { Link } from "react-router-dom";

import Box from '@mui/material/Box';

import MuiAppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Tooltip from '@mui/material/Tooltip';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import MonitorIcon from '@mui/icons-material/Monitor';
import PersonIcon from '@mui/icons-material/Person';
// import AssignmentIcon from '@mui/icons-material/Assignment';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import LoginIcon from '@mui/icons-material/Login';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import Footer from 'src/components/Footer';

import ContextColor from 'src/context/color';

const drawerWidth = 240;
const drawerNavigation = [
  { text: 'Dashboard', icon: (<DashboardIcon />), link: "/admin" },
  { text: 'Projects', icon: (<GridViewRoundedIcon />), link: "/admin/projects" },
  // { text: 'Task', icon: (<AssignmentIcon />), link: "/admin/task" },
  // { text: 'Attendance', icon: (<AssignmentIcon />), link: "/admin/task" },
  { text: 'Team', icon: (<PersonIcon />), link: "/admin/team" },
  { text: 'Sign In', icon: (<LoginIcon />), link: "/admin/signin" },
  { text: 'Sign Up', icon: (<AssignmentIndIcon />), link: "/admin/signup" },
]
// const menuNavigation = [
//   { text: 'Dashboard', icon: (<DashboardIcon />) },
// ]

const Section = styled('section', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  display: "flex",
  flexFlow: "column",
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  // padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'center',
}));

function LayoutAdmin(props) {
  const appName = "GIS Client";
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(true);
  const handleDrawer = () => {
    setOpen(!open)
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const colorMode = useContext(ContextColor);

  return (
    <Box display={'grid'} sx={{ maxWidth: '100vw', minHeight: '100vh' }}>
      <Box display={'flex'}>
        <AppBar open={open} variant="outlined" elevation={0}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleDrawer}
            >
              {open ? (<MenuOpenIcon />) : (<MenuIcon />)}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {props.pageTitle}
            </Typography>
            <div>
              <Tooltip title={`Theme Mode ${theme.palette.mode}`}>
                <IconButton
                  size="large"
                  aria-label="theme mode"
                  onClick={colorMode.toggleMode}
                  color="inherit"
                >
                  {theme.palette.mode === 'dark' ? (<LightModeRoundedIcon />) : (<DarkModeRoundedIcon />)}
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem>
                  <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Add another account
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader >
            <Toolbar>
              <Avatar alt="GIS" src="/proto-512.v2.svg" variant='rounded' />
              <Typography variant="h6" component="div" href="/" marginX="1rem">
                {appName}
              </Typography>
            </Toolbar>
          </DrawerHeader>
          <Divider />
          <List>
            {drawerNavigation.map(({ text, icon, link }, index) => (
              <ListItem key={text} disablePadding>
                <Link style={{ all: "inherit" }} to={link}>
                  <ListItemButton selected={props.pageTitle === text}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Section open={open}>
          <DrawerHeader></DrawerHeader>
          {/* <LinearProgress color='secondary' variant='indeterminate' sx={{ position: 'sticky', top: '0', zIndex: 40 }} /> */}
          <Box component="main" flexGrow="1">{props.children}</Box>
          <Footer></Footer>
        </Section>
      </Box>
    </Box>
  )
}

export default LayoutAdmin
