"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, useMediaQuery, Theme } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
// import { SignIn } from "@clerk/nextjs";
import { Button } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import * as SignIn from '@clerk/elements/sign-in'
import * as Clerk from '@clerk/elements/common'


const Login2 = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "url(/images/backgrounds/squirrel.svg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "1",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ minHeight: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{
                p: isMobile ? 4 : 4,
                zIndex: 1,
                width: "100%",
                maxWidth: isMobile ? "90%" : "500px",
                m: isMobile ? 2 : 0,
                background: "rgba(255, 255, 255, 1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center" mb={0}>
                <Logo />
              </Box>
              <Typography variant={isMobile ? "h5" : "h6"} textAlign="center" mb={2}>
                Your Finance Tracking App
              </Typography>

              <Typography variant="overline" gutterBottom sx={{ display: 'block' }} textAlign="center" mb={-2}>
                Sign in with
              </Typography>
              <SignIn.Root>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                  mt={3}
                >
                <SignIn.Step name="start">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<GoogleIcon htmlColor="#000000"/>}
                    sx={{
                      mb: 2,
                      backgroundColor: '#FFFFFF',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#3DD9EB',
                      },
                    }}
                  >
                    <Clerk.Connection name="google" style={{ background: 'transparent', border: 0, fontFamily: 'inherit' }}>Google</Clerk.Connection>
                  </Button>
                  
                </SignIn.Step>
                <SignIn.Step name="start">
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<FacebookIcon htmlColor="#000000"/>}
                    sx={{
                      mb: 2,
                      backgroundColor: '#FFFFFF',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#3DD9EB',
                      },
                    }}
                  >
                    <Clerk.Connection name="facebook" style={{ background: 'transparent', border: 0, fontFamily: 'inherit' }}>Facebook</Clerk.Connection>
                  </Button>
                </SignIn.Step>
                </Stack>
              </SignIn.Root>
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                alignItems="center"
                mt={3}
              >
                <Typography variant="overline" gutterBottom sx={{ display: 'block' }}>
                  All rights reserved ® 2024
                </Typography>
                
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
