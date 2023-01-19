// eslint-disable-next-line

import * as React from 'react';
import i1 from './img/i1.png';
import './login.css';
import './main';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { lightBlue } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

  // 선언

  // Footer 카피라이트
function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center"{...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://www.barrels.co.kr/">
        B.Cave & Co.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  // 테마 설정
const theme = createTheme({
  palette:{
    primary:{
      main: lightBlue[300],
    }
  }
});

  // React
export default function SignIn() {
  //navigation 정의
  const navigate = useNavigate();

  //submit 이벤트 처리
  const handleSubmit = (event) => {
    event.preventDefault();
  // 계정정보 Form 생성
    const data = new FormData(event.currentTarget);

  // Session Storage 저장
    window.sessionStorage.setItem('name',(data.get('name')))

    console.log({
      name: data.get('name'),
      password: data.get('password'),
      setName : sessionStorage.getItem('name')
    });

  // 계정 정보 입력 체크
    if( data.get('name') === '' || data.get('password') === ''){
      alert('계정정보 입력 오류');
      navigate('/login');
    }else{
      navigate('/main');
    }
  }

  // RENDER
  return (
    <ThemeProvider theme={theme} >
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
                label="성명"
                name="name"
                autoComplete="name"
                autoFocus
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
                name="password"
                label="비밀번호"
                type="password"
                id="password"
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
                Sign in                
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