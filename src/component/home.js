
import * as React from 'react';
import './home.css';
import { useEffect } from 'react';
import axios from 'axios';

//이력 테이블에 필요한 라이브러리 import
import { useTable } from "react-table";
import { useMemo } from 'react';

//MUI
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export default function Dashboard(props){
//정의

    let listArr = [];
    
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
        let newArr = [];

        //구매내역 LIST 파싱 및 배열 할당
        for(let i=0;i<range;i++){
            newArr.push(JSON.stringify(json[i]));
        }
        for(let i=0;i<range;i++){
            listArr.push(JSON.parse(newArr[i]));
        }
        }).catch(function(err){
        console.log(err);
        })

    // eslint-disable-next-line
    },[listArr])
    
    console.log(listArr);
    console.log(listArr[0]);
    const columns = useMemo(() => [
        {
            accessor: "CUSTNM",
            Header: "구매자",
        },
        {
            accessor: "SALEDT",
            Header: "구매 일자",
        },
        {
            accessor: "SHOPCD",
            Header: "구매 매장(코드)",
        },
        {
            accessor: "SHOPNM",
            Header: "구매 매장",
        },
        {
            accessor: "STYLECD",
            Header: "구매 상품",
        },
        {
            accessor: "COLORCD",
            Header: "컬러",
        },
        {
            accessor: "SIZECD",
            Header: "사이즈",
        },
        {
            accessor: "BARCODE",
            Header: "바코드",
        },
        {
            accessor: "SALECONSAMT",
            Header: "지불금액",
        },
        {
            accessor: "USE_POINT",
            Header: "사용포인트",
        },
    ],[]);
    // eslint-disable-next-line
    const data = useMemo(() => {
        if (listArr.length > 0) { 
          return [{
            CUSTNM: listArr[0].CUSTNM,
            SALEDT: listArr[0].SALEDT,
            SHOPCD: listArr[0].SHOPCD,
            SHOPNM: listArr[0].SHOPNM,
            STYLECD: listArr[0].STYLECD,
            COLORCD: listArr[0].COLORCD,
            SIZECD: listArr[0].SIZECD,
            BARCODE: listArr[0].BARCODE,
            SALECONSAMT: listArr[0].SALECONSAMT,
            USE_POINT: listArr[0].USE_POINT,
            
          }];
        } else {
          return [];
        }
      });
    // const data = useMemo(() => listArr,[]);

    const Table = ({ columns, data }) => {
        const tableInstance = useTable({ columns, data });
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
          tableInstance;
      
        return (
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      };

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
                fontFamily='NotoSansKR-Bold'
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
                    <Typography textAlign={'right'} fontFamily='NotoSansKR-thin'
                        sx={{ 
                        fontSize: 14,
                        }} color="white" gutterBottom>
                        직원명
                    </Typography>
                    <Typography textAlign={'right'} color="white" variant="h5"
                     component="div" fontFamily='NotoSansKR-Midium'>
                        {c_nm}
                    </Typography>
                    <Typography textAlign={'right'} color="white" fontFamily='NotoSansKR-light' sx={{ mb: 1.5 }}>
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
                <Typography paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Bold'
                sx={{
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
                paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Black' >{c_alloc_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.8),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Bold'
                sx={{
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
                paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Black' >{c_use_point} 원</Typography>
            </Item>
            </Grid>
            <Grid item xs={4}>
            <Item elevation={3} sx={{
                background: 'linear-gradient(rgba(10,50,100,0.8),transparent)',
                backgroundColor: 'white'
            }}>
                <Typography paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Bold'
                sx={{
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
                paragraph variant='h5' textAlign={'center'} fontFamily='NotoSansKR-Black' >{c_remain_point} 원</Typography>
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
                <Table columns={columns} data={data} />
            </Item>
            </Grid>
        </Grid>
        </Container>

    )
}