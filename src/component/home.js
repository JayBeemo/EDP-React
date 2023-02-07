import * as React from 'react';
// import bg1 from './img/bg-img-1.jpg';

//MUI
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


export default function dashboard(){
//정의

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
            (CUSTID) 님의 DASHBOARD
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Item sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} secondary >분기별 기본 할당 포인트</Typography>
                <Typography paragraph variant='h7' textAlign={'center'} fontFamily='RecipekoreaFONT' >(ALLOC_POINT)</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} secondary >분기별 사용 포인트</Typography>
                <Typography paragraph variant='h7' textAlign={'center'} fontFamily='RecipekoreaFONT' >(USE_POINT)</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item sx={{
                background: 'linear-gradient(rgba(10,50,100,0.5),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} secondary >분기별 잔여 포인트</Typography>
                <Typography paragraph variant='h7' textAlign={'center'} fontFamily='RecipekoreaFONT' >(REMAIN_POINT)</Typography>
            </Item>
            </Grid>
            <Grid item xs={12}>
            <Item>
                월별 사용량 차트 그래프
                (꺽은선 그래프)
                NIVO 활용
            </Item>
            </Grid>
            <Grid item xs={12}>
            <Item>
                최근 구매 내역(5건 정도, 더보기 추가-클릭 시 사용 내역 Component 렌더)
            </Item>
            </Grid>
        </Grid>
        </Container>

    )
}