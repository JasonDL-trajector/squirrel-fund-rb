"use client";
import { MantineProvider } from '@mantine/core';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { mantineTheme } from '@/utils/mantine-theme';
import '@mantine/core/styles.css';

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}
    >
      <MantineProvider theme={mantineTheme} defaultColorScheme="light">
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          {children}
        </ConvexProviderWithClerk>
        <SpeedInsights />
      </MantineProvider>
    </ClerkProvider>
  );
}
