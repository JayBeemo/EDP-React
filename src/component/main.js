/* eslint-disabled */ 

import * as React from 'react';
//import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './login'

//Session Check
function IsLogin(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(window.sessionStorage.getItem('name') !== '1' ){
            alert('세션 입력 오류');
            window.sessionStorage.removeItem('name')
            navigate('/login')
        }else{
            alert('로그인 완료');
        }
    })
}

//react
export default function Main(){
//선언
    const navigate = useNavigate();
//Session Check 첫 렌더링때 실행
    IsLogin();
//핸들러
    const handleOnClick = () =>{
        navigate('/')
        window.sessionStorage.removeItem('name')
    }
        

//render
    return(
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        </Typography>
                        <Button
                            color="inherit"
                            onClick={handleOnClick}
                        >
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    )
}


    