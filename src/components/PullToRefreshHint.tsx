'use client';

import { Box, Text } from '@mantine/core';

export default function PullToRefreshHint() {
  return (
    <Box style={{ padding: '8px 0' }} visibleFrom="xs" hiddenFrom="lg">
      <Text size="xs" c="dimmed" ta="center">
        Pull to refresh
      </Text>
    </Box>
  );
}

