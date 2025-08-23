import React from "react";
import { Paper, Text, Group, Stack, useMantineTheme } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type Props = {
  title?: string;
  subtitle?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  cardheading?: string | JSX.Element;
  headtitle?: string | JSX.Element;
  headsubtitle?: string | JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
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
}: Props) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Paper
      shadow="md"
      p="md"
      style={{
        height: "100%",
        transform: isMobile ? "scale(0.95)" : "none",
        transformOrigin: "top center",
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
              pb="md"
              style={{ borderBottom: `1px solid ${theme.colors.gray[2]}` }}
            >
              <Stack gap="xs">
                {title && (
                  <Text size="xl" fw={600}>
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

          {children}
        </Stack>
      )}

      {middlecontent}
      {footer}
    </Paper>
  );
};

export default DashboardCard;
