import React from 'react';
import { Box, Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
      <Skeleton variant="text" width="60%" height={40} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Skeleton variant="rectangular" width="48%" height={150} />
        <Skeleton variant="rectangular" width="48%" height={150} />
      </Box>
    </Box>
  );
};

export default Loading;