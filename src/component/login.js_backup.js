// eslint-disable-next-line

import * as React from 'react';
import i1 from './img/i1.png';
import './login.css';
import './main';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { lightBlue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import axios from 'axios';

  // 선언


  // Footer 카피라이트
function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center"{...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.barrels.co.kr/" target='__blank'>
        B.Cave & Co.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  // 테마 설정 - lightBlue를 primary 컬러로 지정
const theme = createTheme({
  palette:{
    primary:{
      main: lightBlue[300],
    }
  }
});

  // React
export default function SignIn() {
  

  //로그인 성공 시 main으로 이동하기 위한 navigation 정의
  const navigate = useNavigate();

  //submit 이벤트 처리
  const handleSubmit = (event) => {
    event.preventDefault();

    // 계정정보 Form 생성
    const data = new FormData(event.currentTarget);

    // Session Storage 저장
    window.sessionStorage.removeItem('name')
    window.sessionStorage.removeItem('pwd')
    window.sessionStorage.setItem('name',(data.get('name')))
    window.sessionStorage.setItem('pwd',(data.get('pwd')))
  
    // 콘솔을 통한 로그인 입력 정보 로그 확인 - 추후 문제 없으면 주석처리 예정
    console.log({
      name: data.get('name'),
      password: data.get('pwd'),
      setName : sessionStorage.getItem('name')
    });

    // 계정 정보 입력 체크 - 추후 회원 정보와 비교 조건 추가
    if( data.get('name') === '' || data.get('pwd') === ''){

    // alert ( sweetalert2 활용 )
      Swal.fire({
        icon: "warning",
        title: "접속 에러",
        html: `<p>계정 정보 입력 에러</p>`,
        confirmButtonText: "확인",
        confirmButtonColor: "#148CFF"
      })
      navigate('/login');
    }else{
      navigate('/main');
    }

  }

  // RENDER
  return (
    <ThemeProvider theme={theme}>
      <div className='main'>
        {/* 메인페이지 동영상 */}
        <video muted autoPlay loop playsInline>
          <source src='/vid/bg-video.mp4' type="video/mp4" />
        </video>
        <div className='content'>
          <Container component="main" maxWidth="xs" className="img-animate-1">
          <CssBaseline/>
          {/* 메인 배너 이미지 등록 */}
          <div className="banner" align="center">
              <img src={i1} alt="banner"/>
          </div>
          <Box
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                sx={{
                  ' .MuiOutlinedInput-root': {
                    color: 'white',
                    },
                  }}  
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                margin="normal"
                required
                fullWidth
                id={FormData.name}
                label="성명(CUSTNM)"
                name="name"
                autoComplete="name"
                // autoFocus
              />
              <TextField
                sx={{
                  ' .MuiOutlinedInput-root': {
                    color: 'white',
                    },
                  }}  
                InputLabelProps={{
                  style: { color: '#fff' },
                }}
                margin="normal"
                required
                fullWidth
                name="pwd"
                label="비밀번호(CUSTPW)"
                type="password"
                id="pwd"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                id="saveid"
                name="saveid" 
                control={<Checkbox
                  />}
                label="ID 기억하기"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color="primary"
              >
                <Typography component="h1" variant="h6" color='white'>
                 Sign in
                </Typography>               
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>     
        </div>
      </div>
      
    </ThemeProvider>
  );
}