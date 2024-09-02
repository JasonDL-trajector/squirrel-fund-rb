'use client';
import { styled, Container, Box } from '@mui/material';
import React, { useState } from 'react';
import Header from '@/app/(DashboardLayout)/layout/header/Header';
import Sidebar from '@/app/(DashboardLayout)/layout/sidebar/Sidebar';
import { useMediaQuery } from '@mui/material';
import { Authenticated, Unauthenticated, useQuery } from 'convex/react';
import Login2 from '../authentication/login/page';

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}));

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  return (
    <>
      <Unauthenticated>
        <Login2 />
      </Unauthenticated>

      <Authenticated>
        <MainWrapper className="mainwrapper">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            isMobileSidebarOpen={false}
            onSidebarClose={() => {}}
          />
          <PageWrapper className="page-wrapper">
            <Header toggleMobileSidebar={() => {}} />
            <Container
              sx={{
                paddingTop: '20px',
                maxWidth: '1200px',
                paddingBottom: !lgUp ? '80px' : '20px', // Increased bottom padding for mobile
              }}
            >
              <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>{children}</Box>
            </Container>
          </PageWrapper>
        </MainWrapper>
      </Authenticated>
    </>
  );
}
