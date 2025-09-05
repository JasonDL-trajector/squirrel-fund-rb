import React from "react";
import { Card, Text, Group, Stack, useMantineTheme, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: React.ReactNode;
  middlecontent?: string | JSX.Element;
  borderless?: boolean;
};

const DashboardCard = ({
  title,
  subtitle,
  children,
  action,
  footer,
  cardheading,
  headtitle,
  headsubtitle,
  middlecontent,
  borderless,
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Card
      shadow={isMobile ? "sm" : "md"}
      radius={isMobile ? "lg" : "lg"}
      p="md"
      withBorder
      styles={{
        root: {
          background: isMobile
            ? "var(--mantine-color-white)"
            : "rgba(255,255,255,0.75)",
          border: "1px solid var(--mantine-color-gray-2)",
          backdropFilter: isMobile ? undefined : "saturate(180%) blur(16px)",
          WebkitBackdropFilter: isMobile
            ? undefined
            : "saturate(180%) blur(16px)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {cardheading ? (
        <Stack gap="xs">
          <Text size="xl" fw={600}>
            {headtitle}
          </Text>
          <Text size="sm" c="dimmed">
            {headsubtitle}
          </Text>
        </Stack>
      ) : (
        <Stack gap="lg">
          {title ? (
            <Group
              justify="space-between"
              align="center"
              styles={{
                root: {
                  borderBottom: "0.5px solid var(--mantine-color-gray-2)",
                  paddingBottom: isMobile ? theme.spacing.sm : theme.spacing.md,
                  paddingTop: isMobile ? theme.spacing.sm : theme.spacing.md,
                  paddingLeft: theme.spacing.md,
                  paddingRight: theme.spacing.md,
                },
              }}
            >
              <Stack gap="xs">
                {title && (
                  <Text size="xl" fw={600} c="var(--mantine-color-text)">
                    {title}
                  </Text>
                )}
                {subtitle && (
                  <Text size="sm" c="dimmed">
                    {subtitle}
                  </Text>
                )}
              </Stack>
              {action}
            </Group>
          ) : null}
          <Box
            style={{
              padding: theme.spacing.md,
              paddingBottom: `calc(${theme.spacing.md} + env(safe-area-inset-bottom))`,
              flex: 1,
            }}
          >
            {children}
          </Box>
        </Stack>
      )}

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
