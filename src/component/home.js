import * as React from 'react';
// import bg1 from './img/bg-img-1.jpg';

//MUI
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import shadows from '@mui/material/styles/shadows';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function dashboard(props){
//정의
    let {
        c_id,
        c_nm,
        c_pw,
        c_email,
        c_alloc_point,
        c_use_point,
        c_remain_point } = props;

        c_alloc_point = c_alloc_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        c_use_point = c_use_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        c_remain_point = c_remain_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//Render
    return(
        <Container fixed maxWidth='xl' 
             sx={{
            //     width: '100%',
            //     backgroundSize: 'cover',
            //     backgroundImage: `url(${bg1})`,
             }}
        >
        <Typography paragraph variant='h4' textAlign={'center'} fontFamily='Cafe24Simplehae'>
            {c_nm} 님의 DASHBOARD
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} >분기 적립 포인트</Typography>
                <Typography 
                sx={{
                    color: 'black',
                    textShadow: '1px 1px 1px WHITE'
                }}
                paragraph variant='h6' textAlign={'center'} fontFamily='RecipekoreaFONT' >{c_alloc_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} >사용 포인트</Typography>
                <Typography 
                    sx={{
                        color: 'RED',
                        textShadow: '1px 1px 1px WHITE'
                    }}
                paragraph variant='h6' textAlign={'center'} fontFamily='RecipekoreaFONT' >{c_use_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} >잔여 포인트</Typography>
                <Typography 
                    sx={{
                        color: '#50AF49',
                        textShadow: '1px 1px 1px WHITE'
                    }}
                paragraph variant='h6' textAlign={'center'} fontFamily='RecipekoreaFONT' >{c_remain_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={12}>
            <Item elevation={3}>
                월별 사용량 차트 그래프
                (꺽은선 그래프)
                NIVO 활용
            </Item>
            </Grid>
            <Grid item xs={12}>
            <Item elevation={3}>
                최근 구매 내역(5건 정도, 더보기 추가-클릭 시 사용 내역 Component 렌더)
            </Item>
            </Grid>
        </Grid>
        </Container>

    )
}