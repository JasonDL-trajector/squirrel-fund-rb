"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, useMediaQuery, Theme } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { SignIn } from "@clerk/nextjs";

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
            {/* <Card
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
              <Box display="flex" alignItems="center" justifyContent="center" >
                <Logo />
              </Box>
              <AuthLogin
                subtext={
                  <Typography
                    variant={isMobile ? "body1" : "subtitle1"}
                    textAlign="center"
                    color="textSecondary"
                    mb={1}
                  >
                    Your Finance Tracking App
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction={"row"}
                    spacing={1}
                    justifyContent="center"
                    alignItems="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant={isMobile ? "body1" : "h6"}
                      fontWeight="500"
                    >
                      New to Squirrel Fund?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/authentication/register"
                      fontWeight="500"
                      variant={isMobile ? "body1" : "h6"}
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card> */}
            <SignIn routing="hash"/>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;
