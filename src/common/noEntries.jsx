import React, { useState } from 'react';
import { Stack } from '@mui/material';
import NoEntriesImg from '../assets/noEntriesImg.svg'

const NoEntries = () => {
    return(
        <Stack
                spacing={1}
                alignItems="center"
                justifyContent="center"
                sx={{ fontWeight: 'bold',padding:3}}
                >
                <img src={NoEntriesImg} />
                <div>No Entries Found</div>
              </Stack>
    )
}

export default NoEntries