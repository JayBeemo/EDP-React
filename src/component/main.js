/* eslint-disabled */ 
import * as React from 'react';
import './login';
import './main.css'
import PointReview from './pointReview';
import Home from './home'
import History from './history'
// import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
// import { useState, useEffect } from 'react';

import i1 from './img/i1.png';
import logout_icon from './icon/icon_logout.png';

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
// import { makeStyles } from '@mui//styles';
// import axios from 'axios';

//메뉴바 사이즈
const drawerWidth = 230;

//메뉴바 스타일러
const MainDrawer = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(0),
      height: 720,
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
    //AppBar 디자인 설정
    background: 'linear-gradient(45deg, #003366 50%, #000000 80%)',
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

//Div 테마
  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

//react
export default function Main(){

    const location = useLocation();

    const c_id = location.state.c_id;
    const c_nm = location.state.c_nm;
    const c_pw = location.state.c_pw;
    const c_email = location.state.c_email;
    const c_alloc_point = location.state.c_alloc_point;
    const c_use_point = location.state.c_use_point;
    const c_remain_point = location.state.c_remain_point;

//선언
    // 날짜 선언
    const date = new Date();
    //네비게이트 선언
    const navigate = useNavigate();

    //사이드바 선언
    const [content, setContent] = useState('first');
    const sideButton = [
        {
            id: 1,
            text: '대시보드',
            name: 'first'
        },
        // {
        //     id: 2,
        //     text: '포인트 설명',
        //     name: 'second'
        // },
        {
            id: 3,
            text: '포인트 사용내역',
            name: 'third'
        }
    ];

//사이드 메뉴 이동 핸들러
    const sideHandleClickButton = e => {
        setContent(e);
    }

    const selectComponent = {
        first: <Home 
        c_id={c_id} 
        c_nm={c_nm} 
        c_pw={c_pw}
        c_email={c_email} 
        c_alloc_point={c_alloc_point} 
        c_use_point={c_use_point} 
        c_remain_point={c_remain_point}
        />,
        second: <PointReview/>,
        third: <History
        c_id={c_id}
        c_nm={c_nm}
        c_email={c_email}
        />
    }


//로그아웃 핸들러
    const LogoutHandleOnClick = () =>{
        navigate('/')
        window.sessionStorage.removeItem('name')
        console.log(content)
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
                    alignItems: 'center',
                }}
            >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={(handleDrawerOpen)}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'flex' }) }}
            >
                <MenuIcon />
            </IconButton>
            {/* 상단 메뉴바 좌측 UI */}
            <Typography variant="h5" noWrap component="div" flexGrow={1} fontFamily='NotoSansKR-Bold'>
                B.CAVE EMPLOYEE DISCOUNT POINT 
            </Typography>
            {/* 상단 메뉴바 우측 UI */}
            <Typography fontFamily='NotoSansKR-Bold' 
            variant="h6" 
            textAlign={"center"}
            paddingRight={"50px"}
            >
                {
                    "DATE : " 
                    + date.getFullYear().toString()
                    + " 년  " 
                    + (date.getMonth()+1).toString()
                    + " 월  " 
                    + date.getDate().toString()
                    + " 일  " 
                }
            </Typography>
            <IconButton
                color="inherit"
                edge="end"
                onClick={LogoutHandleOnClick}
            >
                <Typography fontFamily='NotoSansKR-Bold'>
                    <img src={logout_icon} alt="로그아웃" width="35px" height="35px" />
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
                <img src={i1} alt='' className='appBarImage'>
                </img>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            {/* 사이드 메뉴 UI */}
            <List>
                { sideButton.map(data => {
                    return(
                        <ListItem disablePadding>
                        <ListItemButton
                        // onClick={sideHandleClickButton}
                        onClick={()=>sideHandleClickButton(data.name)}
                        name={data.name}
                        key={data.id}
                        value={data.name}
                        >
                            <ListItemIcon key={data.id} >
                                { data.id % 3 === 1 
                                ? <HomeIcon />                               
                                :( data.id % 3 === 2
                                    ? <ArrowRightIcon />
                                    :( data.id % 3 === 3
                                        ? <ArrowRightIcon />
                                        : <ArrowRightIcon /> ) )
                                    }
                            </ListItemIcon>
                            <ListItemText key={data.text} secondary={data.text} />
                        </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>
            <Divider />
        </Drawer>
        <MainDrawer open={open}>
        <DrawerHeader/>
        {/* 메인 컴포넌트 렌더 */}
        <Box
        sx={{
            flexGrow: 1,
            // 컨포넌트 컨텐츠 센터 정렬
            justifyContent: "center",
            display: "content",
            width: '100%',
            height: '100%',
          }}
        >
            {content && <Box>{selectComponent[content]}
        </Box>}
        </Box>
        </MainDrawer>
        </Box>
    )
}


    