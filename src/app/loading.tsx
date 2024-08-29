import React from 'react';
import { Box, Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
      <Skeleton variant="circular" width={80} height={80} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="text" width="80%" height={40} sx={{ mx: 'auto', mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={56} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Box>
  );
};

export default Loading;