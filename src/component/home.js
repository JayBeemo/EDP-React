
import * as React from 'react';
import './home.css';
import { useEffect } from 'react';
import axios from 'axios';
import icon_reciept from './icon/icon_reciept.png';
import Loading from './loading';

//이력 테이블에 필요한 라이브러리 import
import { useTable } from "react-table";
import { useMemo } from 'react';
import { useState } from 'react';

//ApexCharts 차트 라이브러리 import
// import ApexCharts from 'apexcharts';

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
    const [listArr, setListArr] = useState([]);

    // loading State
    const [loading, setLoading] = useState(false);
    
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

    // 날짜 선언
    

    const bungi = () => {
        const date = new Date();
        let month;
        if (date.getMonth() < 4 && date.getMonth() > 0) {
            month = "1분기";
        } else
            if (date.getMonth() < 7 && date.getMonth() > 3) {
                month = "2분기";
            }
            else
                if (date.getMonth() < 10 && date.getMonth() > 6) {
                    month = "3분기";
                }
                else
                    if (date.getMonth() < 13 && date.getMonth() > 9) {
                        month = "4분기";
                    }
                    return month;
    }

    
    
    //구매내역 LIST API 콜
    useEffect(()=>{
        const API_URL = process.env.REACT_APP_DB_HOST;
        async function fetchList() {
          try {
            setLoading(true);
            const response = await axios.post(API_URL + '/api/apitool', {
                type: 'list',
                custnm: c_nm,
                custid: c_id
            },{
                headers:{
                    'Origin': 'http://192.168.0.10:3000'
                }
            });
            let json = JSON.parse(JSON.stringify(response.data));
            let range = response.data.length;
            let newArr = [];
            // 구매내역 LIST 파싱 및 배열 할당
            for(let i=0;i<range;i++){
              newArr.push(JSON.stringify(json[i]));
            }
            let updatedListArr = [];
            for(let i=0;i<range;i++){
              updatedListArr.push(JSON.parse(newArr[i]));
            }
            setListArr(updatedListArr);
            setLoading(false);
          } catch (err) {
            console.log(err);
          }
        }
        fetchList();

        // eslint-disable-next-line
      },[]);
    //구매내역 LIST API 콜

    // 사용 내역 Table Header 정의
    // eslint-disable-next-line
    const columns = useMemo(() => [
        {
            accessor: "SALEDT",
            Header: "구매 일자",
        },
        {
            accessor: "SHOPCD",
            Header: "매장 코드",
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
            accessor: "STYLENM",
            Header: "상품명",
        },
        {
            accessor: "SALECONSAMT",
            Header: "지불금액",
        },
        {
            accessor: "USE_POINT",
            Header: "사용포인트",
        },
    ]);

    // 사용 내역 Table Data 정의
    // eslint-disable-next-line
    const data = useMemo(() => {
        const slicedArr = listArr.slice(0,10);
        // SALEDT를 기준으로 내림차순 정렬
        const sortedArr = slicedArr.sort((a, b) => (a.SALEDT > b.SALEDT) ? -1 : 1); 

        return sortedArr.map(item => ({
          SALEDT: item.SALEDT,
          SHOPCD: item.SHOPCD,
          SHOPNM: item.SHOPNM,
          STYLECD: item.STYLECD,
          COLORCD: item.COLORCD,
          SIZECD: item.SIZECD,
          STYLENM: item.STYLENM,
          SALECONSAMT: item.SALECONSAMT,
          USE_POINT: item.USE_POINT,
        }));
      }, [listArr]);

    const Table = ({ columns, data }) => {
        const tableInstance = useTable({ columns, data });
        const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
          tableInstance;
      
        return (
          <table {...getTableProps()} width='100%'>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} style={{ borderBottom: '1px solid black' }}>{column.render("Header")}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()} border-bottom='10px'>
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
        {/* 조회 시 loading 스피너 작동 */}
        {loading ?<Loading/> : null}
        <div className='dash'>
            <div className='idcard_left'>
                <img src={icon_reciept} alt="영수"
                    width="50px" height="60px" /> 
                <Typography paragraph variant='h4'
                fontFamily='NotoSansKR-Bold' textAlign={"center"}
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
                    {bungi()} 적립 포인트
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
                   {bungi()} 사용 포인트
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
                   {bungi()} 잔여 포인트
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
            {/* <Item elevation={3}>
                월별 사용량 차트 그래프
                (LINE CHART)
                NIVO or ApexCharts 활용
            </Item> */}
            </Grid>
            <Grid item xs={12}>
            <div className='table_Header'>
                <Typography paragraph variant='h5'
                fontFamily='NotoSansKR-Bold'
                sx={{
                    color: 'white',
                    maxWidth: '600px'
                }}>
                    포인트 사용 내역 (최근 10 건)
                </Typography>
            </div>
            <Item elevation={3}>
                <Table columns={columns} data={data} />
            </Item>
            </Grid>
        </Grid>
        </Container>

    )
}