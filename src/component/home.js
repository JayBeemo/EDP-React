import * as React from 'react';

//MUI
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
// import Box from '@mui/material/Box';
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
        <Container fixed maxWidth='xl'>
        <Typography paragraph variant='h3' textAlign={'center'}>
            DASHBOARD
        </Typography>
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <Item>
                분기별 기본 할당 포인트
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item>
                분기별 사용 포인트
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item>
                분기별 잔여 포인트
            </Item>
            </Grid>
            <Grid item xs={12}>
            <Item>
                월별 사용량 차트 그래프
                (꺽은선 그래프)
            </Item>
            </Grid>
        </Grid>
        </Container>

    )
}