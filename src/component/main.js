/* eslint-disabled */ 

import * as React from 'react';
import './isLogin';
import { CssBaseline } from '@mui/material';
//import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import isLogin from './isLogin';

export default function main(){
    isLogin();

    return(
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="sm">
                <div>
                    <p>1234</p>
                </div>
            </Container>
        </React.Fragment>
    )
}


    