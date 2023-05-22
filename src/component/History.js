import * as React from 'react';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useTable, usePagination } from 'react-table';
import icon_table from './icon/icon_table.png';

//기간설정 조회를 위한 Date Picker 라이브러리 Import
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import { Container } from '@mui/system';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function PointReview(props) {
    //정의
    const [listArr, setListArr] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // 기간설정 상태
    const [filteredData, setFilteredData] = useState([]);
    const [showFilteredData, setShowFilteredData] = useState(false);
    const [calendarFocused, setCalendarFocused] = useState(null);

    let { c_id, c_nm, c_email } = props;

    useEffect(() => {
        const API_URL = process.env.REACT_APP_DB_HOST;
        async function fetchlist() {
            try {
                const response = await axios.post(
                    API_URL + '/api/apitool',
                    {
                        type: 'list',
                        custnm: c_nm,
                        custid: c_id,
                    },
                    {
                        headers: {
                            Origin: 'http://192.168.0.10:3000',
                        },
                    }
                );
                let json = JSON.parse(JSON.stringify(response.data));
                let range = response.data.length;
                let newArr = [];
                // 구매내역 LIST 파싱 및 배열 할당
                for (let i = 0; i < range; i++) {
                    newArr.push(JSON.stringify(json[i]));
                }
                let updatedListArr = [];
                for (let i = 0; i < range; i++) {
                    updatedListArr.push(JSON.parse(newArr[i]));
                }
                setListArr(updatedListArr);
            } catch (err) {
                console.log(err);
            }
        }

        fetchlist();

        // eslint-disable-next-line
    }, []);

    const columns = useMemo(
        () => [
            {
                accessor: 'SALEDT',
                Header: '구매 일자',
            },
            {
                accessor: 'SHOPCD',
                Header: '매장 코드',
            },
            {
                accessor: 'SHOPNM',
                Header: '구매 매장',
            },
            {
                accessor: 'STYLECD',
                Header: '구매 상품',
            },
            {
                accessor: 'COLORCD',
                Header: '컬러',
            },
            {
                accessor: 'SIZECD',
                Header: '사이즈',
            },
            {
                accessor: 'STYLENM',
                Header: '상품명',
            },
            {
                accessor: 'SALECONSAMT',
                Header: '지불금액',
            },
            {
                accessor: 'USE_POINT',
                Header: '사용포인트',
            },
        ],
        []
    );

    //기간 설정 조회를 위한 이벤트 핸들러

    const handleSearch = () => {
        if (showFilteredData) {
            setShowFilteredData(false);
        } else {
            setShowFilteredData(true);
        }

        const filteredArr = listArr.filter((item) => {
            const saleDate = new Date(item.SALEDT);
            return startDate <= saleDate && saleDate <= endDate;
        });
        setFilteredData(filteredArr);
    }

    //Table Data Set 설정
    const data = useMemo(() => {
        if (showFilteredData) {
            // SALEDT를 기준으로 내림차순 정렬
            const sortedArr = filteredData.sort((a, b) => (a.SALEDT > b.SALEDT ? -1 : 1));

            return sortedArr.map((item) => ({
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
        }

        const sortedArr = listArr.sort((a, b) => (a.SALEDT > b.SALEDT ? -1 : 1));
        return sortedArr.map((item) => ({
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
    }, [showFilteredData, filteredData, listArr]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        prepareRow,
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        usePagination
    );

    const { pageIndex, pageSize } = state;

    return (
        <Container fixed maxWidth='xl'>
            <div className='dash_2'>
                <div className='idcard_left'>
                    <img src={icon_table} alt="영수"
                        width="50px" height="60px" />
                    <Typography paragraph variant='h4'
                        fontFamily='NotoSansKR-Bold' textAlign={"center"}
                        sx={{
                            color: 'white',
                            maxWidth: '600px'
                        }}>
                        포인트 사용 내역
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
                <Box
                    sx={{
                        pt: 20
                    }}
                >
                    {/* 기간 설정 조회 조건 입력 */}
                    <DateRangePicker
                        startDate={startDate}
                        startDateId="start_date"
                        endDate={endDate}
                        endDateId="end_date"
                        onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        focusedInput={calendarFocused}
                        onFocusChange={(focusedInput) => setCalendarFocused(focusedInput)}
                        showClearDates
                        isOutsideRange={() => false}
                        displayFormat="YYYY-MM-DD"
                        locale="KO"
                    />
                    <Button onClick={handleSearch}
                        variant="contained"
                        endIcon={<SendIcon />}
                        size="large"
                        sx={{
                            backgroundColor: "#333333"
                        }}
                    >
                        {showFilteredData ? '전체 조회' : '검색 기간 조회'}
                    </Button>
                </Box>
            <Box>
                <TableContainer component={Paper} style={{
                    marginTop: '16px'
                }}>
                    <Table {...getTableProps()}>
                        <TableHead>
                            {headerGroups.map((headerGroup) => (
                                <TableRow {...headerGroup.getHeaderGroupProps()}
                                    sx={{
                                        backgroundColor: '#DBDBDB'
                                    }}
                                >
                                    {headerGroup.headers.map((column) => (
                                        <TableCell {...column.getHeaderProps()}
                                            align='left'
                                            sx={{
                                                typography: 'subtitle2',
                                                fontWeight: 'bold',
                                                fontSize: 15,
                                            }}
                                        >
                                            {column.render('Header')}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody {...getTableBodyProps()}>
                            {page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow {...row.getRowProps()}>
                                        {row.cells.map((cell) => {
                                            return (
                                                <TableCell {...cell.getCellProps()}
                                                    align='left'
                                                    sx={{
                                                        typography: 'body1',
                                                        fontWeight: 'regular',
                                                        fontSize: 'h7.fontSize',
                                                    }}
                                                >
                                                    {cell.render('Cell')}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="16px"
                >
                    <Button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        variant="outlined"
                    >
                        {'<<'}
                    </Button>
                    <Button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        variant="outlined"
                    >
                        {'<'}
                    </Button>
                    <Button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        variant="outlined"
                    >
                        {'>'}
                    </Button>
                    <Button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        variant="outlined"
                    >
                        {'>>'}
                    </Button>
                    <Typography variant="body2" marginLeft={2} marginRight={2}>
                        페이지 {pageIndex + 1} / {pageOptions.length}
                    </Typography>
                    <Select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        variant="outlined"
                    >
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                            <MenuItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>
        </Container>
    );
}
