/* eslint-disabled */ 

import * as React from 'react';
import './login';
import pointReview from './pointReview';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

//MUI

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

//사이드메뉴 사이즈
const drawerWidth = 200;

const MainDrawer = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
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
    }),
  );
  
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
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

//Session Check
function IsLogin(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.sessionStorage.getItem('name') !== '1' ){
            Swal.fire({
                icon: "warning",
                title: "접속 에러",
                html: `<p>세션 체크 에러</p>`,
                confirmButtonText: "확인",
                confirmButtonColor: "#148CFF"
              })
            window.sessionStorage.removeItem('name')
            navigate('/login')
        }
        // else{
        //     alert('로그인 완료');
        // }
    })
}
//react
export default function Main(){
//선언
    const navigate = useNavigate();

    const sideButton = ['Home','Point Review','내역'];
//Session Check 첫 렌더링때 실행
    IsLogin();
//핸들러
    const LogoutHandleOnClick = () =>{
        navigate('/')
        window.sessionStorage.removeItem('name')
    }
//Drawer 설정
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
        
//render
    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'flex' }) }}
                
            >
                <MenuIcon />
            </IconButton>

            <Typography variant="h6" noWrap component="div" flexGrow={1}>
                EDP ( 비케이브 이미지 넣기 ; main 링크로 )
            </Typography>

            <IconButton
                color="inherit"
                edge="end"
                
                onClick={LogoutHandleOnClick}
            >
                <Typography>
                    LOGOUT
                </Typography>
            </IconButton>
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
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                { sideButton.map((text, index) => (
                    <ListItem key={text} disablePadding
                        onClick={(index) => {
                            
                        }}
                    >
                    <ListItemButton>
                        <ListItemIcon>
                            { index % 3 === 0 
                            ? <HomeIcon/>                               
                            :( index % 3 === 1
                                ? <ArrowRightIcon />
                                :( index % 3 === 2
                                    ? <ArrowRightIcon />
                                    : null ) )
                                }
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </Drawer>
        <MainDrawer open={open}>
            <DrawerHeader/>
            <Box
                sx={{
                    marginTop: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {pointReview()}
            </Box>

        </MainDrawer>
        </Box>
    )
}


    