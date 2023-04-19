
import * as React from 'react';
import './home.css';

import axios from 'axios';

//MUI
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useEffect } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Dashboard(props){
//정의
    let {
        c_id,
        c_nm,
        c_email,
        c_alloc_point,
        c_use_point,
        c_remain_point } = props;

    c_alloc_point = c_alloc_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    c_use_point = c_use_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    c_remain_point = c_remain_point.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    useEffect(()=>{
        axios.post('/api/apitool',{
        type: 'list',
        custnm: c_nm,
        custid: c_id
        }).then(function(response) {
        //response 한 데이터 셋업
        let json = JSON.parse(JSON.stringify(response.data));
        let range = response.data.length;
        let listArr = [];
        let newArr = [];
        
        //구매내역 LIST 파싱 및 배열 할당
        for(let i=0;i<range;i++){
            newArr.push(JSON.stringify(json[i]));
        }
        for(let i=0;i<range;i++){
            listArr.push(JSON.parse(newArr[i]));
        }
        console.log(listArr[0]);
        

        }).catch(function(err){
        console.log(err);
        })
        
    // eslint-disable-next-line
    },[])

    // 구매내역 LIST API CALL
    // axios.post('/api/apitool',{
    //     type: 'list',
    //     custnm: c_nm,
    //     custid: c_id
    //     }).then(function(response) {
    //     //response 한 데이터 셋업
    //     let json = JSON.parse(JSON.stringify(response.data));
    //     let range = response.data.length;
    //     let listArr = [];
    //     let newArr = [];
        
    //     //구매내역 LIST 파싱 및 배열 할당
    //     for(let i=0;i<range;i++){
    //         newArr.push(JSON.stringify(json[i]));
    //     }
    //     for(let i=0;i<range;i++){
    //         listArr.push(JSON.parse(newArr[i]));
    //     }
    //     console.log(listArr[0]);
        

    //     }).catch(function(err){
    //     console.log(err);
    //     })
//Render
    return(
        <Container fixed maxWidth='xl' 
             sx={{
            //     width: '100%',
            //     backgroundSize: 'cover',
            //     backgroundImage: `url(${bg1})`,
             }}
        >
        <div className='dash'>
            <div className='idcard_left'>
                <Typography paragraph variant='h4'
                fontFamily='Cafe24Simplehae'
                sx={{
                    color: 'white',
                    maxWidth: '600px'
                }}>
                    직원 할인 포인트 내역
                </Typography>
            </div>
            <div className='idcard_right'>
            <Card sx={{ 
                maxWidth: '200px',
                height: '120px',
                background: 'radial-gradient( circle 400px at 18.3% 80%,  rgba(139,186,244,1) 0.4%, rgba(15,51,92,1) 56.6% )'
                }}
                >
                <CardContent>
                    <Typography textAlign={'right'}
                        sx={{ 
                        fontSize: 14,
                        }} color="white" gutterBottom>
                        직원명
                    </Typography>
                    <Typography textAlign={'right'} color="white" variant="h5" component="div">
                        {c_nm}
                    </Typography>
                    <Typography textAlign={'right'} color="white" sx={{ mb: 1.5 }}>
                        {c_email}
                    </Typography>
                </CardContent>
            </Card>
            </div>
        </div>
        
       
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.8),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'}sx={{
                    color: 'white',
                    textShadow: '1px 1px 3px #5D5D5D'
                }}>
                    분기 적립 포인트
                </Typography>
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
                background: 'linear-gradient(rgba(10,50,100,0.8),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'}sx={{
                    color: 'white',
                    textShadow: '1px 1px 3px #5D5D5D'
                }}>
                    사용 포인트
                </Typography>
                <Typography 
                    sx={{
                        color: 'BLACK',
                        textShadow: '1px 1px 1px WHITE'
                    }}
                paragraph variant='h6' textAlign={'center'} fontFamily='RecipekoreaFONT' >{c_use_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.8),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'}sx={{
                    color: 'white',
                    textShadow: '1px 1px 3px #5D5D5D'
                }}>
                    잔여 포인트
                </Typography>
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