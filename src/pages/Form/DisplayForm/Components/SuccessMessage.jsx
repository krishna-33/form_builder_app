import * as React from 'react';
import {Stack,Alert, Button} from '@mui/material';

 const SuccessMessage = ({setDataAdded}) => {
  return (
    <Stack sx={{ width: '100%' }} spacing={6}>
       <Alert severity="success">
          <strong>Form response is added</strong><br/>
          <Button sx={{marginTop:1}} variant='contained' onClick={() => setDataAdded(false)}>Add new Response</Button>
      </Alert>
    </Stack>
  );
}

export default SuccessMessage;