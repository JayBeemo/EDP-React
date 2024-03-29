// eslint-disable-next-line

import * as React from 'react';
import i1 from './img/i1.png';
import './login.css';
import './main';
import { useState } from 'react';
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
import Loading from './loading';
import DOMPurify from 'dompurify';

import axios from 'axios';

  // 선언

  // Footer 카피라이트
function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center"{...props} whiteSpace="pre-wrap">
      {'Copyright © '}
      <Link color="inherit" href="http://www.barrels.co.kr/" target='__blank'>
        B.Cave & Co.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
      {'\n'}
      {'\n'}
      시스템 담당자 : 운영사업본부 IT팀 사원 최중백{'\n'}
      포인트 관련 문의 : 운영사업본부 인사팀
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

  const [loading, setLoading] = useState(false);

  //submit 이벤트 처리
const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const sanitizedName = DOMPurify.sanitize(data.get('name'));
  const sanitizedPwd = DOMPurify.sanitize(data.get('pwd'));
  window.sessionStorage.removeItem('name');
  window.sessionStorage.removeItem('pwd');
  window.sessionStorage.setItem('name', sanitizedName);
  window.sessionStorage.setItem('pwd', sanitizedPwd);

  // console.log({
  //   name: sanitizedName,
  //   password: sanitizedPwd,
  //   setName: sessionStorage.getItem('name'),
  // });

  const API_URL = process.env.REACT_APP_DB_HOST;

  // Loading 로드
  setLoading(true);
  // API 호출
  axios.post(
      API_URL + '/api/apitool',
      {
        type: 'auth',
        custnm: sanitizedName,
        custpw: sanitizedPwd,
      },
      {
        headers: {
          Origin: 'http://192.168.0.10:3000',
        },
      }
    )
    .then(function (response) {
      // response 한 데이터 셋업
      let json = JSON.parse(JSON.stringify(response.data));
      setLoading(false);
      // 로그인 검증
      if (sanitizedName === '' || sanitizedPwd === '') {
        Swal.fire({
          icon: 'warning',
          title: '접속 에러',
          html: `<p>계정 정보 입력 에러</p>`,
          confirmButtonText: '확인',
          confirmButtonColor: '#148CFF',
        });
        navigate('/login');
      } else if (
        sanitizedName !== json[0].CUSTNM ||
        sanitizedPwd !== json[0].CUSTPW
      ) {
        Swal.fire({
          icon: 'warning',
          title: '접속 에러',
          html: `<p>없는 계정입니다. 관리자에게 문의해주세요.</p>`,
          confirmButtonText: '확인',
          confirmButtonColor: '#148CFF',
        });
        navigate('/login');
      } else {
        navigate('/main', {
          state: {
            c_id: json[0].CUSTID,
            c_nm: json[0].CUSTNM,
            c_pw: json[0].CUSTPW,
            c_email: json[0].EMAIL,
            c_alloc_point: json[0].ALLOC_POINT,
            c_use_point: json[0].USE_POINT,
            c_remain_point: json[0].REMAIN_POINT,
          },
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      Swal.fire({
        icon: 'warning',
        title: '접속 에러',
        html: `<p>없는 계정입니다. 관리자에게 문의해주세요.</p>`,
        confirmButtonText: '확인',
        confirmButtonColor: '#148CFF',
      });
    });
};
  

  // RENDER
  return (
    <ThemeProvider theme={theme}>
      <div className='main'>
      {/* 로그인 시 loading 스피너 작동 */}
      {loading ?<Loading/> : null}
        {/* 메인페이지 동영상 */}
        <video muted autoPlay loop playsInline>
          <source src='/vid/bg-video.webm' type="video/webm" />
        </video>
        
        <div className='content'>
          <Container component="main" maxWidth="xs" className="img-animate-1">
          <CssBaseline/>
          {/* 메인 배너 이미지 등록 */}
          <div className="banner" align="center">
              <img src={i1} alt="banner"/>
              <Typography
              paragraph variant='h4'
              fontFamily='NotoSansKR-Bold' textAlign={"center"}
              sx={{
                  color: 'black',
                  maxWidth: '600px'
              }}
              >
                B.CAVE EMPLOYEE DISCOUNT POINT
              </Typography>
              
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
                label="비밀번호"
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
      <div>
      </div>
      
    </ThemeProvider>
  );
}