import * as React from 'react';

//MUI
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function PointReview(){
//정의


//Render
    return(
        <Box>
            <Typography paragraph variant='h3'>
                복지포인트 설명 제목
            </Typography>
            <Typography paragraph variant='body1'>
                복지포인트 설명
            </Typography>
        </Box>

    )
}